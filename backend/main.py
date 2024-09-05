from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, EmailStr
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional, List

from abc import ABC, abstractmethod
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from composio_phidata import Action, ComposioToolSet
from phi.assistant import Assistant

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# User model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)


Base.metadata.create_all(bind=engine)


# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserInDB(BaseModel):
    id: int
    email: EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginData(BaseModel):
    email: EmailStr
    password: str


class EmailContent(BaseModel):
    content: str


class EmailSummary(BaseModel):
    summary: str


# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        print(f"User not found: {email}")
        return False
    if not verify_password(password, user.hashed_password):
        print(f"Invalid password for user: {email}")
        return False
    print(f"Password verified for user: {email}")
    return user


# Routes
@app.post("/register", response_model=UserInDB)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    print(f"Received registration data: {user}")
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    print(f"New user registered: {new_user.email}")
    return UserInDB(id=new_user.id, email=new_user.email)


@app.post("/login", response_model=Token)
async def login(login_data: LoginData, db: Session = Depends(get_db)):
    print(f"Login attempt received for email: {login_data.email}")
    user = authenticate_user(db, login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    print(f"Login successful for email: {login_data.email}")
    return {"access_token": access_token, "token_type": "bearer"}


# JWT token verification
def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user


@app.get("/users/me", response_model=UserInDB)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@app.post("/fetch-email", response_model=EmailContent)
async def fetch_email(current_user: User = Depends(get_current_user)):
    fetcher = GmailFetcher()
    email_content = fetcher.fetch_email()
    return EmailContent(content=email_content)


@app.post("/summarize-email", response_model=EmailSummary)
async def summarize_email(
    email_content: EmailContent, current_user: User = Depends(get_current_user)
):
    formatter = EmailFormatter()
    summary = formatter.format_response_as_plain_text(email_content.content)
    return EmailSummary(summary=summary)


@app.post("/send-email")
async def send_email(
    email_summary: EmailSummary, current_user: User = Depends(get_current_user)
):
    sender = GmailSender()
    sender.send_email(
        "petarvukovic50@gmail.com", "Email Summary", email_summary.summary
    )
    return {"message": "Email sent successfully"}


# Email processing classes


class AbstractEmailFetcher(ABC):
    @abstractmethod
    def fetch_email(self) -> str:
        pass


class GmailFetcher(AbstractEmailFetcher):
    def fetch_email(self) -> str:
        toolset = ComposioToolSet()
        read_email = toolset.get_actions(actions=[Action.GMAIL_FETCH_EMAILS])
        assistant = Assistant(tools=read_email, show_tool_calls=True, use_tools=True)
        response = assistant.run(
            """Fetch me the last email from lorens.novosel@49218069.mailchimpapp.com. Based on that email, make a summary.
            The summary must be in Croatian. Ensure that the summary is divided into sections. That summary I will pass as the body to another email, keep that in mind.""",
            stream=False,
        )
        return response


class EmailFormatter:
    def format_response_as_plain_text(self, response: str) -> str:
        plain_text_body = f"Sažetak emaila:\n\n{response}\n\nOvo je automatski generiran email sa sažetkom zadnje poruke."
        return plain_text_body


class AbstractEmailSender(ABC):
    @abstractmethod
    def send_email(self, user: str, subject: str, body: str):
        pass


class GmailSender(AbstractEmailSender):
    def send_email(self, user: str, subject: str, body: str):
        toolset = ComposioToolSet()
        send_email = toolset.get_actions(actions=[Action.GMAIL_SEND_EMAIL])
        assistant = Assistant(tools=send_email, show_tool_calls=True, use_tools=True)
        assistant.print_response(
            f"Send an email to {user} with the following MIME message: {body}"
        )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

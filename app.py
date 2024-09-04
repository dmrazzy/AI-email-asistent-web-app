from abc import ABC, abstractmethod
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from composio_phidata import Action, ComposioToolSet
from phi.assistant import Assistant


# Abstract class for fetching email
class AbstractEmailFetcher(ABC):
    @abstractmethod
    def fetch_email(self) -> str:
        pass


# Concrete class for fetching Gmail emails
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


# Class for formatting email response as plain text (no HTML or formatting)
class EmailFormatter:
    def format_response_as_plain_text(self, response: str) -> str:
        plain_text_body = f"Sažetak emaila:\n\n{response}\n\nOvo je automatski generiran email sa sažetkom zadnje poruke."
        return plain_text_body


# Abstract class for sending email
class AbstractEmailSender(ABC):
    @abstractmethod
    def send_email(self, user: str, subject: str, body: str):
        pass


# Concrete class for sending Gmail emails
class GmailSender(AbstractEmailSender):
    def send_email(self, user: str, subject: str, body: str):
        toolset = ComposioToolSet()
        send_email = toolset.get_actions(actions=[Action.GMAIL_SEND_EMAIL])

        assistant = Assistant(tools=send_email, show_tool_calls=True, use_tools=True)
        assistant.print_response(
            f"Send an email to {user} with the following MIME message: {body}"
        )


# Main processing class that fetches, formats, and sends the email
class EmailProcessor:
    def __init__(
        self,
        fetcher: AbstractEmailFetcher,
        sender: AbstractEmailSender,
        formatter: EmailFormatter,
    ):
        self.fetcher = fetcher
        self.sender = sender
        self.formatter = formatter

    def process(self):
        # Fetch the email content
        email_content = self.fetcher.fetch_email()

        # Format the email content as plain text
        formatted_content = self.formatter.format_response_as_plain_text(email_content)

        # Send the email with the formatted content
        self.sender.send_email(
            "petarvukovic50@gmail.com", "Test email", formatted_content
        )


# Main function to run the email processor
def main():
    fetcher = GmailFetcher()
    sender = GmailSender()
    formatter = EmailFormatter()
    processor = EmailProcessor(fetcher, sender, formatter)
    processor.process()


# Entry point for the script
if __name__ == "__main__":
    main()

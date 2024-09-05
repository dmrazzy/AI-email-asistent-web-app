import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from './Button'
import { Input } from './Input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './Dialog'
import Spinner from './Spinner'

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      console.log("Attempting login with:", { email, password });
      const response = await api.post('/login', { email, password });
      console.log("Login response:", response.data);
      localStorage.setItem('token', response.data.access_token)
      setIsLoggedIn(true)
      setIsLoginModalOpen(false)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      if (axios.isAxiosError(error) && error.response) {
        alert(`Login failed: ${error.response.data.detail || JSON.stringify(error.response.data)}`)
      } else {
        alert(`Login failed: ${error instanceof Error ? error.message : String(error)}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await api.post('/register', { email, password });
      console.log("Registration response:", response.data);
      alert('Registration successful. Please log in.')
      setIsRegisterModalOpen(false)
      setIsLoginModalOpen(true)
    } catch (error) {
      console.error('Registration error:', error)
      if (axios.isAxiosError(error) && error.response) {
        alert(`Registration failed: ${error.response.data.detail || JSON.stringify(error.response.data)}`)
      } else {
        alert(`Registration failed: ${error instanceof Error ? error.message : String(error)}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
                <Link to="/usluge" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Usluge
                </Link>
                <Link to="/pricing" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pricing
                </Link>
                {isLoggedIn && (
                  <Link to="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {isLoggedIn ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <>
                  <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
                  <Button onClick={() => setIsRegisterModalOpen(true)} className="ml-2">Register</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : 'Login'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : 'Register'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
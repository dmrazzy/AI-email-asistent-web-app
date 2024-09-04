import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button } from './Button'
import { Input } from './Input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './Dialog'

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (username === 'test' && password === 'test') {
      setIsLoggedIn(true)
      setIsLoginModalOpen(false)
      navigate('/email-automation')
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">EmailAI</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
                <Link to="/pricing" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pricing
                </Link>
                {isLoggedIn && (
                  <Link to="/email-automation" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Email Automation
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {isLoggedIn ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
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
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleLogin}>Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
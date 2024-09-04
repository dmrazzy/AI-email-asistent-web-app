import React, { useState } from 'react'
import { Button } from "./Button"
import { Input } from './Input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './Dialog'
import { Inbox, Send, Archive, Trash2, RefreshCcw, Search, Edit2 } from 'lucide-react'

export default function Dashboard() {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [aiResponse, setAiResponse] = useState("")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const emails = [
    { id: 1, from: "john@example.com", subject: "Meeting tomorrow", preview: "Hi, just a reminder about our...", unread: true },
    { id: 2, from: "sarah@example.com", subject: "Project update", preview: "Here's the latest on the project...", unread: false },
    { id: 3, from: "mike@example.com", subject: "Quick question", preview: "I was wondering if you could...", unread: true },
  ]

  const handleEmailSelect = (email) => {
    setSelectedEmail(email)
    // Simulate AI generating a response
    setAiResponse("Dear " + email.from.split('@')[0] + ",\n\nThank you for your email. I have reviewed your message and...")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 space-y-4">
        <Button className="w-full justify-start space-x-2">
          <Inbox size={20} />
          <span>Inbox</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start space-x-2">
          <Send size={20} />
          <span>Sent</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start space-x-2">
          <Archive size={20} />
          <span>Archive</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start space-x-2">
          <Trash2 size={20} />
          <span>Trash</span>
        </Button>
      </div>

      {/* Email list */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 flex items-center space-x-4">
          <Input placeholder="Search emails..." className="flex-1" />
          <Button size="icon">
            <Search size={20} />
          </Button>
          <Button size="icon">
            <RefreshCcw size={20} />
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`p-4 border-b cursor-pointer ${email.unread ? 'font-bold bg-blue-50' : ''
                } hover:bg-gray-100`}
              onClick={() => handleEmailSelect(email)}
            >
              <div className="flex justify-between">
                <span>{email.from}</span>
                <span className="text-sm text-gray-500">12:34 PM</span>
              </div>
              <div>{email.subject}</div>
              <div className="text-sm text-gray-600 truncate">{email.preview}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Email content and AI response */}
      {selectedEmail && (
        <div className="w-1/2 bg-white p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-4">{selectedEmail.subject}</h2>
          <p className="mb-4">{selectedEmail.preview}</p>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">AI Generated Response:</h3>
            <p className="whitespace-pre-wrap">{aiResponse}</p>
            <Button className="mt-4" onClick={() => setIsEditModalOpen(true)}>
              <Edit2 size={20} className="mr-2" />
              Edit and Send
            </Button>
          </div>
        </div>
      )}

      {/* Edit and Send Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit and Send Response</DialogTitle>
          </DialogHeader>
          <Textarea
            value={aiResponse}
            onChange={(e) => setAiResponse(e.target.value)}
            rows={10}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Here you would typically send the email
              console.log("Sending email:", aiResponse)
              setIsEditModalOpen(false)
            }}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
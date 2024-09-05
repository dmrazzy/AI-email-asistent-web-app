import React, { useState } from 'react'
import { Button } from "./Button"
import { Input } from './Input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './Dialog'
import { Inbox, Send, Archive, Trash2, RefreshCcw, Search, Edit2 } from 'lucide-react'

// Textarea component
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export default function Dashboard() {
  const [selectedEmail, setSelectedEmail] = useState<{ id: number, from: string, subject: string, preview: string } | null>(null)
  const [aiResponse, setAiResponse] = useState("")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('inbox')

  const emails = [
    { id: 1, from: "john@example.com", subject: "Meeting tomorrow", preview: "Hi, just a reminder about our...", unread: true },
    { id: 2, from: "sarah@example.com", subject: "Project update", preview: "Here's the latest on the project...", unread: false },
    { id: 3, from: "mike@example.com", subject: "Quick question", preview: "I was wondering if you could...", unread: true },
  ]

  const handleEmailSelect = (email: { id: number, from: string, subject: string, preview: string }) => {
    setSelectedEmail(email)
    setAiResponse(`Dear ${email.from.split('@')[0]},\n\nThank you for your email. I have reviewed your message and...`)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 space-y-2 border-r border-gray-200">
        {[
          { name: 'Inbox', icon: Inbox, id: 'inbox' },
          { name: 'Sent', icon: Send, id: 'sent' },
          { name: 'Archive', icon: Archive, id: 'archive' },
          { name: 'Trash', icon: Trash2, id: 'trash' },
        ].map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start space-x-2 ${activeTab === item.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Button>
        ))}
      </div>

      {/* Email list */}
      <div className="flex-1 flex flex-col border-r border-gray-200">
        <div className="bg-white p-4 flex items-center space-x-4 border-b border-gray-200">
          <Input placeholder="Search emails..." className="flex-1" />
          <Button size="icon" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`p-4 border-b border-gray-200 cursor-pointer ${email.unread ? 'font-bold bg-blue-50' : ''
                } hover:bg-gray-100 transition-colors duration-150`}
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
      {selectedEmail ? (
        <div className="w-1/2 bg-white p-6 overflow-auto">
          <h2 className="text-xl font-bold mb-4">{selectedEmail.subject}</h2>
          <p className="mb-6">{selectedEmail.preview}</p>
          <div className="bg-yellow-100 p-6 rounded-lg border border-yellow-200">
            <h3 className="font-bold mb-2">AI Generated Response:</h3>
            <p className="whitespace-pre-wrap mb-4">{aiResponse}</p>
            <Button className="mt-2" onClick={() => setIsEditModalOpen(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit and Send
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-1/2 bg-white p-6 flex items-center justify-center text-gray-500">
          Select an email to view its content
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
            className="mt-2"
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
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
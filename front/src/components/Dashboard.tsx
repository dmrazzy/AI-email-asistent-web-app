import React, { useState, useEffect, ChangeEvent } from 'react'
import { Settings, Save, History, File, X } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { Textarea } from './Textarea'
import agentimage2 from '../assets/agent2.jpg'
import videoFile from '../assets/Screen Recording 2024-08-23 115014.mp4'

interface AIAgentSettings {
  name: string;
  description: string;
  promptTemplate: string;
  customInstructions: string;
}

export default function Dashboard() {
  const [aiAgentSettings, setAiAgentSettings] = useState<AIAgentSettings>({
    name: '',
    description: '',
    promptTemplate: '',
    customInstructions: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState('settings')
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const dummyHistory = [
    { id: 1, user: 'Alice', message: 'How can I improve my email open rates?', timestamp: '2024-09-05 10:30' },
    { id: 3, user: 'Charlie', message: 'Can you help me write a compelling subject line?', timestamp: '2024-09-05 14:20' },
  ]

  const dummyFiles = [
    { id: 1, name: 'email_templates.pdf', uploadDate: '2024-09-01' },
    { id: 2, name: 'customer_data.csv', uploadDate: '2024-09-03' },
    { id: 3, name: 'brand_guidelines.docx', uploadDate: '2024-09-04' },
  ]

  useEffect(() => {
    fetchAiAgentSettings()
  }, [])

  const fetchAiAgentSettings = async () => {
    try {
      const response = await fetch('http://localhost:8000/ai-agent-settings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAiAgentSettings(data);
      } else {
        console.error('Failed to fetch AI agent settings');
      }
    } catch (error) {
      console.error('Error fetching AI agent settings:', error);
    }
  };

  const updateAiAgentSettings = async () => {
    try {
      const formData = new FormData();
      formData.append('name', aiAgentSettings.name);
      formData.append('description', aiAgentSettings.description);
      formData.append('promptTemplate', aiAgentSettings.promptTemplate);
      formData.append('customInstructions', aiAgentSettings.customInstructions);
      if (selectedFile) {
        formData.append('trainingFile', selectedFile);
      }

      const response = await fetch('http://localhost:8000/ai-agent-settings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      if (response.ok) {
        console.log('AI agent settings updated successfully');
      } else {
        console.error('Failed to update AI agent settings');
      }
    } catch (error) {
      console.error('Error updating AI agent settings:', error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Agent Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700">Agent Name</label>
                <Input
                  id="agent-name"
                  value={aiAgentSettings.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAiAgentSettings({ ...aiAgentSettings, name: e.target.value })}
                  placeholder="Enter agent name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="agent-description" className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  id="agent-description"
                  value={aiAgentSettings.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAiAgentSettings({ ...aiAgentSettings, description: e.target.value })}
                  placeholder="Describe your AI agent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="prompt-template" className="block text-sm font-medium text-gray-700">Prompt Template</label>
                <Textarea
                  id="prompt-template"
                  value={aiAgentSettings.promptTemplate}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAiAgentSettings({ ...aiAgentSettings, promptTemplate: e.target.value })}
                  placeholder="Enter prompt template"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="custom-instructions" className="block text-sm font-medium text-gray-700">Custom Instructions</label>
                <Textarea
                  id="custom-instructions"
                  value={aiAgentSettings.customInstructions}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAiAgentSettings({ ...aiAgentSettings, customInstructions: e.target.value })}
                  placeholder="Enter custom instructions for your AI agent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="training-file" className="block text-sm font-medium text-gray-700">Upload Training PDF</label>
                <Input
                  id="training-file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>
                )}
              </div>
              <Button onClick={updateAiAgentSettings} className="w-full bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save AI Agent Settings
              </Button>
            </div>
          </div>
        )
      case 'history':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Chat History</h2>
            <ul className="space-y-4">
              {dummyHistory.map((item) => (
                <li key={item.id} className="border-b pb-2">
                  <p className="font-semibold">{item.user}</p>
                  <p className="text-gray-600">{item.message}</p>
                  <p className="text-sm text-gray-400">{item.timestamp}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      case 'files':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
            <ul className="space-y-4">
              {dummyFiles.map((file) => (
                <li key={file.id} className="flex items-center space-x-2">
                  <File className="h-5 w-5 text-gray-500" />
                  <span>{file.name}</span>
                  <span className="text-sm text-gray-400">({file.uploadDate})</span>
                </li>
              ))}
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white p-4 space-y-2 relative overflow-hidden">
        <Button
          className={`w-full justify-start space-x-2 text-lg border border-blue-200 rounded-lg bg-white
      ${activeTab === 'settings'
              ? 'bg-blue-50 text-black'
              : 'text-black hover:bg-blue-50'}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="h-6 w-6 text-black" />
          <span>AI Agent Settings</span>
        </Button>
        <Button
          className={`w-full justify-start space-x-2 text-lg border border-blue-200 rounded-lg bg-white
      ${activeTab === 'history'
              ? 'bg-blue-50 text-black'
              : 'text-black hover:bg-blue-50'}`}
          onClick={() => setActiveTab('history')}
        >
          <History className="h-6 w-6 text-black" />
          <span>History</span>
        </Button>
        <Button
          className={`w-full justify-start space-x-2 text-lg border border-blue-200 rounded-lg bg-white
      ${activeTab === 'files'
              ? 'bg-blue-50 text-black'
              : 'text-black hover:bg-blue-50'}`}
          onClick={() => setActiveTab('files')}
        >
          <File className="h-6 w-6 text-black" />
          <span>Files</span>
        </Button>
        {/* Additional bubbles for sidebar */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`sidebar-bubble-${i}`}
            className="absolute bg-blue-100 rounded-full opacity-30 animate-float"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">AI Agent Customization</h1>
        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-1/2 pr-4 mb-6 md:mb-0">
            {renderTabContent()}
          </div>
          <div className="w-full md:w-1/2 md:pl-4 flex items-center justify-center">
            <div className="relative mt-32">
              <img
                src={agentimage2}
                alt="Agent"
                className="rounded-lg shadow-lg object-cover w-full h-auto max-w-xl"
              />
              <div className="absolute -top-32 -left-32 w-96 h-72 bg-white rounded-full p-8 shadow-lg transform -rotate-12 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <p className="text-2xl font-bold mb-3">Bok, ja sam EmailAgentko!</p>
                  <p className="text-lg mb-5">Tu sam da ti pomognem. Samo mi daj postavke!</p>
                  <Button
                    className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white text-lg px-6 py-2"
                    onClick={() => setIsVideoModalOpen(true)}
                  >
                    Pogledaj video
                  </Button>
                </div>
              </div>
              <div className="absolute -top-36 -left-36 w-104 h-80 border-4 "></div>
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-blue-200 rounded-full opacity-70 animate-float"
                  style={{
                    width: `${Math.random() * 30 + 15}px`,
                    height: `${Math.random() * 30 + 15}px`,
                    top: `${Math.random() * 120 + 60}%`,
                    left: `${Math.random() * 120 - 60}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 max-w-4xl">
            <div className="flex justify-end mb-2">
              <Button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsVideoModalOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <video
                className="w-full h-full"
                src={videoFile}
                title="How to Customize Your AI Email Agent"
                controls
              ></video>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
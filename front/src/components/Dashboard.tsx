import React, { useState, useEffect } from 'react'
import { Settings, Save } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { Textarea } from './Textarea'
import agentimage2 from '../assets/agent2.jpg'

export default function Dashboard() {
  const [aiAgentSettings, setAiAgentSettings] = useState({
    name: '',
    description: '',
    promptTemplate: '',
    customInstructions: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 space-y-2 border-r border-gray-200">
        <Button className="w-full justify-start space-x-2 hover:bg-gray-100">
          <Settings className="h-5 w-5" />
          <span>AI Agent Settings</span>
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">AI Agent Customization</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-4 mb-6 md:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Agent Settings</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700">Agent Name</label>
                  <Input
                    id="agent-name"
                    value={aiAgentSettings.name}
                    onChange={(e) => setAiAgentSettings({ ...aiAgentSettings, name: e.target.value })}
                    placeholder="Enter agent name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="agent-description" className="block text-sm font-medium text-gray-700">Description</label>
                  <Textarea
                    id="agent-description"
                    value={aiAgentSettings.description}
                    onChange={(e) => setAiAgentSettings({ ...aiAgentSettings, description: e.target.value })}
                    placeholder="Describe your AI agent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="prompt-template" className="block text-sm font-medium text-gray-700">Prompt Template</label>
                  <Textarea
                    id="prompt-template"
                    value={aiAgentSettings.promptTemplate}
                    onChange={(e) => setAiAgentSettings({ ...aiAgentSettings, promptTemplate: e.target.value })}
                    placeholder="Enter prompt template"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="custom-instructions" className="block text-sm font-medium text-gray-700">Custom Instructions</label>
                  <Textarea
                    id="custom-instructions"
                    value={aiAgentSettings.customInstructions}
                    onChange={(e) => setAiAgentSettings({ ...aiAgentSettings, customInstructions: e.target.value })}
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
                <Button onClick={updateAiAgentSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save AI Agent Settings
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-4 flex items-center justify-center">
            <div className="relative">
              <img
                src={agentimage2}
                alt="Agent"
                className="rounded-lg shadow-lg object-cover w-full h-auto max-w-md"
              />
              <div className="absolute -top-16 -left-16 w-64 h-48 bg-white rounded-full p-4 shadow-lg transform -rotate-12 flex items-center justify-center overflow-hidden">
                <div className="text-center animate-pulse">
                  <p className="text-lg font-bold mb-2">Bok, ja sam EmailAgentko!</p>
                  <p className="text-sm">Tu sam da ti pomognem. Samo mi daj postavke!</p>
                </div>
              </div>
              <div className="absolute -top-20 -left-20 w-72 h-56 border-4 border-blue-500 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
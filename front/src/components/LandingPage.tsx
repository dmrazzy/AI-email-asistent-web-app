import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Brain, Clock, Star, Moon, Sun, PlayCircle } from 'lucide-react'
import { Button } from './Button'
import { useTheme } from './ThemeContext'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('token') !== null

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="block xl:inline">Automate your emails</span>{' '}
                  <span className="block text-indigo-600 xl:inline">with AI 🤖</span>
                </motion.h1>
                <motion.p
                  className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Let AI handle your email responses. Save time ⏱️, increase productivity 📈, and never miss an important message again 📬.
                </motion.p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      onClick={handleGetStarted}
                    >
                      Get started
                      <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""
          />
        </div>
      </div>

      {/* Feature Section */}
      <motion.div
        className="py-12 bg-white dark:bg-gray-800"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              A better way to handle emails 📧
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Our AI-powered email assistant helps you manage your inbox efficiently.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {[
                { icon: Mail, title: "Automated Responses", description: "AI generates contextual responses to your emails, saving you time and effort. ✍️" },
                { icon: Brain, title: "Smart Prioritization", description: "Our AI learns your preferences and prioritizes important emails for you. 🧠" },
                { icon: Clock, title: "Time-Saving", description: "Reduce the time spent on email management by up to 75% with our AI assistant. ⏰" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="relative"
                  variants={fadeIn}
                  transition={{ delay: index * 0.2 }}
                >
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </motion.div>

      {/* Our Services Section */}
      <motion.div
        className="py-12 bg-gray-50 dark:bg-gray-900"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Our Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Comprehensive Email Management 🚀
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              We offer a range of services to streamline your email workflow.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                { title: "Email Sorting 📁", description: "Automatically categorize and sort your emails based on content and priority." },
                { title: "Response Generation 💬", description: "Generate human-like responses to common email inquiries." },
                { title: "Schedule Management 📅", description: "Integrate with your calendar to suggest meeting times and manage schedules." },
                { title: "Analytics Dashboard 📊", description: "Get insights into your email habits and productivity metrics." }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
                  variants={fadeIn}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
                      <p>{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Section */}
      <motion.div
        className="py-12 bg-indigo-100 dark:bg-indigo-900"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-300 font-semibold tracking-wide uppercase">Product Demo</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              See Our AI in Action 🎥
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Watch our product demo to see how our AI email assistant can transform your inbox management.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="py-12 bg-white dark:bg-gray-800"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What Our Customers Say 🗣️
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {[
                { name: "John Doe", role: "CEO", comment: "This AI email assistant has revolutionized how I manage my inbox. Highly recommended! 👍" },
                { name: "Jane Smith", role: "Marketing Manager", comment: "I've saved countless hours using this tool. It's like having a personal assistant for my emails. 🕒" },
                { name: "Mike Johnson", role: "Freelancer", comment: "The smart prioritization feature ensures I never miss important client emails. It's a game-changer. 🎯" }
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-gray-50 dark:bg-gray-700 shadow overflow-hidden sm:rounded-lg"
                  variants={fadeIn}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <Star className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <Star className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <Star className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <Star className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">{testimonial.comment}</p>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      Product Demo 🎥
                    </h3>
                    <div className="mt-2">
                      <video className="w-full" controls>
                        <source src="/demo-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button onClick={() => setIsVideoModalOpen(false)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 AI Email Assistant, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
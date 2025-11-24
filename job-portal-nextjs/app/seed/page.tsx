'use client'

import { useState } from 'react'
import { Navbar } from '@/components/shared/Navbar'

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSeed = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage('✅ Database seeded successfully!')
      } else {
        setMessage(`❌ Error: ${data.message}`)
      }
    } catch (error) {
      setMessage('❌ Failed to seed database')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Database Seeder
          </h1>
          <p className="text-gray-600 mb-6">
            Click the button below to populate the database with dummy data (users, companies, and jobs).
          </p>
          
          <button
            onClick={handleSeed}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {loading ? 'Seeding...' : 'Seed Database'}
          </button>
          
          {message && (
            <div className={`mt-6 p-4 rounded-lg ${
              message.startsWith('✅')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h2 className="font-semibold text-blue-900 mb-2">What will be created:</h2>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>2 sample users (recruiter and student)</li>
              <li>3 companies (TechCorp, InnovateLab, CloudSystems)</li>
              <li>6 job postings with various roles and experience levels</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

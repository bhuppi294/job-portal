'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Navbar } from '@/components/shared/Navbar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreateJobPage() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState([])
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: 'Full-time',
    experience: '',
    position: '',
    companyId: '',
  })

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    } else {
      fetchCompanies()
    }
  }, [isLoaded, user])

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/company/get')
      const data = await response.json()
      if (data.success) {
        setCompanies(data.companies)
      }
    } catch (error) {
      console.error('Error fetching companies:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/job/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        alert('Job posted successfully!')
        router.push('/admin/jobs')
      } else {
        alert(data.message || 'Failed to post job')
      }
    } catch (error) {
      console.error('Error posting job:', error)
      alert('Error posting job')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/admin"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Post New Job</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Senior Full Stack Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe the job role, responsibilities, and what makes it exciting..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Requirements * (comma-separated)
              </label>
              <input
                type="text"
                name="requirements"
                required
                value={formData.requirements}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. React, Node.js, 5+ years experience"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salary (USD) *
                </label>
                <input
                  type="number"
                  name="salary"
                  required
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. 120000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. San Francisco, CA (Hybrid)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  name="jobType"
                  required
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Experience (years) *
                </label>
                <input
                  type="number"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. 3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Positions *
                </label>
                <input
                  type="number"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. 2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company *
              </label>
              <select
                name="companyId"
                required
                value={formData.companyId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a company</option>
                {companies.map((company: any) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              {companies.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  No companies found. <Link href="/admin/companies/create" className="text-purple-600 hover:underline">Create one first</Link>
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || companies.length === 0}
                className={`flex-1 py-3 rounded-lg font-semibold text-white transition-colors ${
                  loading || companies.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
              
              <Link
                href="/admin"
                className="px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

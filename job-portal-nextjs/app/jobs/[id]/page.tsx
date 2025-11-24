'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Building2,
  Clock,
  Users,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useUser()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchJobDetails()
    }
  }, [params.id])

  const fetchJobDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/job/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setJob(data.job)
        // Check if already applied (you'd need to implement this)
      }
    } catch (error) {
      console.error('Error fetching job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!user) {
      router.push('/sign-in')
      return
    }

    try {
      setApplying(true)
      const response = await fetch('/api/application/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: params.id }),
      })

      const data = await response.json()
      if (data.success) {
        setApplied(true)
        alert('Application submitted successfully!')
      } else {
        alert(data.message || 'Failed to apply')
      }
    } catch (error) {
      console.error('Error applying:', error)
      alert('Error submitting application')
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
          <button
            onClick={() => router.push('/jobs')}
            className="mt-4 text-purple-600 hover:text-purple-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push('/jobs')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      {job.company?.name || 'Company'}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">
                    ${job.salary?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">per year</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  {job.jobType}
                </span>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {job.experienceLevel}+ years experience
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {job.position} positions
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div className="border-t pt-6 mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {job.requirements?.map((req: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {job.company?.description && (
                <div className="border-t pt-6 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    About {job.company.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {job.company.description}
                  </p>
                  {job.company.website && (
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 mt-2 inline-block"
                    >
                      Visit Company Website →
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
            >
              <button
                onClick={handleApply}
                disabled={applying || applied}
                className={`w-full py-3 rounded-lg font-semibold transition-colors mb-4 ${
                  applied
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                } ${applying ? 'opacity-50 cursor-wait' : ''}`}
              >
                {applying ? 'Applying...' : applied ? 'Applied ✓' : 'Apply Now'}
              </button>

              <div className="space-y-4 pt-4 border-t">
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Posted</span>
                  </div>
                  <p className="text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Job Type</span>
                  </div>
                  <p className="text-gray-900">{job.jobType}</p>
                </div>

                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Location</span>
                  </div>
                  <p className="text-gray-900">{job.location}</p>
                </div>

                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Salary Range</span>
                  </div>
                  <p className="text-gray-900">
                    ${job.salary?.toLocaleString()}/year
                  </p>
                </div>
              </div>

              {!user && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Please sign in to apply for this job
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

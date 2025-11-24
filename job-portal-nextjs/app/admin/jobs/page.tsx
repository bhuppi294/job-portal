'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Navbar } from '@/components/shared/Navbar'
import { ArrowLeft, Briefcase, MapPin, DollarSign, Plus } from 'lucide-react'
import Link from 'next/link'

export default function AdminJobsPage() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    } else {
      fetchJobs()
    }
  }, [isLoaded, user])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/job/get')
      const data = await response.json()
      if (data.success) {
        setJobs(data.jobs)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
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
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/admin"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
            <p className="text-gray-600 mt-2">{jobs.length} job postings</p>
          </div>
          <Link
            href="/admin/jobs/create"
            className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post Job
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
            <p className="text-gray-600 mb-6">Create your first job posting to get started</p>
            <Link
              href="/admin/jobs/create"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job: any) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.company?.name || 'Company'}</p>
                    <p className="text-gray-700 text-sm line-clamp-2">{job.description}</p>
                  </div>
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {job.jobType}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm">${job.salary?.toLocaleString()}/year</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.experienceLevel}+ years</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

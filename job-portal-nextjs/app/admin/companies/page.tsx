'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Navbar } from '@/components/shared/Navbar'
import { ArrowLeft, Building2, MapPin, Globe, Plus } from 'lucide-react'
import Link from 'next/link'

export default function AdminCompaniesPage() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

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
            <h1 className="text-3xl font-bold text-gray-900">Manage Companies</h1>
            <p className="text-gray-600 mt-2">{companies.length} companies registered</p>
          </div>
          <Link
            href="/admin/companies/create"
            className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Company
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : companies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first company</p>
            <Link
              href="/admin/companies/create"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Company
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company: any) => (
              <div
                key={company.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="ml-3 font-bold text-lg text-gray-900">{company.name}</h3>
                </div>

                {company.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {company.description}
                  </p>
                )}

                <div className="space-y-2">
                  {company.location && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {company.location}
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <Globe className="w-4 h-4 mr-2" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline truncate"
                      >
                        {company.website}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Created {new Date(company.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

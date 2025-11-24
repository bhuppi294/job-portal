'use client'

import { useUser } from '@clerk/nextjs'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { Mail, Phone, Briefcase, MapPin, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={user.imageUrl}
                alt={user.fullName || 'User'}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="text-center md:text-left text-white">
                <h1 className="text-3xl font-bold mb-2">
                  {user.fullName || 'User'}
                </h1>
                <p className="text-purple-100 mb-4">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {user.publicMetadata?.role || 'Job Seeker'}
                  </span>
                  {user.publicMetadata?.verified && (
                    <span className="px-4 py-1 bg-green-500 rounded-full text-sm font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </div>

                {user.primaryPhoneNumber && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user.primaryPhoneNumber.phoneNumber}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Account Details</h2>
                
                <div className="flex items-center space-x-3 text-gray-700">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="font-medium capitalize">{user.publicMetadata?.role || 'student'}</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-purple-900 mb-2">Profile Completion</h3>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <p className="text-sm text-purple-700 mt-2">85% Complete</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                  Browse Jobs
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                  My Applications
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, Briefcase, Building2 } from 'lucide-react'
import { UserButton, useUser, SignedIn, SignedOut } from '@clerk/nextjs'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setIsScrolled(window.scrollY > 20)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-white" />
              <span className="text-xl font-bold text-white">JobPortal</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/jobs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <Briefcase className="w-5 h-5 inline-block mr-2" />
                  Jobs
                </motion.button>
              </Link>
              
              <SignedIn>
                <Link href="/admin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Admin
                  </motion.button>
                </Link>
                
                <Link href="/profile">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Profile
                  </motion.button>
                </Link>
                
                <div className="ml-2">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10"
                      }
                    }}
                  />
                </div>
              </SignedIn>

              <SignedOut>
                <Link href="/sign-in">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/sign-up">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg font-semibold bg-white text-purple-600 hover:bg-gray-100 transition-colors"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </SignedOut>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="px-4 py-2 space-y-1">
                <Link href="/jobs" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold">
                  Jobs
                </Link>
                <SignedIn>
                  <Link href="/profile" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold">
                    Profile
                  </Link>
                  <div className="px-4 py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
                <SignedOut>
                  <Link href="/sign-in" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold">
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold">
                    Sign Up
                  </Link>
                </SignedOut>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-16"></div>
    </>
  )
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Briefcase, Building2 } from 'lucide-react';
import { logout } from '@/redux/authSlice';
import { Button } from '../ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setIsScrolled(window.scrollY > 20);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const getNavbarStyle = () => {
    return 'bg-gradient-to-r from-purple-600 to-purple-800';
  };

  const getTextColor = () => {
    return 'text-white';
  };

  const getHoverColor = () => {
    return 'hover:bg-white/10';
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarStyle()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className={`w-8 h-8 ${getTextColor()}`} />
              <span className={`text-xl font-bold ${getTextColor()}`}>JobPortal</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/jobs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-semibold ${getTextColor()} ${getHoverColor()} transition-colors`}
                >
                  <Briefcase className="w-5 h-5 inline-block mr-2" />
                  Jobs
                </motion.button>
              </Link>
              <Link to="/admin/companies">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-semibold ${getTextColor()} ${getHoverColor()} transition-colors`}
                >
                  <Building2 className="w-5 h-5 inline-block mr-2" />
                  Companies
                </motion.button>
              </Link>

              {user ? (
                <>
                  <Link to="/profile">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg font-semibold ${getTextColor()} ${getHoverColor()} transition-colors`}
                    >
                      <User className="w-5 h-5 inline-block mr-2" />
                      Profile
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-lg font-semibold ${getTextColor()} ${getHoverColor()} transition-colors`}
                  >
                    <LogOut className="w-5 h-5 inline-block mr-2" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg font-semibold ${getTextColor()} ${getHoverColor()} transition-colors`}
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg ${getTextColor()} ${getHoverColor()}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="px-4 py-2 space-y-1">
                <Link to="/jobs" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold">
                  <Briefcase className="w-5 h-5 inline-block mr-2" />
                  Jobs
                </Link>
                <Link to="/admin/companies" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold">
                  <Building2 className="w-5 h-5 inline-block mr-2" />
                  Companies
                </Link>
                {user ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold">
                      <User className="w-5 h-5 inline-block mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold"
                    >
                      <LogOut className="w-5 h-5 inline-block mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold">
                      Login
                    </Link>
                    <Link to="/signup" className="block px-4 py-2 text-gray-900 hover:bg-gray-100 rounded-lg font-semibold">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Add padding to account for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
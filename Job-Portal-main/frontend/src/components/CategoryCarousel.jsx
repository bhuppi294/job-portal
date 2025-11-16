import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code2, Briefcase, Building2, GraduationCap, LineChart, Globe2, Cpu, Palette } from 'lucide-react';

const categories = [
  { icon: <Code2 className="h-8 w-8" />, name: 'Technology', color: 'from-blue-500 to-cyan-500' },
  { icon: <Briefcase className="h-8 w-8" />, name: 'Business', color: 'from-purple-500 to-pink-500' },
  { icon: <Building2 className="h-8 w-8" />, name: 'Real Estate', color: 'from-green-500 to-emerald-500' },
  { icon: <GraduationCap className="h-8 w-8" />, name: 'Education', color: 'from-yellow-500 to-orange-500' },
  { icon: <LineChart className="h-8 w-8" />, name: 'Finance', color: 'from-red-500 to-pink-500' },
  { icon: <Globe2 className="h-8 w-8" />, name: 'Marketing', color: 'from-indigo-500 to-purple-500' },
  { icon: <Cpu className="h-8 w-8" />, name: 'Engineering', color: 'from-teal-500 to-blue-500' },
  { icon: <Palette className="h-8 w-8" />, name: 'Design', color: 'from-pink-500 to-rose-500' },
];

const CategoryCarousel = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Explore by <span className="text-purple-400">Category</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover opportunities across various industries and find the perfect match for your skills and interests
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/jobs')}
              className="group cursor-pointer"
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20`}>
                <div className="relative z-10">
                  <div className="mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/jobs')}
            className="inline-flex items-center px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all hover:shadow-lg hover:shadow-purple-500/50"
          >
            View All Categories
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
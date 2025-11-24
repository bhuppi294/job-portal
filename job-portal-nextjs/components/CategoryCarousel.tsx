'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const categories = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Marketing',
  'Design',
  'Sales',
  'Engineering',
]

export function CategoryCarousel() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse by <span className="text-purple-600">Category</span>
          </h2>
          <p className="text-gray-600">Find jobs in your preferred industry</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Badge
                variant="secondary"
                className="cursor-pointer px-6 py-3 text-base hover:bg-purple-600 hover:text-white transition-colors"
              >
                {category}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

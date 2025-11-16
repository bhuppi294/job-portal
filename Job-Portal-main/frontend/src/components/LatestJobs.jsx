import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const { jobs } = useSelector((store) => store.job);
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Latest <span className="text-purple-600">Job Openings</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our most recent job opportunities and take the next step in your career journey
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {jobs?.slice(0, 6).map((job) => (
                        <motion.div
                            key={job._id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                            <Building2 className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                            <p className="text-gray-600">{job.company}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
                                        {job.type}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Briefcase className="w-4 h-4 mr-2" />
                                        <span>{job.experience}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-gray-900">${job.salary}</span>
                                    <button
                                        onClick={() => navigate(`/description/${job._id}`)}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                                    >
                                        View Details
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

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
                        View All Jobs
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

export default LatestJobs
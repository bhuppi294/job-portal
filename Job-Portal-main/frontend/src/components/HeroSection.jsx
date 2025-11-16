import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const AnimatedSphere = () => {
  return (
    <Sphere args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#4B0082"
        attach="material"
        distort={0.5}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl font-bold text-white md:text-7xl"
          >
            Find Your Dream Job
            <span className="block text-purple-400">Build Your Future</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-lg text-gray-300 md:text-xl"
          >
            Discover thousands of job opportunities with top companies around the world
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <button
              onClick={() => navigate('/jobs')}
              className="rounded-full bg-purple-600 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Browse Jobs
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="rounded-full border-2 border-purple-500 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-purple-500/10"
            >
              Get Started
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-8 text-center sm:grid-cols-4"
          >
            {[
              { number: '10K+', label: 'Active Jobs' },
              { number: '500+', label: 'Companies' },
              { number: '50K+', label: 'Job Seekers' },
              { number: '95%', label: 'Success Rate' },
            ].map((stat, index) => (
              <div key={index} className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-purple-400">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-8 w-5 rounded-full border-2 border-white/30 p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="h-2 w-1 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
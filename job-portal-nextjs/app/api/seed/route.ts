import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('Starting database seed...')

    // Create sample users
    const user1 = await prisma.user.upsert({
      where: { email: 'recruiter@techcorp.com' },
      update: {},
      create: {
        clerkId: 'seed_user_1',
        email: 'recruiter@techcorp.com',
        fullName: 'Sarah Johnson',
        role: 'recruiter',
        phoneNumber: '+1234567890',
        bio: 'HR Manager at TechCorp with 5+ years of experience',
      },
    })

    const user2 = await prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        clerkId: 'seed_user_2',
        email: 'john@example.com',
        fullName: 'John Doe',
        role: 'student',
        phoneNumber: '+1987654321',
        bio: 'Full-stack developer passionate about React and Node.js',
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB'],
      },
    })

    // Create sample companies
    const techCorp = await prisma.company.upsert({
      where: { id: 'tech-corp-1' },
      update: {},
      create: {
        id: 'tech-corp-1',
        name: 'TechCorp Solutions',
        description: 'Leading technology company specializing in AI and Machine Learning solutions',
        website: 'https://techcorp.example.com',
        location: 'San Francisco, CA',
        userId: user1.id,
      },
    })

    const innovateLab = await prisma.company.upsert({
      where: { id: 'innovate-lab-1' },
      update: {},
      create: {
        id: 'innovate-lab-1',
        name: 'InnovateLab',
        description: 'Startup focused on building next-generation mobile applications',
        website: 'https://innovatelab.example.com',
        location: 'New York, NY',
        userId: user1.id,
      },
    })

    const cloudSystems = await prisma.company.upsert({
      where: { id: 'cloud-systems-1' },
      update: {},
      create: {
        id: 'cloud-systems-1',
        name: 'CloudSystems Inc',
        description: 'Enterprise cloud infrastructure and DevOps solutions provider',
        website: 'https://cloudsystems.example.com',
        location: 'Seattle, WA',
        userId: user1.id,
      },
    })

    // Create sample jobs
    await prisma.job.createMany({
      data: [
        {
          title: 'Senior Full Stack Developer',
          description: 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will work on cutting-edge projects using React, Node.js, and cloud technologies. This role offers great opportunities for growth and learning.',
          requirements: ['5+ years of experience', 'React', 'Node.js', 'TypeScript', 'AWS or Azure', 'PostgreSQL', 'Git'],
          salary: 120000,
          location: 'San Francisco, CA (Hybrid)',
          jobType: 'Full-time',
          experienceLevel: 5,
          position: 2,
          companyId: techCorp.id,
          createdById: user1.id,
        },
        {
          title: 'React Native Developer',
          description: 'Join our mobile team to build beautiful, high-performance mobile applications. You will collaborate with designers and backend engineers to create seamless user experiences.',
          requirements: ['3+ years React Native', 'JavaScript/TypeScript', 'iOS/Android development', 'RESTful APIs', 'Redux or MobX'],
          salary: 95000,
          location: 'New York, NY (Remote)',
          jobType: 'Full-time',
          experienceLevel: 3,
          position: 1,
          companyId: innovateLab.id,
          createdById: user1.id,
        },
        {
          title: 'DevOps Engineer',
          description: 'We need a skilled DevOps Engineer to optimize our CI/CD pipelines and cloud infrastructure. You will work with Kubernetes, Docker, and modern automation tools.',
          requirements: ['Docker', 'Kubernetes', 'AWS/GCP', 'Terraform', 'Jenkins or GitLab CI', 'Linux', 'Python/Bash scripting'],
          salary: 110000,
          location: 'Seattle, WA (On-site)',
          jobType: 'Full-time',
          experienceLevel: 4,
          position: 1,
          companyId: cloudSystems.id,
          createdById: user1.id,
        },
        {
          title: 'Frontend Developer Intern',
          description: 'Great opportunity for students or recent graduates to learn and grow. You will work on real projects using React and modern frontend technologies under the mentorship of senior developers.',
          requirements: ['HTML/CSS/JavaScript', 'React basics', 'Git', 'Willingness to learn', 'Currently pursuing or completed CS degree'],
          salary: 45000,
          location: 'San Francisco, CA (Hybrid)',
          jobType: 'Internship',
          experienceLevel: 0,
          position: 3,
          companyId: techCorp.id,
          createdById: user1.id,
        },
        {
          title: 'UI/UX Designer',
          description: 'Creative designer needed to craft beautiful and intuitive user interfaces. You will work closely with product managers and developers to bring ideas to life.',
          requirements: ['Figma/Sketch', 'User research', 'Prototyping', 'Design systems', '3+ years experience', 'Portfolio required'],
          salary: 85000,
          location: 'New York, NY (Hybrid)',
          jobType: 'Full-time',
          experienceLevel: 3,
          position: 1,
          companyId: innovateLab.id,
          createdById: user1.id,
        },
        {
          title: 'Backend Engineer (Node.js)',
          description: 'Build scalable backend services and APIs. Work with microservices architecture, databases, and cloud platforms. Great team culture and work-life balance.',
          requirements: ['Node.js', 'Express/Fastify', 'MongoDB or PostgreSQL', 'Redis', 'Microservices', 'Unit testing', '4+ years experience'],
          salary: 105000,
          location: 'Seattle, WA (Remote)',
          jobType: 'Full-time',
          experienceLevel: 4,
          position: 2,
          companyId: cloudSystems.id,
          createdById: user1.id,
        },
      ],
      skipDuplicates: true,
    })

    return NextResponse.json(
      {
        message: 'Database seeded successfully!',
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      {
        message: 'Error seeding database',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      },
      { status: 500 }
    )
  }
}

#!/usr/bin/env node

async function seed() {
  const prismaModule = await import('../lib/prisma.js');
  const { prisma } = prismaModule;

  try {
    console.log('🌱 Starting database seed...\n');

    // Create sample users
    console.log('Creating users...');
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
    });

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
    });

    console.log('✅ Users created\n');

    // Create sample companies
    console.log('Creating companies...');
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
    });

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
    });

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
    });

    console.log('✅ Companies created\n');

    // Create sample jobs
    console.log('Creating jobs...');
    
    // Check if jobs already exist
    const existingJobs = await prisma.job.count();
    
    if (existingJobs === 0) {
      await prisma.job.createMany({
        data: [
          {
            title: 'Senior Full Stack Developer',
            description: 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will work on cutting-edge projects using React, Node.js, and cloud technologies.',
            requirements: ['5+ years experience', 'React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
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
            description: 'Join our mobile team to build beautiful, high-performance mobile applications.',
            requirements: ['3+ years React Native', 'JavaScript/TypeScript', 'iOS/Android', 'REST APIs'],
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
            description: 'Optimize our CI/CD pipelines and cloud infrastructure with Kubernetes and Docker.',
            requirements: ['Docker', 'Kubernetes', 'AWS/GCP', 'Terraform', 'Jenkins', 'Linux'],
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
            description: 'Great opportunity for students or recent graduates to learn and grow with React.',
            requirements: ['HTML/CSS/JavaScript', 'React basics', 'Git', 'CS degree in progress'],
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
            description: 'Creative designer needed to craft beautiful and intuitive user interfaces.',
            requirements: ['Figma/Sketch', 'User research', 'Prototyping', 'Design systems', 'Portfolio'],
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
            description: 'Build scalable backend services with microservices architecture and cloud platforms.',
            requirements: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Microservices', 'Testing'],
            salary: 105000,
            location: 'Seattle, WA (Remote)',
            jobType: 'Full-time',
            experienceLevel: 4,
            position: 2,
            companyId: cloudSystems.id,
            createdById: user1.id,
          },
        ],
      });
      console.log('✅ Jobs created\n');
    } else {
      console.log(`⏭️  Skipped job creation (${existingJobs} jobs already exist)\n`);
    }

    console.log('🎉 Database seeded successfully!\n');
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seed();

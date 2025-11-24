import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      )
    }

    const [totalJobs, totalCompanies, totalApplications] = await Promise.all([
      prisma.job.count(),
      prisma.company.count(),
      prisma.application.count(),
    ])

    return NextResponse.json(
      {
        stats: {
          totalJobs,
          totalCompanies,
          totalApplications,
        },
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    // Find user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = await request.json();

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return NextResponse.json(
        { message: 'Something is missing', success: false },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        requirements: requirements.split(',').map((r: string) => r.trim()),
        salary: Number(salary),
        location,
        jobType,
        experienceLevel: Number(experience),
        position: Number(position),
        companyId,
        createdById: user.id,
      },
      include: {
        company: true,
      },
    });

    return NextResponse.json(
      { message: 'New job created successfully', job, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

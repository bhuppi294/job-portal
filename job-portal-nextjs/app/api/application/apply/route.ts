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

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    const { id: jobId } = await request.json();

    if (!jobId) {
      return NextResponse.json(
        { message: 'Job id is required', success: false },
        { status: 400 }
      );
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        applicantId: user.id,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { message: 'You have already applied for this job', success: false },
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json(
        { message: 'Job not found', success: false },
        { status: 404 }
      );
    }

    await prisma.application.create({
      data: {
        jobId,
        applicantId: user.id,
      },
    });

    return NextResponse.json(
      { message: 'Job applied successfully', success: true },
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

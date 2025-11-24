import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Application } from '@/models/application.model';
import { Job } from '@/models/job.model';
import { auth } from '@clerk/nextjs/server';

async function getApplicantsHandler(
  request: NextRequest,
  userId: string,
  jobId: string
) {
  try {
    await connectDB();

    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant',
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: 'Job not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { job, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session.userId;
  
  if (!userId) {
    return NextResponse.json(
      { message: 'User not authenticated', success: false },
      { status: 401 }
    );
  }

  return getApplicantsHandler(request, userId, params.id);
}

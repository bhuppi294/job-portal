import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Job } from '@/models/job.model';
import { requireAuth } from '@/lib/auth';

async function getAdminJobsHandler(request: NextRequest, userId: string) {
  try {
    await connectDB();

    const jobs = await Job.find({ created_by: userId })
      .populate({
        path: 'company',
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { jobs, success: true },
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

export const GET = requireAuth(getAdminJobsHandler);

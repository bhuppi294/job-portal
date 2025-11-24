import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Application } from '@/models/application.model';
import { requireAuth } from '@/lib/auth';

async function updateStatusHandler(request: NextRequest, userId: string) {
  try {
    await connectDB();

    const { status } = await request.json();
    const searchParams = request.nextUrl.searchParams;
    const applicationId = searchParams.get('id');

    if (!status) {
      return NextResponse.json(
        { message: 'Status is required', success: false },
        { status: 400 }
      );
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return NextResponse.json(
        { message: 'Application not found', success: false },
        { status: 404 }
      );
    }

    application.status = status.toLowerCase();
    await application.save();

    return NextResponse.json(
      { message: 'Status updated successfully', success: true },
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

export const POST = requireAuth(updateStatusHandler);

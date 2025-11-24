import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Company } from '@/models/company.model';
import { auth } from '@clerk/nextjs/server';

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

  try {
    await connectDB();

    const company = await Company.findById(params.id);

    if (!company) {
      return NextResponse.json(
        { message: 'Company not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { company, success: true },
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

export async function PUT(
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

  try {
    await connectDB();

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const website = formData.get('website') as string;
    const location = formData.get('location') as string;
    const file = formData.get('file') as File | null;

    let logo;
    if (file) {
      const { uploadToCloudinary } = await import('@/lib/cloudinary');
      logo = await uploadToCloudinary(file);
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;
    if (logo) updateData.logo = logo;

    const company = await Company.findByIdAndUpdate(params.id, updateData, { new: true });

    if (!company) {
      return NextResponse.json(
        { message: 'Company not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Company information updated', company, success: true },
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

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

    const { companyName, description, website, location } = await request.json();

    if (!companyName) {
      return NextResponse.json(
        { message: 'Company name is required', success: false },
        { status: 400 }
      );
    }

    const existingCompany = await prisma.company.findFirst({
      where: { name: companyName },
    });

    if (existingCompany) {
      return NextResponse.json(
        { message: 'Company already exists', success: false },
        { status: 400 }
      );
    }

    const company = await prisma.company.create({
      data: {
        name: companyName,
        description: description || null,
        website: website || null,
        location: location || null,
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: 'Company registered successfully', company, success: true },
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

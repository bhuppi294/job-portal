import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { message: 'Unauthorized', success: false },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const bio = formData.get('bio') as string;
    const skills = formData.get('skills') as string;
    const file = formData.get('file') as File | null;

    let skillsArray: string[] | undefined;
    if (skills) {
      skillsArray = skills.split(',').map(s => s.trim());
    }

    // Find user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (bio) updateData.bio = bio;
    if (skills) updateData.skills = skillsArray;

    // Handle file upload
    if (file) {
      const cloudinaryUrl = await uploadToCloudinary(file);
      updateData.resume = cloudinaryUrl;
      updateData.resumeOriginalName = file.name;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: updateData,
    });

    return NextResponse.json(
      { 
        message: 'Profile updated successfully', 
        user: {
          id: updatedUser.id,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          phoneNumber: updatedUser.phoneNumber,
          role: updatedUser.role,
          bio: updatedUser.bio,
          skills: updatedUser.skills,
          resume: updatedUser.resume,
          resumeOriginalName: updatedUser.resumeOriginalName,
          profilePhoto: updatedUser.profilePhoto,
        },
        success: true 
      },
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

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const fullname = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;
    const file = formData.get('file') as File | null;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return NextResponse.json(
        { message: 'Something is missing', success: false },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email', success: false },
        { status: 400 }
      );
    }

    let profilePhoto = '';
    if (file) {
      profilePhoto = await uploadToCloudinary(file);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber: parseInt(phoneNumber),
      password: hashedPassword,
      role,
      profile: {
        profilePhoto,
      },
    });

    return NextResponse.json(
      { message: 'Account created successfully', success: true },
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

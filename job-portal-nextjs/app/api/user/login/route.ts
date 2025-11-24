import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: 'Something is missing', success: false },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Incorrect email or password', success: false },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: 'Incorrect email or password', success: false },
        { status: 400 }
      );
    }

    if (role !== user.role) {
      return NextResponse.json(
        { message: "Account doesn't exist with current role", success: false },
        { status: 400 }
      );
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY!, { expiresIn: '1d' });

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    const response = NextResponse.json(
      { message: `Welcome back ${user.fullname}`, user: userData, success: true },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      maxAge: 24 * 60 * 60,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

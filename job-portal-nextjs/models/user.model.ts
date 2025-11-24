import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullname: string;
  email: string;
  phoneNumber: number;
  password: string;
  role: 'student' | 'recruiter';
  profile: {
    bio?: string;
    skills?: string[];
    resume?: string;
    resumeOriginalName?: string;
    company?: mongoose.Types.ObjectId;
    profilePhoto?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'recruiter'],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: { type: Schema.Types.ObjectId, ref: 'Company' },
      profilePhoto: {
        type: String,
        default: '',
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

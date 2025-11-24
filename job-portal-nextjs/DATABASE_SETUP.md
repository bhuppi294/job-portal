# Database Setup Guide

## Overview
This application uses **Neon PostgreSQL** as the database and **Prisma ORM** for type-safe database access. User authentication is handled by **Clerk**.

## Database Connection

Your Neon PostgreSQL database is already connected:
```
postgresql://neondb_owner:npg_prUSIv70NKOn@ep-winter-breeze-a12zoqdc-pooler.ap-southeast-1.aws.neon.tech/neondb
```

## Database Schema

The application has 4 main models:

### User
- Stores user profile information
- Linked to Clerk authentication via `clerkId`
- Fields: fullName, email, phoneNumber, role, bio, skills, resume, etc.

### Company
- Created by recruiters
- Has one-to-many relationship with Jobs
- Fields: name, description, website, location, logo

### Job
- Posted by companies
- Has many Applications
- Fields: title, description, requirements, salary, location, jobType, experienceLevel, position

### Application
- Created when a user applies to a job
- Links User and Job
- Fields: status (pending, accepted, rejected)

## Prisma Commands

### View Database in Prisma Studio
```bash
npx prisma studio
```
This opens a GUI at http://localhost:5555 to view and edit your database.

### Generate Prisma Client (after schema changes)
```bash
npx prisma generate
```

### Push Schema Changes to Database
```bash
npx prisma db push
```

### Create Migration (for production)
```bash
npx prisma migrate dev --name your_migration_name
```

## Clerk Webhook Setup

To sync users from Clerk to your database:

1. Go to Clerk Dashboard → Webhooks
2. Create a new webhook endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Subscribe to these events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
4. Copy the signing secret
5. Add it to `.env.local`:
   ```
   CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

When users sign up via Clerk, they'll automatically be created in your PostgreSQL database.

## Database Access in Code

```typescript
import { prisma } from '@/lib/prisma'

// Example: Get all jobs
const jobs = await prisma.job.findMany({
  include: {
    company: true,
    applications: true,
  }
})

// Example: Create a company
const company = await prisma.company.create({
  data: {
    name: 'Tech Corp',
    userId: user.id,
  }
})
```

## Environment Variables

Make sure these are set in `.env` or `.env.local`:

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Migration from MongoDB

All API routes have been updated to use Prisma:
- ✅ User profile routes
- ✅ Company CRUD routes
- ✅ Job posting and listing
- ✅ Application management

The old Mongoose models in `/models` are no longer used.

## Troubleshooting

### "Can't reach database server"
- Check your DATABASE_URL in `.env` is correct
- Verify your Neon database is active
- Check for SSL requirements (`sslmode=require`)

### "User not found" after Clerk sign-in
- Set up the Clerk webhook (see above)
- Or manually create a user record after sign-in

### Prisma Client not found
- Run `npx prisma generate`
- Restart your dev server

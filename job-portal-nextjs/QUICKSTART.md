# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd job-portal-nextjs
npm install
```

### 2. Configure Environment
```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your values:
# - MONGO_URI (MongoDB connection)
# - SECRET_KEY (32+ character random string)
# - CLOUDINARY credentials
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

---

## 📋 Common Commands

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint --fix   # Auto-fix linting issues
```

---

## 🔧 Setup MongoDB

### Option 1: Local MongoDB
```bash
# Install MongoDB
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb

# Start MongoDB
# macOS: brew services start mongodb-community
# Ubuntu: sudo systemctl start mongod

# In .env.local:
MONGO_URI=mongodb://localhost:27017/job-portal
```

### Option 2: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to `.env.local`:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-portal
```

---

## 🔐 Setup Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Get credentials from dashboard
4. Add to `.env.local`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🎯 Generate JWT Secret

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Add to .env.local:
SECRET_KEY=generated_secret_here
```

---

## 📱 Test the Application

### Register a User
1. Go to `/signup`
2. Fill in details
3. Select role (student/recruiter)
4. Upload profile photo (optional)

### As a Recruiter
1. Login with recruiter account
2. Go to `/admin/companies`
3. Create a company
4. Post a job

### As a Student
1. Login with student account
2. Browse jobs at `/jobs`
3. Apply to jobs
4. Check application status in profile

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### MongoDB Connection Error
- Check MongoDB is running
- Verify connection string in `.env.local`
- Check network access (for Atlas)

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors
```bash
# Regenerate types
npm run build
```

---

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables
```

Or push to GitHub and import in Vercel dashboard.

---

## 📚 Learn More

- **Project Structure**: See `MIGRATION.md`
- **API Documentation**: See `README.md`
- **Contributing**: Create issues or PRs on GitHub

---

**Need Help?** Check existing issues or create a new one!

# Job Portal - Next.js Full Stack Application

A modern, full-stack job portal built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS. This application combines frontend and backend in a single Next.js project with API routes.

## ✨ Features

### For Job Seekers
- 🔍 Browse and search jobs
- 📝 Create and manage profile
- 📄 Upload resume
- 💼 Apply to jobs
- 📊 Track application status

### For Recruiters
- 🏢 Create and manage companies
- 📢 Post job listings
- 👥 View applicants
- ✅ Accept/reject applications
- 📈 Manage job postings

### Technical Features
- ⚡ Server-side rendering (SSR) with Next.js
- 🎨 Beautiful UI with Tailwind CSS and Framer Motion
- 🔐 JWT authentication with httpOnly cookies
- 📤 File uploads to Cloudinary
- 🗄️ MongoDB database with Mongoose
- 🔄 Redux Toolkit for state management
- 📱 Fully responsive design
- 🎭 Role-based access control (Student/Recruiter)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account for file uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd job-portal-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/job-portal
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-portal
   
   SECRET_KEY=your_jwt_secret_key_here_min_32_characters
   
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
job-portal-nextjs/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes (Backend)
│   │   ├── user/             # User authentication endpoints
│   │   ├── company/          # Company management endpoints
│   │   ├── job/              # Job posting endpoints
│   │   └── application/      # Application endpoints
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── providers.tsx         # Redux & Theme providers
├── components/               # React components
│   ├── shared/               # Shared components (Navbar, Footer)
│   └── ui/                   # UI primitives
├── lib/                      # Utility functions
│   ├── auth.ts               # Authentication helpers
│   ├── cloudinary.ts         # Cloudinary configuration
│   ├── db.ts                 # Database connection
│   └── utils.ts              # General utilities
├── models/                   # Mongoose models
│   ├── user.model.ts
│   ├── company.model.ts
│   ├── job.model.ts
│   └── application.model.ts
├── redux/                    # Redux state management
│   ├── store.ts
│   ├── authSlice.ts
│   ├── jobSlice.ts
│   ├── companySlice.ts
│   └── applicationSlice.ts
└── utils/                    # Constants and helpers
```

## 🔑 API Endpoints

### User APIs
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `POST /api/user/profile/update` - Update user profile

### Company APIs
- `POST /api/company/register` - Register company
- `GET /api/company/get` - Get all companies
- `GET /api/company/[id]` - Get company by ID
- `PUT /api/company/[id]` - Update company

### Job APIs
- `POST /api/job/post` - Post new job
- `GET /api/job/get` - Get all jobs
- `GET /api/job/[id]` - Get job by ID
- `GET /api/job/getadminjobs` - Get recruiter's jobs

### Application APIs
- `POST /api/application/apply` - Apply to job
- `GET /api/application/get` - Get user's applications
- `GET /api/application/[id]/applicants` - Get job applicants
- `POST /api/application/status/update` - Update application status

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with httpOnly cookies
- **State Management**: Redux Toolkit, Redux Persist
- **File Upload**: Cloudinary
- **UI Components**: Radix UI primitives

## 📦 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker
```bash
# Build image
docker build -t job-portal .

# Run container
docker run -p 3000:3000 --env-file .env.local job-portal
```

## 🔐 Security Best Practices

- JWT tokens stored in httpOnly cookies
- Password hashing with bcrypt
- Environment variables for sensitive data
- Input validation on API routes
- CORS configuration
- Rate limiting (recommended to add)

## 🎨 UI/UX Improvements

Compared to the original project:
- ✅ Unified codebase (no separate frontend/backend)
- ✅ Server-side rendering for better SEO
- ✅ Optimized images with next/image
- ✅ Better code splitting and lazy loading
- ✅ TypeScript for type safety
- ✅ Improved error handling
- ✅ Better mobile responsiveness

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `SECRET_KEY` | JWT secret key (min 32 chars) | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `NEXT_PUBLIC_API_URL` | API base URL | Yes |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js and modern web technologies
- UI components from Radix UI
- Icons from Lucide React
- Animations with Framer Motion

---

Made with ❤️ using Next.js

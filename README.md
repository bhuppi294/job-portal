# Job-Portal
A modern job portal application built with React (Frontend) and Node.js (Backend) that helps job seekers find opportunities and employers post jobs.  Features User authentication and authorization Job posting and management Job search and filtering User profiles Application tracking Modern and responsive UI Real-time updates
Tech Stack
Frontend
React 19
Vite
Redux Toolkit
React Router
Tailwind CSS
Framer Motion
Three.js
Radix UI Components
Backend
Node.js
Express.js
MongoDB
JWT Authentication
Prerequisites
Node.js (v18 or higher)
npm or yarn
MongoDB (local or Atlas)
Setup Instructions
Backend Setup
Navigate to the backend directory:

cd backend
Install dependencies:

npm install
Create a .env file in the backend directory with the following variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

npm start
The backend server will run on http://localhost:5000

Frontend Setup
Navigate to the frontend directory:

cd frontend
Install dependencies:

npm install
Create a .env file in the frontend directory with the following variables:

VITE_API_URL=http://localhost:5000
Start the development server:

npm run dev
The frontend application will run on http://localhost:5173

Project Structure
Backend Structure
backend/
├── controllers/    # Request handlers
├── models/        # Database models
├── routes/        # API routes
├── middlewares/   # Custom middlewares
├── utils/         # Utility functions
└── index.js       # Entry point
Frontend Structure
frontend/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/        # Page components
│   ├── store/        # Redux store
│   ├── hooks/        # Custom hooks
│   ├── utils/        # Utility functions
│   └── App.jsx       # Root component
└── public/          # Static assets
Available Scripts
Backend
npm start - Start the server
npm run dev - Start the server in development mode with nodemon
Frontend
npm run dev - Start the development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

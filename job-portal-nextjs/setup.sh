#!/bin/bash

echo "🚀 Job Portal Next.js - Setup Script"
echo "===================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your credentials:"
    echo "   - MongoDB connection string"
    echo "   - JWT secret key"
    echo "   - Cloudinary credentials"
    echo ""
    read -p "Press Enter after you've updated .env.local..."
fi

echo ""
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Available commands:"
echo "  npm run dev      - Start development server (http://localhost:3000)"
echo "  npm run build    - Build for production"
echo "  npm start        - Start production server"
echo ""
echo "📚 Check README.md for more information"
echo ""
read -p "Start development server now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run dev
fi

#!/bin/bash

# AgriNova Deployment Script
# This script deploys the Next.js application on your VPS

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/agrinova-frontend || exit

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Restart the application with PM2
echo "♻️  Restarting application..."
pm2 restart agrinova-frontend || pm2 start npm --name "agrinova-frontend" -- start -- -p 8866

# Save PM2 configuration
pm2 save

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running on port 8866"

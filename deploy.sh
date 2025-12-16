#!/bin/bash

# Deploy Script for SQW Project
# สำหรับใช้บน Linux/Unix servers เช่น rukcom

echo "🚀 Starting deployment process..."

# 1. Build frontend
echo "📦 Building Vue.js application..."
npm install
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend build complete!"

# 2. Prepare backend
echo "📦 Preparing backend server..."
cd server
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Backend dependencies installation failed!"
    exit 1
fi

echo "✅ Backend dependencies installed!"

# 3. Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Copying from .env.production..."
    cp .env.production .env
    echo "⚠️  Please update .env with your production credentials!"
fi

# 4. Create logs directory
mkdir -p logs

# 5. Restart backend with PM2 (if available)
if command -v pm2 &> /dev/null; then
    echo "🔄 Restarting backend with PM2..."
    pm2 restart sqw-backend || pm2 start ecosystem.config.json
    pm2 save
    echo "✅ Backend restarted!"
else
    echo "⚠️  PM2 not found. Please install PM2 or start server manually:"
    echo "   npm install -g pm2"
    echo "   pm2 start ecosystem.config.json"
fi

cd ..

# 6. Create .htaccess if not exists
if [ ! -f dist/.htaccess ]; then
    echo "📝 Creating .htaccess..."
    cp .htaccess.example dist/.htaccess
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Upload dist/ folder contents to public_html/ on rukcom"
echo "2. Upload server/ folder to home directory on rukcom"
echo "3. Update .env with production credentials"
echo "4. Start backend server with: pm2 start ecosystem.config.json"
echo "5. Test your application at your domain"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"

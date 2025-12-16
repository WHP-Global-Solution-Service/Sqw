@echo off
REM Deploy Script for SQW Project (Windows)
REM สำหรับ build บน Windows ก่อนอัปโหลดขึ้น server

echo ========================================
echo   SQW Project - Build for Production
echo ========================================
echo.

REM 1. Build frontend
echo [1/3] Building Vue.js application...
call npm install
call npm run build

if errorlevel 1 (
    echo.
    echo [ERROR] Frontend build failed!
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Frontend build complete!
echo.

REM 2. Prepare backend
echo [2/3] Preparing backend server...
cd server
call npm install --production

if errorlevel 1 (
    echo.
    echo [ERROR] Backend dependencies installation failed!
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo [SUCCESS] Backend dependencies installed!
echo.

REM 3. Check .env file
if not exist "server\.env" (
    echo [WARNING] .env file not found in server/
    if exist "server\.env.production" (
        copy "server\.env.production" "server\.env"
        echo [INFO] Copied .env.production to .env
        echo [WARNING] Please update .env with your production credentials!
    )
)

REM 4. Create .htaccess if not exists
if not exist "dist\.htaccess" (
    if exist ".htaccess.example" (
        echo [3/3] Creating .htaccess...
        copy ".htaccess.example" "dist\.htaccess"
        echo [SUCCESS] .htaccess created!
    )
)

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo Files ready for deployment:
echo.
echo   Frontend: dist/
echo   Backend:  server/
echo.
echo Next steps for rukcom:
echo.
echo 1. Login to cPanel File Manager
echo 2. Upload dist/ contents to public_html/
echo 3. Upload server/ folder to home directory
echo 4. Use Terminal or SSH to run:
echo    cd server
echo    npm install
echo    pm2 start ecosystem.config.json
echo.
echo 5. Configure .env with production settings
echo 6. Test at your domain
echo.
echo See DEPLOYMENT.md for detailed instructions
echo.
pause

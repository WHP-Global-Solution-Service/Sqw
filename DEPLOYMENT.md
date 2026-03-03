# คู่มือการ Deploy โปรเจค SQW ขึ้น Server

## ข้อกำหนดของ Server
- Node.js v14 ขึ้นไป
- npm หรือ yarn
- Web server (Apache/Nginx) สำหรับ serve static files
- SSL Certificate สำหรับ HTTPS

---

## ขั้นตอนการ Deploy

### 1. Build Frontend (Vue.js)

```bash
# ในโฟลเดอร์หลัก
npm install
npm run build
```

ไฟล์ที่ build แล้วจะอยู่ในโฟลเดอร์ `dist/`

### 2. เตรียม Backend Server

```bash
# ไปที่โฟลเดอร์ server
cd server

# ติดตั้ง dependencies
npm install

# สร้างไฟล์ .env
cp .env.example .env
```

แก้ไขไฟล์ `.env`:
```env
# Production Settings
PORT=3001
NODE_ENV=production

# ChillPay Configuration
CHILLPAY_MERCHANT_CODE=M037016
CHILLPAY_API_KEY=<your-api-key>
CHILLPAY_MD5_SECRET=<your-md5-secret>

# ปิด Mock Mode สำหรับ production
MOCK_MODE=false

# URL สำหรับ production
CHILLPAY_API_URL=https://pgw.chillpay.co
```

### 3. อัปโหลดไฟล์ขึ้น Server (rukcom)

#### 3.1 อัปโหลด Frontend
```bash
# อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์ dist/ ไปที่
/public_html/
# หรือ
/www/
# (ขึ้นอยู่กับโครงสร้างของ rukcom)
```

#### 3.2 อัปโหลด Backend
```bash
# อัปโหลดโฟลเดอร์ server/ ไปที่
/home/your-username/server/
# หรือตำแหน่งอื่นนอก public_html
```

### 4. ตั้งค่า Web Server

#### สำหรับ Apache (rukcom มักใช้)

สร้างไฟล์ `.htaccess` ใน `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Proxy API requests to backend server
<IfModule mod_proxy.c>
  ProxyPass /api http://localhost:3001/api
  ProxyPassReverse /api http://localhost:3001/api
</IfModule>
```

### 5. เริ่มต้น Backend Server

#### วิธีที่ 1: ใช้ PM2 (แนะนำ)

```bash
# ติดตั้ง PM2
npm install -g pm2

# เริ่ม server
cd /home/your-username/server
pm2 start server.js --name sqw-backend

# ตั้งให้ start อัตโนมัติเมื่อ reboot
pm2 startup
pm2 save

# ดูสถานะ
pm2 status
pm2 logs sqw-backend
```

#### วิธีที่ 2: ใช้ Node.js โดยตรง

```bash
cd /home/your-username/server
node server.js &
```

### 6. แก้ไข Frontend Config

แก้ไขไฟล์ `src/app-script.js` ก่อน build:

```javascript
chillpay: {
  useBackend: true,
  backendUrl: 'https://yourdomain.com/api',  // เปลี่ยนเป็น domain จริง
  merchantCode: 'M037016'
}
```

### 7. ตั้งค่า Firebase (Production)

1. ไปที่ Firebase Console
2. เลือก Project Settings
3. คัดลอก Production Config
4. แก้ไขไฟล์ `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_PRODUCTION_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## การอัปเดตโปรเจค

### อัปเดต Frontend
```bash
# Local
npm run build

# อัปโหลดไฟล์ในโฟลเดอร์ dist/ ทับของเดิม
```

### อัปเดต Backend
```bash
# อัปโหลดไฟล์ที่แก้ไขใน server/
# Restart server
pm2 restart sqw-backend
```

---

## Troubleshooting

### ปัญหา: Backend ไม่ทำงาน
```bash
# เช็ค logs
pm2 logs sqw-backend

# เช็คว่า port 3001 ถูกใช้งานหรือไม่
netstat -tulpn | grep 3001
```

### ปัญหา: CORS Error
แก้ไขใน `server/server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com',  // ใส่ domain จริง
  credentials: true
}));
```

### ปัญหา: Payment Gateway ไม่ทำงาน
1. ตรวจสอบว่าปิด `MOCK_MODE=false` ใน `.env`
2. ตรวจสอบว่าใช้ Production URL: `https://pgw.chillpay.co`
3. ตรวจสอบ API Key และ MD5 Secret ถูกต้อง

### ปัญหา: Static files ไม่โหลด
ตรวจสอบ `.htaccess` และ permissions:
```bash
chmod 644 .htaccess
chmod 755 public_html/
```

---

## Security Checklist

- [ ] เปลี่ยน Firebase API Keys เป็น Production
- [ ] ตั้งค่า Firebase Security Rules
- [ ] ใช้ HTTPS (SSL Certificate)
- [ ] ตั้งค่า CORS ให้ถูกต้อง
- [ ] เก็บ `.env` ไว้นอก public_html
- [ ] ตั้ง `NODE_ENV=production`
- [ ] ปิด Debug Mode
- [ ] ซ่อน Error Messages ใน Production

---

## ข้อมูล Contact ChillPay

- Production API: `https://pgw.chillpay.co`
- Sandbox API: `https://sandbox-pgw.chillpay.co`
- Documentation: [ChillPay Docs]
- Support: ติดต่อ ChillPay Support Team

---

## Notes สำหรับ rukcom

1. rukcom มักมี cPanel ให้ใช้งาน:
   - File Manager: อัปโหลดไฟล์ผ่าน web
   - Terminal: SSH access (ถ้ามี)
   - Node.js Selector: เลือก Node.js version

2. ถ้าไม่มี SSH access:
   - ใช้ FTP/SFTP อัปโหลดไฟล์
   - ใช้ cPanel Application Manager รัน Node.js

3. สำหรับ Backend Server:
   - บางแพ็คเกจของ rukcom รองรับ Node.js
   - อาจต้องติดต่อ Support เพื่อ enable Node.js
   - พิจารณาใช้ Subdomain สำหรับ API (api.yourdomain.com)

---

## ขั้นตอนย่อสำหรับ rukcom

1. **Login cPanel** → เข้า File Manager
2. **อัปโหลด dist/** → ลงใน `public_html/`
3. **อัปโหลด server/** → ลงใน home directory
4. **Terminal** → `cd server && npm install && pm2 start server.js`
5. **Setup .htaccess** → สร้างไฟล์ตามด้านบน
6. **ทดสอบ** → เข้า https://yourdomain.com

---

## ติดต่อ Support

หากมีปัญหาการ deploy:
1. ตรวจสอบ error logs (`pm2 logs` หรือ browser console)
2. ติดต่อ rukcom support สำหรับ Node.js setup
3. ตรวจสอบ ChillPay documentation สำหรับ payment gateway

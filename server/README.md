# ChillPay Backend Server

Backend server สำหรับ integrate กับ ChillPay Payment Gateway (Sandbox Mode)

## � Production Deployment

### สำหรับ rukcom หรือ shared hosting อื่นๆ

1. **Build และเตรียมไฟล์:**
```bash
# บน local machine
npm install --production
```

2. **อัปโหลดไฟล์:**
- อัปโหลดโฟลเดอร์ `server/` ทั้งหมดขึ้น server
- แนะนำให้ไว้นอก `public_html/` เช่น `/home/username/server/`

3. **ตั้งค่า Environment:**
```bash
# สร้างไฟล์ .env จาก .env.production
cp .env.production .env

# แก้ไขค่าต่างๆ:
nano .env
```

4. **รัน Server ด้วย PM2:**
```bash
# ติดตั้ง PM2 (ครั้งเดียว)
npm install -g pm2

# Start server
pm2 start ecosystem.config.json

# Save configuration
pm2 save

# Auto-start on boot
pm2 startup
```

5. **ตรวจสอบสถานะ:**
```bash
pm2 status
pm2 logs sqw-backend
```

### Alternative: รันแบบปกติ (ไม่แนะนำ)
```bash
NODE_ENV=production node server.js &
```

## 🔧 Configuration Files

- `.env` - Environment variables (production)
- `.env.production` - Template สำหรับ production
- `ecosystem.config.json` - PM2 configuration

## 📖 เพิ่มเติม

ดูรายละเอียดเพิ่มเติมที่ `../DEPLOYMENT.md`

---

## �🚀 วิธีติดตั้งและรัน

### 1. ติดตั้ง dependencies

```bash
cd server
npm install
```

### 2. รัน server

**Development mode (auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server จะรันที่ `http://localhost:3001`

## 📡 API Endpoints

### 1. Create Payment
```
POST /api/payment/create
Content-Type: application/json

Body:
{
  "orderId": "LAND-xxx-timestamp",
  "amount": 100,
  "customerName": "John Doe",
  "landId": "land-id-123"
}

Response:
{
  "success": true,
  "data": {
    "Code": "0000",
    "Message": "Success",
    "PaymentUrl": "https://sandbox-pgw.chillpay.co/..."
  }
}
```

### 2. Check Payment Status
```
GET /api/payment/status/:orderId

Response:
{
  "success": true,
  "data": {
    "Code": "0000",
    "Status": "Success",
    "Amount": "100.00"
  }
}
```

### 3. Health Check
```
GET /health

Response:
{
  "status": "OK",
  "message": "ChillPay Backend Server is running"
}
```

## 🔐 Configuration

ใน `server.js` มี configuration:
- Merchant Code: M037016
- API Key: (เก็บไว้ใน server)
- MD5 Key: (เก็บไว้ใน server)
- Sandbox URL: https://sandbox-pgw.chillpay.co/api/v3

## 🧪 Testing

ทดสอบด้วย curl:

```bash
# Health check
curl http://localhost:3001/health

# Create payment
curl -X POST http://localhost:3001/api/payment/create \
  -H "Content-Type: application/json" \
  -d '{"orderId":"TEST-001","amount":100,"customerName":"Test User"}'
```

## 📝 หมายเหตุ

- นี่คือ Sandbox environment สำหรับทดสอบเท่านั้น
- อย่าใช้ใน production โดยตรง
- API Keys ควรเก็บใน environment variables
- ควรเพิ่ม authentication/authorization สำหรับ production

## 🔄 Integration กับ Frontend

อัปเดต `app-script.js` ให้เรียก backend แทน:

```javascript
async processChillPayPayment(land) {
  const response = await fetch('http://localhost:3001/api/payment/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId: `LAND-${land.id}-${Date.now()}`,
      amount: land.totalPrice || 100,
      customerName: this.userProfile?.name || 'Guest',
      landId: land.id
    })
  });
  
  const result = await response.json();
  if (result.success && result.data.PaymentUrl) {
    window.location.href = result.data.PaymentUrl;
  }
}
```

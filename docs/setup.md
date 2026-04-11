# Setup Guide

## 1) Database Setup
1. Create MySQL database and user.
2. Run schema:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

## 2) Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env
   ```
3. Start server:
   ```bash
   npm run dev
   ```

## 3) Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Optional env:
   ```bash
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```
3. Start frontend:
   ```bash
   npm run dev
   ```

## 4) Production Build
```bash
cd frontend && npm run build
cd ../backend && npm start
```

## 5) Recommended Production Improvements
- Add Redis caching for sessions/hot data.
- Move file uploads to S3-compatible storage.
- Add queue (BullMQ) for email/SMS and heavy jobs.
- Add observability (Prometheus, Grafana, structured logs).

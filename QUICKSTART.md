# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Manual Setup

#### 1. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

#### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📝 Test the Application

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Copy the token from the response.

### 3. Create a Task
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Task",
    "description": "This is a test task"
  }'
```

### 4. Get All Tasks
```bash
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🎯 Default Credentials

After registration, you can create an admin user:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

## 📚 Next Steps

1. Explore the Swagger documentation at http://localhost:5000/api-docs
2. Import `postman_collection.json` into Postman
3. Check the main README.md for detailed documentation
4. Review the code structure in backend/src and frontend/src

## 🐛 Common Issues

**Database connection error:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env

**Port already in use:**
- Change PORT in backend/.env
- Change port in frontend/vite.config.js

**CORS errors:**
- Verify backend is running on port 5000
- Check frontend API baseURL in src/services/api.js

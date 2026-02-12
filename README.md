# Task Management System - Production-Ready Full Stack Application

## 📋 Project Overview

A scalable, secure full-stack task management application with JWT authentication, role-based access control (RBAC), and RESTful API design. Built following enterprise-level architecture patterns and security best practices.

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API

### DevOps
- **Database**: PostgreSQL 15

## 📁 Folder Structure

```
project/
│
├── backend/
│   ├── src/
│   │   ├── config/          # Database & Swagger configuration
│   │   ├── controllers/     # Request/response handlers
│   │   ├── services/        # Business logic layer
│   │   ├── routes/          # API route definitions
│   │   ├── middlewares/     # Auth, error handling, etc.
│   │   ├── validators/      # Input validation rules
│   │   ├── utils/           # Helper functions
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Server entry point
│   │
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Auth context
│   │   ├── services/        # API service
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskdb?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="1h"
PORT=5000
NODE_ENV="development"
```

4. **Generate Prisma client**
```bash
npm run prisma:generate
```

5. **Run database migrations**
```bash
npm run prisma:migrate
```

6. **Start development server**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`
Swagger docs available at `http://localhost:5000/api-docs`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔐 Environment Variables

1. **Navigate to frontend directory**

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@localhost:5432/db |
| JWT_SECRET | Secret key for JWT signing | your-secret-key |
| JWT_EXPIRES_IN | Token expiration time | 1h |
| PORT | Backend server port | 5000 |
| NODE_ENV | Environment mode | development/production |

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |

### Tasks

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/v1/tasks` | Create task | Yes | USER/ADMIN |
| GET | `/api/v1/tasks` | Get all tasks | Yes | USER (own), ADMIN (all) |
| GET | `/api/v1/tasks/:id` | Get task by ID | Yes | USER (own), ADMIN (all) |
| PUT | `/api/v1/tasks/:id` | Update task | Yes | USER (own), ADMIN (all) |
| DELETE | `/api/v1/tasks/:id` | Delete task | Yes | USER (own), ADMIN (all) |

### Query Parameters (GET /tasks)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `search` - Search by title

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Helmet**: Security headers
- **CORS**: Configured cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: express-validator on all endpoints
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **Error Handling**: No sensitive data in error responses

## 👥 Role-Based Access Control (RBAC)

### USER Role
- Create own tasks
- View own tasks only
- Update own tasks
- Delete own tasks

### ADMIN Role
- View all tasks from all users
- Update any task
- Delete any task
- Full system access

## 📈 Scalability & Architecture

### Current Implementation
- **Clean Architecture**: Separation of concerns (Controllers → Services → Database)
- **Modular Design**: Easy to extend and maintain
- **Stateless Authentication**: JWT enables horizontal scaling
- **Database Indexing**: Optimized queries with Prisma

### Production Scalability Roadmap

#### 1. Horizontal Scaling
- Deploy multiple backend instances behind a load balancer (Nginx/AWS ALB)
- Stateless design allows seamless scaling
- Session management via JWT (no server-side sessions)

#### 2. Caching Layer
- Redis can be integrated for task caching
- Cache GET /tasks responses
- Invalidate cache on CREATE/UPDATE/DELETE

#### 3. Microservices Architecture
Split into independent services:
- **Auth Service**: User authentication & authorization
- **Task Service**: Task CRUD operations
- **Notification Service**: Email/push notifications
- **API Gateway**: Route requests, rate limiting, authentication

#### 4. Database Optimization
- **Read Replicas**: Separate read/write operations
- **Connection Pooling**: Prisma connection pool configuration
- **Indexing**: Add indexes on frequently queried fields
```prisma
model Task {
  @@index([userId])
  @@index([createdAt])
}
```

#### 5. Containerization & Orchestration
- **Docker**: Can containerize services for deployment
- **Kubernetes**: Deploy with auto-scaling, health checks
- **Helm Charts**: Manage Kubernetes deployments

#### 6. CI/CD Pipeline
```yaml
# Example GitHub Actions workflow
- Build & Test
- Run security scans
- Build Docker images
- Push to registry
- Deploy to staging
- Run integration tests
- Deploy to production
```

#### 7. Monitoring & Observability
- **Logging**: Structured logging with Winston or ELK Stack
- **Metrics**: Prometheus + Grafana
- **APM**: New Relic / DataDog
- **Error Tracking**: Sentry

#### 8. CDN & Asset Optimization
- Serve frontend through CDN (CloudFront, Cloudflare)
- Compress assets, lazy loading
- Service workers for offline support

## 🧪 Testing Strategy (Future Enhancement)

```javascript
// Unit tests
npm run test:unit

// Integration tests
npm run test:integration

// E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Backend Deployment (AWS Example)
1. **EC2/ECS**: Deploy Node.js application
2. **RDS**: Managed PostgreSQL database
3. **ALB**: Load balancer for multiple instances
4. **Route53**: DNS management
5. **CloudWatch**: Monitoring & logs

### Frontend Deployment
1. **S3 + CloudFront**: Static hosting with CDN
2. **Vercel/Netlify**: Automated deployments

## 📝 API Documentation

Access interactive Swagger documentation:
```
http://localhost:5000/api-docs
```

## 🔄 Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### JWT Token Errors
- Verify JWT_SECRET is set
- Check token expiration time
- Clear localStorage and re-login

### CORS Errors
- Verify backend CORS configuration
- Check frontend API base URL

## 📚 Future Improvements

- [ ] Refresh token mechanism
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Task categories/tags
- [ ] File attachments
- [ ] Real-time updates (WebSockets)
- [ ] Advanced search & filters
- [ ] Task assignment to multiple users
- [ ] Activity logs/audit trail
- [ ] Export tasks (CSV/PDF)
- [ ] Dark mode UI
- [ ] Mobile app (React Native)

## 📄 License

MIT License

## 👨‍💻 Author

Built with production-grade standards and scalability in mind.

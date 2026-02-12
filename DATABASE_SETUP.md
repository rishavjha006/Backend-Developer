# Database Setup

## Install PostgreSQL

### macOS (using Homebrew):
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Create Database:
```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE taskdb;
CREATE USER taskuser WITH PASSWORD 'taskpass';
GRANT ALL PRIVILEGES ON DATABASE taskdb TO taskuser;
\q
```

## Update .env file:
```env
DATABASE_URL="postgresql://taskuser:taskpass@localhost:5432/taskdb?schema=public"
```

## Run Migrations:
```bash
cd backend
npm run prisma:migrate
```

## Alternative: Use default postgres user
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskdb?schema=public"
```

Then create the database:
```bash
createdb taskdb
npm run prisma:migrate
```

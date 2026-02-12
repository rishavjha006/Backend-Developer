# Database Setup

## Install PostgreSQL

### macOS (using Homebrew):
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Windows:
1. Download PostgreSQL installer from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the postgres user
4. PostgreSQL service will start automatically

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Linux (CentOS/RHEL):
```bash
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Create Database

### macOS/Linux:
```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE taskdb;
CREATE USER taskuser WITH PASSWORD 'taskpass';
GRANT ALL PRIVILEGES ON DATABASE taskdb TO taskuser;
\q
```

### Windows:
1. Open SQL Shell (psql) from Start Menu
2. Press Enter for default values (server, database, port, username)
3. Enter the password you set during installation
4. Run these commands:
```sql
CREATE DATABASE taskdb;
CREATE USER taskuser WITH PASSWORD 'taskpass';
GRANT ALL PRIVILEGES ON DATABASE taskdb TO taskuser;
\q
```

## Update .env file:

### macOS/Linux:
```env
DATABASE_URL="postgresql://taskuser:taskpass@localhost:5432/taskdb?schema=public"
```

### Windows:
```env
DATABASE_URL="postgresql://taskuser:taskpass@localhost:5432/taskdb?schema=public"
```

## Run Migrations:
```bash
cd backend
npm run prisma:migrate
```

## Alternative: Use default postgres user

### macOS:
```env
DATABASE_URL="postgresql://$(whoami)@localhost:5432/taskdb?schema=public"
```

### Linux:
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE taskdb;
\q
```

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskdb?schema=public"
```

### Windows:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskdb?schema=public"
```

Then create the database:
```bash
# macOS/Linux
creatdb taskdb

# Windows (in SQL Shell)
CREATE DATABASE taskdb;

# Run migrations
cd backend
npm run prisma:migrate
```

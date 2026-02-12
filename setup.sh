#!/bin/bash

echo "🚀 Setting up Task Management System..."

# Backend setup
echo "\n📦 Installing backend dependencies..."
cd backend
npm install

echo "\n⚙️  Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file"
fi

echo "\n🔧 Generating Prisma client..."
npm run prisma:generate

echo "\n📊 Database setup required!"
echo "Please ensure PostgreSQL is running and create the database:"
echo "  createdb taskdb"
echo "\nThen run migrations:"
echo "  npm run prisma:migrate"

cd ..

# Frontend setup
echo "\n📦 Installing frontend dependencies..."
cd frontend
npm install

echo "\n✅ Setup complete!"
echo "\n🎯 Next steps:"
echo "1. Start PostgreSQL: brew services start postgresql@15"
echo "2. Create database: createdb taskdb"
echo "3. Run migrations: cd backend && npm run prisma:migrate"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend: cd frontend && npm run dev"

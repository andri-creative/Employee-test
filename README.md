# Employee Management System 👥

A modern, full-stack employee management application built with **Next.js 16**, **Prisma ORM**, and **PostgreSQL**. This system allows you to manage employee data efficiently with features like CSV bulk upload, data visualization, and advanced search capabilities.

## ✨ Features

- 📊 **Dashboard Analytics** - View employee statistics with interactive charts (Recharts)
- 📤 **CSV Bulk Upload** - Upload multiple employees at once via CSV files
- 🔍 **Advanced Search** - Search and filter employees by name, position, or other criteria
- 🎨 **Modern UI** - Beautiful interface built with Radix UI and Tailwind CSS
- ⚡ **Performance Optimized** - LRU caching for faster data retrieval
- 🔐 **Type-Safe** - Full TypeScript support with Prisma Client
- 🎯 **UUID Primary Keys** - Auto-generated unique identifiers for each employee

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Recharts](https://recharts.org/)** - Data visualization library

### Backend
- **[Prisma ORM](https://www.prisma.io/)** - Type-safe database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[@prisma/adapter-pg](https://www.prisma.io/docs/orm/overview/databases/postgresql)** - PostgreSQL adapter for Prisma
- **[PapaParse](https://www.papaparse.com/)** - CSV parsing library
- **[LRU Cache](https://www.npmjs.com/package/lru-cache)** - In-memory caching

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v20 or higher)
- **npm** or **yarn** or **pnpm** or **bun**
- **PostgreSQL** database (local or cloud)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd test-20k
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/employee_db?schema=public"
```

Replace `username`, `password`, and `employee_db` with your PostgreSQL credentials.

### 4. Database Setup

Generate Prisma Client and run migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

```
test-20k/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── upload-employee/      # Employee upload endpoint
│   ├── upload-employee/          # Upload page
│   ├── page.tsx                  # Dashboard/Home page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
├── lib/                          # Utility libraries
│   └── prisma.ts                 # Prisma client instance
├── prisma/                       # Prisma configuration
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Database seeding script
│   └── migrations/               # Database migrations
├── generated/                    # Generated Prisma Client
├── public/                       # Static assets
├── prisma.config.ts              # Prisma configuration
└── package.json                  # Dependencies
```

## 💾 Database Schema

### Employee Model

```prisma
model Employee {
  id        String   @id @default(uuid()) @db.Uuid
  name      String
  age       Int
  position  String
  salary    Int
  createdAt DateTime @default(now())

  @@index([position])
  @@index([name(sort: Asc)])
  @@index([position, name])
}
```

**Key Features:**
- ✅ **Auto-generated UUID** - Each employee gets a unique identifier automatically
- ✅ **Indexed fields** - Optimized queries for position and name
- ✅ **Timestamp tracking** - Automatic creation date recording

## 📤 CSV Upload Format

When uploading employee data via CSV, use the following format:

```csv
name,age,position,salary
John Doe,30,Software Engineer,5000
Jane Smith,28,Product Manager,6000
Bob Johnson,35,Senior Developer,7000
```

**Requirements:**
- First row must be headers: `name,age,position,salary`
- All fields are required
- Age and salary must be valid numbers
- Maximum file size: 10MB

## 🎯 Usage

### Dashboard
- View total employees, average salary, and position distribution
- Interactive charts showing employee statistics
- Quick overview of your workforce

### Upload Employees
1. Navigate to `/upload-employee`
2. Click "Browse Files" or drag & drop a CSV file
3. Click "Upload" to process the file
4. View success message with upload statistics

### API Endpoints

#### POST `/api/upload-employee`
Upload employee data via CSV file.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with `employeeFile` field

**Response:**
```json
{
  "message": "Upload successful",
  "processedRows": 10,
  "totalEmployees": 10,
  "averageSalary": 5500
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to database
npx prisma db seed   # Seed database with sample data
npx prisma studio    # Open Prisma Studio (GUI)

# Linting
npm run lint         # Run ESLint
```

## 🎨 UI Components

This project uses **Radix UI Themes** for consistent, accessible components:
- Cards, Buttons, Flex layouts
- Form inputs and file uploads
- Loading spinners and status indicators
- Color-coded feedback messages

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import project to Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/test-20k)

### Environment Variables

Make sure to set these in your deployment platform:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Set to `production`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Radix UI Documentation](https://www.radix-ui.com/themes/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js and Prisma**

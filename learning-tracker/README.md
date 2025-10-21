# 🎓 Learning Tracker

> **A modern learning management application with AI-powered flashcard generation for remote learning students.**

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**Live Demo:** [Coming Soon - Deploy to Vercel]  
**Documentation:** See `/docs` folder for comprehensive guides

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - User registration and login with NextAuth.js
- 📚 **Course Management** - Create, edit, and organize learning courses
- 📖 **Module Tracking** - Track progress across multiple learning modules
- 🎴 **Smart Flashcards** - Manual and AI-generated flashcards for study
- 🤖 **AI Integration** - Generate flashcards from notes using Google Gemini
- ⏱️ **Study Sessions** - Log and track study time
- 📊 **Progress Analytics** - Visualize learning progress and statistics
- 🎨 **Retro-Inspired UI** - Beautiful, accessible interface with pixel aesthetics

### Technical Highlights
- ✅ Full TypeScript implementation
- ✅ Server-side rendering (SSR) and static generation
- ✅ Optimistic UI updates with React Query
- ✅ Comprehensive input validation with Zod
- ✅ Secure API routes with authentication
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode interface
- ✅ Accessible components (Radix UI)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **State Management:** React Query (TanStack Query)
- **Icons:** Lucide React
- **Fonts:** Terchbit (headings), Consolas (body)

### Backend
- **API:** Next.js Route Handlers
- **Database:** PostgreSQL (hosted on Supabase)
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Validation:** Zod
- **Password Hashing:** bcryptjs

### AI & Integrations
- **AI Provider:** Google Generative AI (Gemini)
- **Use Case:** Automated flashcard generation from study notes

### DevOps & Tools
- **Version Control:** Git
- **Package Manager:** npm
- **Code Quality:** ESLint, Prettier
- **Testing:** Jest, Playwright (planned)
- **Deployment:** Vercel (planned)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher
- PostgreSQL database (or Supabase account)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/learning-tracker.git
   cd learning-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:5432/learning_tracker"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Google Gemini AI
   GEMINI_API_KEY="your-gemini-api-key"
   ```

   Generate `NEXTAUTH_SECRET`:
   ```bash
   # Windows PowerShell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   
   # macOS/Linux
   openssl rand -base64 32
   ```

4. **Set up the database**
   ```bash
   # Push schema to database
   npm run db:push

   # Or run migrations
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
learning-tracker/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Protected dashboard
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── courses/           # Course components
│   │   ├── modules/           # Module components
│   │   └── flashcards/        # Flashcard components
│   ├── lib/                   # Utility functions
│   │   ├── hooks/             # Custom React hooks
│   │   ├── validations/       # Zod schemas
│   │   ├── auth.ts            # NextAuth config
│   │   ├── db.ts              # Prisma client
│   │   └── ai.ts              # AI integration
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
└── docs/                      # Documentation
```

---

## 📚 API Documentation

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Courses

#### Get All Courses
```http
GET /api/courses
Authorization: Required (session cookie)
```

#### Create Course
```http
POST /api/courses
Authorization: Required
Content-Type: application/json

{
  "title": "Advanced TypeScript",
  "description": "Master TypeScript",
  "totalEstimatedHours": 40,
  "color": "#10b981"
}
```

#### Update Course
```http
PUT /api/courses/:id
Authorization: Required
Content-Type: application/json

{
  "title": "Updated Title"
}
```

#### Delete Course
```http
DELETE /api/courses/:id
Authorization: Required
```

### AI Flashcards

#### Generate Flashcards
```http
POST /api/ai/generate-flashcards
Authorization: Required
Content-Type: application/json

{
  "moduleId": "clx123abc",
  "count": 5
}
```

**Full API documentation:** See `API_DOCUMENTATION.md`

---

## 🧪 Testing

### Manual Testing

1. **Authentication Flow**
   ```bash
   # Register new user
   Navigate to http://localhost:3000/register
   Fill form and submit
   
   # Verify auto-login and redirect to dashboard
   ```

2. **Course Management**
   ```bash
   # Create course
   Dashboard → Courses → Create Course
   
   # View courses
   Dashboard → Courses
   
   # Verify in database
   npm run db:studio
   ```

3. **API Testing**
   ```bash
   # While logged in, visit:
   http://localhost:3000/api/courses
   http://localhost:3000/api/modules
   http://localhost:3000/api/flashcards
   ```

### Automated Testing (Coming Soon)

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

**Comprehensive test guide:** See `COMPREHENSIVE_TEST_GUIDE.md`

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure environment variables
   - Deploy

3. **Environment Variables (Vercel)**
   - `DATABASE_URL` (your production database)
   - `NEXTAUTH_SECRET` (same or new secret)
   - `NEXTAUTH_URL` (your vercel domain)
   - `GEMINI_API_KEY` (your API key)

4. **Database Setup**
   ```bash
   # Run migrations on production
   npx prisma migrate deploy
   ```

---

## 📊 Database Schema

```mermaid
erDiagram
    User ||--o{ Course : creates
    Course ||--o{ Module : contains
    Module ||--o{ Flashcard : has
    Module ||--o{ StudySession : tracks
    User ||--o{ StudySession : logs

    User {
        string id PK
        string email
        string password
        string name
        datetime createdAt
    }

    Course {
        string id PK
        string userId FK
        string title
        string description
        float totalEstimatedHours
        string color
    }

    Module {
        string id PK
        string courseId FK
        string title
        enum status
        float estimatedHours
        string notes
        enum priority
        datetime dueDate
    }

    Flashcard {
        string id PK
        string moduleId FK
        string question
        string answer
        enum difficulty
        boolean isAIGenerated
    }

    StudySession {
        string id PK
        string moduleId FK
        string userId FK
        int duration
        datetime createdAt
    }
```

---

## 🎨 Design System

### Colors
- **Primary:** Retro Blue (`#4287f5`)
- **Secondary:** Retro Purple (`#7c3aed`)
- **Accent:** Green (`#10b981`) - Limited to progress bars
- **Background:** Dark (`#0a0a0f`)

### Typography
- **Headings:** Terchbit (pixelated, retro)
- **Body:** Consolas (monospace, clean)

### Components
- Pixelated buttons with 3D shadow effects
- Rounded corners (12px)
- Dark background with gradient overlays
- Accessible Radix UI primitives

**Full design guide:** See `UI_DESIGN_GUIDE.md`

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| `DEVELOPMENT_PLAN.md` | Complete development roadmap |
| `API_DOCUMENTATION.md` | API endpoint reference |
| `UI_DESIGN_GUIDE.md` | Design system specifications |
| `PROJECT_STRUCTURE.md` | File organization details |
| `ENV_SETUP_GUIDE.md` | Environment configuration |
| `COMPREHENSIVE_TEST_GUIDE.md` | Testing procedures |
| `CURRENT_STATUS.md` | Implementation status |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **House of EdTech** - For the assignment specifications
- **Vercel** - For Next.js and hosting
- **Google** - For Gemini AI API
- **Supabase** - For database hosting
- **Radix UI** - For accessible components

---

## 📸 Screenshots

### Landing Page
![Landing Page](docs/screenshots/landing.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Course Management
![Courses](docs/screenshots/courses.png)

### AI Flashcard Generation
![Flashcards](docs/screenshots/flashcards.png)

---

## 🗺️ Roadmap

- [x] Authentication system
- [x] Course CRUD operations
- [x] Module management
- [x] AI flashcard generation
- [ ] Flashcard review mode with spaced repetition
- [ ] Study session timer and tracking
- [ ] Analytics dashboard with charts
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Collaboration features

---

## 📌 Project Status

**Current Version:** 1.0.0  
**Status:** ✅ Beta (Core features complete)  
**Last Updated:** January 2025

**Feature Completion:**
- Backend API: 100%
- Authentication: 100%
- Course Management: 100%
- Module Management: 70%
- Flashcard System: 50%
- Analytics: 30%
- Testing: 0%

---

**Built with ❤️ for remote learning students**

*This project was developed as part of the House of EdTech Fullstack Developer Assignment*

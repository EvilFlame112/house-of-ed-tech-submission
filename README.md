# 🎓 Learning Tracker with AI Flashcard Generation

A full-stack web application for remote learning students to track their study progress and generate AI-powered flashcards.

## 🌟 Features

- 📚 **Course Management** - Create and organize learning courses
- 📖 **Module Tracking** - Track learning modules with status and progress
- 🤖 **AI Flashcards** - Generate flashcards automatically using Google Gemini
- 📊 **Analytics Dashboard** - Monitor study progress and patterns
- 🔐 **Secure Authentication** - JWT-based authentication with NextAuth.js
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 🎨 **Retro UI** - Beautiful retro-inspired interface


## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js v5
- **AI**: Google Gemini API
- **Deployment**: Vercel
- **Testing**: Jest, Playwright

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Google Gemini API key

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/EvilFlame112/learning-tracker-ai.git

# Navigate to project
cd learning-tracker-ai/learning-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Push database schema
npm run db:push

# Run development server
npm run dev
\`\`\`

Visit http://localhost:3000

## 🧪 Testing

\`\`\`bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e
\`\`\`

## 📦 Deployment

This project is deployed on Vercel. Push to `main` branch for automatic deployment.

## 📄 License

MIT License

## 👤 Author

**Your Name**
- GitHub: [@EvilFlame112](https://github.com/EvilFlame112)
- LinkedIn: [A Ramnarayan](https://linkedin.com/in/a-ramn)

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Radix UI for accessible components
- Vercel for hosting
\`\`\`

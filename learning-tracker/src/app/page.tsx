import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-retro-blue via-retro-purple to-retro-pink mb-6 pixelated">
            LEARNING TRACKER
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 font-body mb-8">
            Master your learning journey with AI-powered study tools
          </p>

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-background-secondary border-2 border-retro-blue rounded-xl p-6">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-heading text-retro-blue text-lg mb-2">
                TRACK COURSES
              </h3>
              <p className="text-gray-400 font-body text-sm">
                Organize your learning across multiple courses and modules
              </p>
            </div>

            <div className="bg-background-secondary border-2 border-retro-purple rounded-xl p-6">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-heading text-retro-purple text-lg mb-2">
                AI FLASHCARDS
              </h3>
              <p className="text-gray-400 font-body text-sm">
                Generate flashcards instantly from your study notes using AI
              </p>
            </div>

            <div className="bg-background-secondary border-2 border-accent-green rounded-xl p-6">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-heading text-accent-green text-lg mb-2">
                MONITOR PROGRESS
              </h3>
              <p className="text-gray-400 font-body text-sm">
                Visualize your study time and completion rates
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="px-8 py-4 font-heading text-xl bg-gradient-to-r from-retro-blue to-retro-purple text-white rounded-lg border-4 border-retro-blue shadow-[6px_6px_0px_0px_rgba(66,135,245,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(66,135,245,0.7)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150 pixelated"
            >
              GET STARTED
            </Link>

            <Link
              href="/login"
              className="px-8 py-4 font-heading text-xl bg-transparent text-retro-purple border-4 border-retro-purple rounded-lg hover:bg-retro-purple/10 transition-colors"
            >
              SIGN IN
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-heading text-accent-green mb-1">
                FREE
              </div>
              <div className="text-sm text-gray-400 font-body">
                Forever Plan
              </div>
            </div>
            <div>
              <div className="text-3xl font-heading text-retro-blue mb-1">
                AI
              </div>
              <div className="text-sm text-gray-400 font-body">
                Powered Tools
              </div>
            </div>
            <div>
              <div className="text-3xl font-heading text-retro-purple mb-1">
                24/7
              </div>
              <div className="text-sm text-gray-400 font-body">Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 font-body text-sm">
            Built for remote learning students |{' '}
            <a
              href="https://github.com/yourusername"
              className="text-retro-blue hover:text-retro-cyan transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{' '}
            |{' '}
            <a
              href="https://linkedin.com/in/yourprofile"
              className="text-retro-blue hover:text-retro-cyan transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

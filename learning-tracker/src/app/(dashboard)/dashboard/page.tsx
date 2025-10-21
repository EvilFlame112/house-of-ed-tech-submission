'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-retro-blue to-retro-purple mb-2">
          WELCOME BACK{session?.user?.name ? `, ${session.user.name.toUpperCase()}` : ''}!
        </h1>
        <p className="text-gray-400 font-body">
          Ready to continue your learning journey? 
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-background-secondary border-2 border-retro-blue rounded-xl p-6">
          <div className="text-3xl font-heading text-retro-blue mb-2">0</div>
          <div className="text-sm text-gray-400 font-body">Total Courses</div>
        </div>

        <div className="bg-background-secondary border-2 border-retro-purple rounded-xl p-6">
          <div className="text-3xl font-heading text-retro-purple mb-2">0</div>
          <div className="text-sm text-gray-400 font-body">Active Modules</div>
        </div>

        <div className="bg-background-secondary border-2 border-accent-green rounded-xl p-6">
          <div className="text-3xl font-heading text-accent-green mb-2">0</div>
          <div className="text-sm text-gray-400 font-body">Flashcards</div>
        </div>

        <div className="bg-background-secondary border-2 border-retro-pink rounded-xl p-6">
          <div className="text-3xl font-heading text-retro-pink mb-2">0h</div>
          <div className="text-sm text-gray-400 font-body">Study Time</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-background-secondary to-background-tertiary border-2 border-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-heading text-white mb-6">QUICK ACTIONS</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/dashboard/courses">
            <div className="bg-background-tertiary border-l-4 border-retro-blue rounded-lg p-6 hover:bg-background-secondary transition-colors cursor-pointer">
              <h3 className="font-heading text-lg text-retro-blue mb-2">
                VIEW COURSES
              </h3>
              <p className="text-gray-400 font-body text-sm mb-4">
                View and manage your courses and learning modules
              </p>
              <div className="px-4 py-2 font-heading text-sm bg-retro-blue text-white rounded-lg hover:bg-retro-blue/80 transition-colors inline-block">
                GO TO COURSES
              </div>
            </div>
          </Link>

          <div className="bg-background-tertiary border-l-4 border-retro-purple rounded-lg p-6 opacity-50">
            <h3 className="font-heading text-lg text-retro-purple mb-2">
              GENERATE FLASHCARDS
            </h3>
            <p className="text-gray-400 font-body text-sm mb-4">
              Create a course and module first to use AI flashcards
            </p>
            <div className="px-4 py-2 font-heading text-sm bg-retro-purple/50 text-white rounded-lg inline-block">
              COMING SOON
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="mt-8 bg-background-secondary border-2 border-accent-green rounded-xl p-6">
        <h3 className="font-heading text-lg text-accent-green mb-4">
          🚀 GETTING STARTED
        </h3>
        <ol className="space-y-3 font-body text-gray-300 text-sm">
          <li className="flex items-start">
            <span className="text-accent-green mr-2">1.</span>
            <span>Create your first course to organize your learning</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-green mr-2">2.</span>
            <span>Add modules/topics you want to study</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-green mr-2">3.</span>
            <span>Add notes to modules and generate AI flashcards</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-green mr-2">4.</span>
            <span>Track your progress and study sessions</span>
          </li>
        </ol>
      </div>

      {/* API Test Links */}
      <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <p className="text-xs text-gray-500 font-body mb-2">🔧 Development Mode - API Test Links:</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/api/courses" className="text-xs text-retro-blue hover:underline font-body">
            GET /api/courses
          </Link>
          <Link href="/api/modules" className="text-xs text-retro-blue hover:underline font-body">
            GET /api/modules
          </Link>
          <Link href="/api/flashcards" className="text-xs text-retro-blue hover:underline font-body">
            GET /api/flashcards
          </Link>
        </div>
      </div>
    </div>
  );
}


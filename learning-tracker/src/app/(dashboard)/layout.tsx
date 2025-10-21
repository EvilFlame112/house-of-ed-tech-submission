'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-retro-blue border-t-transparent rounded-lg animate-spin pixelated mx-auto mb-4"></div>
          <p className="text-gray-400 font-body">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background-secondary/95 backdrop-blur-md border-b-2 border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="font-heading text-2xl text-retro-blue">
              LEARNING TRACKER
            </Link>

            <nav className="hidden md:flex items-center gap-6">
                  <Link
                    href="/dashboard"
                    className="font-body text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/courses"
                    className="font-body text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Courses
                  </Link>
                  <Link
                    href="/dashboard/analytics"
                    className="font-body text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Analytics
                  </Link>
                </nav>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-body text-sm">
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-4 py-2 font-heading text-sm bg-transparent text-status-error border-2 border-status-error rounded-lg hover:bg-status-error/10 transition-colors"
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 font-body text-sm">
              Learning Tracker © 2025 | Built for remote learning students
            </p>
            <div className="flex items-center gap-4 text-sm font-body">
              <span className="text-gray-400">Created by: A Ramnarayan</span>
              <a
                href="https://github.com/EvilFlame112"
                target="_blank"
                rel="noopener noreferrer"
                className="text-retro-blue hover:text-retro-cyan transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/a-ramn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-retro-blue hover:text-retro-cyan transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


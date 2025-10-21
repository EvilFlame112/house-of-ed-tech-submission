'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('Sign in result:', result);

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        // Small delay to ensure session is set
        await new Promise(resolve => setTimeout(resolve, 500));
        // Redirect to dashboard on success
        window.location.href = '/dashboard';
      } else {
        setError('Sign in failed. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading text-retro-blue mb-2">
            LEARNING TRACKER
          </h1>
          <p className="text-gray-400 font-body text-sm">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-br from-background-secondary to-background-tertiary border-2 border-retro-blue rounded-2xl p-8 shadow-[0_0_30px_rgba(66,135,245,0.3)]">
          <h2 className="text-2xl font-heading text-white mb-6">SIGN IN</h2>

          {error && (
            <div className="mb-4 p-3 bg-status-error/20 border border-status-error rounded-lg text-status-error text-sm font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-body text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-background-tertiary border-2 border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-retro-blue focus:outline-none focus:ring-2 focus:ring-retro-blue/50 transition-colors font-body"
                placeholder="student@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-body text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-background-tertiary border-2 border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-retro-blue focus:outline-none focus:ring-2 focus:ring-retro-blue/50 transition-colors font-body"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 font-heading text-lg bg-gradient-to-r from-retro-blue to-retro-purple text-white rounded-lg border-4 border-retro-blue shadow-[4px_4px_0px_0px_rgba(66,135,245,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(66,135,245,0.7)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(66,135,245,0.3)] active:translate-x-[2px] active:translate-y-[2px]] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed pixelated"
            >
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm font-body">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-400 font-body text-sm">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-retro-purple hover:text-retro-pink transition-colors font-heading"
            >
              REGISTER HERE
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs font-body mt-8">
          Built for remote learning students
        </p>
      </div>
    </div>
  );
}


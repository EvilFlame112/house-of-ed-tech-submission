'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show detailed validation errors if available
        if (data.details && Array.isArray(data.details)) {
          const errorMsg = data.details.map((d: any) => d.message).join('. ');
          throw new Error(errorMsg);
        }
        throw new Error(data.error || 'Registration failed');
      }

      // Auto sign in after registration
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        // Registration successful but sign in failed
        router.push('/login');
        return;
      }

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading text-retro-purple mb-2">
            LEARNING TRACKER
          </h1>
          <p className="text-gray-400 font-body text-sm">
            Create your account and start learning
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-gradient-to-br from-background-secondary to-background-tertiary border-2 border-retro-purple rounded-2xl p-8 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
          <h2 className="text-2xl font-heading text-white mb-6">REGISTER</h2>

          {error && (
            <div className="mb-4 p-3 bg-status-error/20 border border-status-error rounded-lg text-status-error text-sm font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-body text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background-tertiary border-2 border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-retro-purple focus:outline-none focus:ring-2 focus:ring-retro-purple/50 transition-colors font-body"
                placeholder="John Doe"
              />
            </div>

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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background-tertiary border-2 border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-retro-purple focus:outline-none focus:ring-2 focus:ring-retro-purple/50 transition-colors font-body"
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background-tertiary border-2 border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-retro-purple focus:outline-none focus:ring-2 focus:ring-retro-purple/50 transition-colors font-body"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500 font-body">
                Must be 8+ characters with uppercase, lowercase, and number
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 font-heading text-lg bg-gradient-to-r from-retro-purple to-retro-pink text-white rounded-lg border-4 border-retro-purple shadow-[4px_4px_0px_0px_rgba(124,58,237,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(124,58,237,0.7)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(124,58,237,0.3)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed pixelated"
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm font-body">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-400 font-body text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-retro-blue hover:text-retro-cyan transition-colors font-heading"
            >
              SIGN IN
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs font-body mt-8">
          By registering, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}


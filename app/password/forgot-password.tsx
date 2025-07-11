'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Password reset link sent to your email!');
        setEmail('');
      } else {
        toast.error(data.error || 'Failed to send reset email.');
      }
    } catch (error) {
      toast.error('Something went wrong, try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12 md:py-0 order-1 md:order-2">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Remembered your password?{' '}
            <a
              href="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Login here
            </a>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto order-2 md:order-1">
        <img
          src="/images/banner.png"
          alt="Forgot Password Illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

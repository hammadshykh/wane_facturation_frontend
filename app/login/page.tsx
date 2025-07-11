'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('✅ Login successful');
        router.push('/dashboard');
      } else {
        toast.error(`❌ ${result.error || 'Invalid email or password'}`);
      }
    } catch (error) {
      toast.error('❌ Server error. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 order-1 md:order-2">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            <div className="space-y-2">
              <img
                src="/images/logo_text.png"
                alt="Wane Facturation Logo"
                className="h-22 mx-auto"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg w-full"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12 rounded-lg w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                <label htmlFor="remember" className="flex items-center cursor-pointer select-none">
                  <div className="relative">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-5 rounded-full transition-colors ${
                        rememberMe ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${
                        rememberMe ? 'translate-x-5' : ''
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
              >
                SIGN IN
              </Button>
            </form>

            {/* Signup Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Create a Company Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto order-2 md:order-1">
        <img
          src="/images/banner.png"
          alt="Login Illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

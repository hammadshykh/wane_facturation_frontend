'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [agree, setAgree] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!agree) {
      alert('Please agree to the terms and conditions');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          password: form.password,
          role: 'user',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Registration failed');
      }

      alert('Registration successful! Please log in.');
      window.location.href = '/login';
    } catch (err: any) {
      alert(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row">
      {/* Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 order-1 md:order-2">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <img
                src="/images/logo_text.png"
                alt="Wane Facturation Logo"
                className="h-22 mx-auto"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    placeholder="Create a password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {confirmPasswordVisible ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center space-x-3">
                <label htmlFor="agree" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      id="agree"
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-5 rounded-full transition-colors ${
                        agree ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-transform ${
                        agree ? 'translate-x-5' : ''
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">
                    I agree to the terms and conditions
                  </span>
                </label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
              >
                {loading ? 'Signing Up...' : 'SIGN UP'}
              </Button>
            </form>

            {/* Link to login */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
                Login here
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image Section */}
      <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto order-2 md:order-1">
        <img
          src="/images/banner.png"
          alt="Signup Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

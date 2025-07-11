'use client';

import { useState } from 'react';
import {
  Search,
  Bell,
  Settings,
  Users,
  DollarSign,
  UserX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const chartData = [
    { month: 'Jan', students: 45, label: 'Jan - 55 Students' },
    { month: 'Feb', students: 52, label: 'Feb' },
    { month: 'Mar', students: 78, label: 'Mar - 70 Students' },
    { month: 'Apr', students: 65, label: 'Apr - 60 Students' },
    { month: 'May', students: 45, label: 'May' },
    { month: 'Jun', students: 58, label: 'Jun' },
    { month: 'Jul', students: 72, label: 'Jul' },
    { month: 'Aug', students: 110, label: 'Aug - 110 Students' },
    { month: 'Sep', students: 95, label: 'Sep' },
    { month: 'Oct', students: 88, label: 'Oct' },
    { month: 'Nov', students: 92, label: 'Nov' },
    { month: 'Dec', students: 85, label: 'Dec' }
  ];

  const maxStudents = Math.max(...chartData.map(d => d.students));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6 flex items-center justify-center">
          <img src="/images/_logo.png" alt="Logo" className="h-14 object-contain" />
        </div>
        <nav className="p-4 space-y-3">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#eeffe0]">
            <img src="/images/icon/graph.png" alt="Dashboard" className="h-5 w-5 object-contain" />
            <span className="font-bold">Dashboard</span>
          </div>

          <div className="flex items-center space-x-3 px-4 py-6 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            <img src="/images/icon/book.png" alt="Billing" className="h-5 w-5 object-contain" />
            <span>Billing</span>
          </div>

          <div className="flex items-center space-x-3 px-4 py-6 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            <img src="/images/icon/profile.png" alt="Formations" className="h-5 w-5 object-contain" />
            <span>Formations</span>
          </div>

          <Link href="/dashboard/students" className="block">
            <div className="flex items-center space-x-3 px-4 py-6 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <img src="/images/icon/people.png" alt="Students" className="h-5 w-5 object-contain" />
              <span>Students</span>
            </div>
          </Link>

          <div className="flex items-center space-x-3 px-4 py-6 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            <img src="/images/icon/document-text.png" alt="Enrolment" className="h-5 w-5 object-contain" />
            <span>Enrolment</span>
          </div>

          <div className="flex items-center space-x-3 px-4 py-6 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
            <img src="/images/icon/setting-2.png" alt="Settings" className="h-5 w-5 object-contain" />
            <span>Settings</span>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-72 h-10 text-sm"
                />
              </div>

              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100">
                <Bell className="text-gray-600" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <Settings className="text-gray-600" />
              </Button>

              <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" />
                <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">SA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="pt-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Students */}
            <Card className="bg-white border border-gray-200 shadow-sm relative overflow-hidden">
              {/* Purple corner decoration */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-purple-100 rounded-br-3xl -z-1"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
                <CardTitle className="text-lg font-medium text-gray-700">Total Students</CardTitle>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-black mb-6">3,200</div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '76.5%' }}></div>
                </div>

                <p className="text-sm text-gray-600">All enrolled students</p>
              </CardContent>
            </Card>


            <Card className="bg-white border border-gray-200 shadow-sm relative overflow-hidden">
              {/* Purple corner decoration */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-200 to-green-100 rounded-br-3xl -z-1"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
                <CardTitle className="text-lg font-medium text-gray-700">Total Students</CardTitle>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-black mb-6">3,200</div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '76.5%' }}></div>
                </div>

                <p className="text-sm text-gray-600">All enrolled students</p>
              </CardContent>
            </Card>


                        <Card className="bg-white border border-gray-200 shadow-sm relative overflow-hidden">
              {/* Purple corner decoration */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-red-200 to-red-100 rounded-br-3xl -z-1"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
                <CardTitle className="text-lg font-medium text-gray-700">Total Students</CardTitle>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-black mb-6">3,200</div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '76.5%' }}></div>
                </div>

                <p className="text-sm text-gray-600">All enrolled students</p>
              </CardContent>
            </Card>

          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Number Of Students and Review
                </CardTitle>
                <Button variant="outline" size="sm" className="text-gray-600">This Year</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 relative">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                  {[140, 120, 100, 80, 60, 40, 20, 0].map((val, i) => (
                    <span key={i}>{val}</span>
                  ))}
                </div>

                {/* Grid Lines */}
                <div className="absolute inset-0 ml-8 flex flex-col justify-between">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="border-t border-gray-100"></div>
                  ))}
                </div>

                {/* Chart Line */}
                <svg className="absolute inset-0 w-full h-full ml-8" viewBox="0 0 800 300">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  <path
                    d={`M 0 ${300 - (chartData[0].students / maxStudents) * 250} ${chartData.map((point, index) =>
                      `L ${(index * 800) / (chartData.length - 1)} ${300 - (point.students / maxStudents) * 250}`
                    ).join(' ')} L 800 300 L 0 300 Z`}
                    fill="url(#chartGradient)"
                  />
                  <path
                    d={`M 0 ${300 - (chartData[0].students / maxStudents) * 250} ${chartData.map((point, index) =>
                      `L ${(index * 800) / (chartData.length - 1)} ${300 - (point.students / maxStudents) * 250}`
                    ).join(' ')}`}
                    stroke="#10b981"
                    strokeWidth="3"
                    fill="none"
                  />
                  {chartData.map((point, index) => (
                    <circle
                      key={index}
                      cx={(index * 800) / (chartData.length - 1)}
                      cy={300 - (point.students / maxStudents) * 250}
                      r="4"
                      fill="#10b981"
                      stroke="white"
                      strokeWidth="2"
                    />
                  ))}
                </svg>

                {/* Labels */}
                {chartData.map((point, index) =>
                  point.label.includes(' - ') ? (
                    <div
                      key={index}
                      className="absolute text-xs text-gray-600 bg-white px-2 py-1 rounded shadow-sm border transform -translate-x-1/2 -translate-y-8"
                      style={{
                        left: `${(index * 100) / (chartData.length - 1)}%`,
                        top: `${100 - (point.students / maxStudents) * 80}%`
                      }}
                    >
                      {point.label}
                    </div>
                  ) : null
                )}

                {/* X-Axis */}
                <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 pt-2">
                  {chartData.map((point, i) => (
                    <span key={i}>{point.month}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

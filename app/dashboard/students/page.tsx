'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Settings,
  Key,
  CheckCircle,
  XCircle,
  Filter,
  ChevronDown,
  Plus,
  Download,
  Edit,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Viewer';
  status: 'Active' | 'Inactive';
  avatar?: string;
}

export default function StudentsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Super Admin' | 'Admin' | 'Viewer'>('Super Admin');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace this URL with your real API endpoint
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error(`Error fetching users: ${res.statusText}`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users by search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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

        {/* Page Content */}
        <main className="flex-1 p-8">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">User Management ({selectedRole})</h2>
                <p className="text-gray-600 mt-1">Efficiently Handle User Data, Roles And Permissions</p>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline" className="space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add User</span>
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Filter Button (optional for more filters) */}
                <Button variant="outline" size="sm" className="space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>

              {/* Role Filter */}
              <div className="flex items-center space-x-4">
                {['Super Admin', 'Admin', 'Viewer'].map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={role}
                      name="role"
                      checked={selectedRole === role}
                      onChange={() => setSelectedRole(role as User['role'])}
                      className="text-blue-600"
                    />
                    <label htmlFor={role} className="text-sm text-gray-700">{role}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Loading/Error */}
            {loading && <p>Loading users...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            {/* Users Table */}
            {!loading && !error && (
              <div className="bg-white rounded-lg border border-gray-200 ">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">
                        <div className="flex items-center space-x-1">
                          <span>Name</span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        <div className="flex items-center space-x-1">
                          <span>Email</span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        <div className="flex items-center space-x-1">
                          <span>Role</span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500 py-10">
                          No users found.
                        </TableCell>
                      </TableRow>
                    )}
                    {currentUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-gray-600">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'Super Admin' ? 'default' : user.role === 'Admin' ? 'secondary' : 'outline'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {user.status === 'Active' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-400" />
                            )}
                            <span className={user.status === 'Active' ? 'text-green-600' : 'text-gray-500'}>
                              {user.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              <Key className="h-4 w-4 mr-1" />
                              Reset Password
                            </Button>
                            <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            {user.status === 'Inactive' ? (
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Activate
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Deactivate
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && filteredUsers.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Show</span>
                  <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>Row</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={currentPage === pageNum ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  {totalPages > 5 && (
                    <>
                      <span className="text-gray-400">...</span>
                      <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// app/users/page.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "@/types/user";
import { UserFilters } from "./UserFilters";
import { UserTable } from "./UserTable";
import { UserPagination } from "./usersPagination";
import { fetchUsers } from "@/actions/users";

export default function UserManagement() {
 const [searchTerm, setSearchTerm] = useState("");
 const [roleFilter, setRoleFilter] = useState<User["role"] | "all">("all");
 const [statusFilter, setStatusFilter] = useState<User["role"] | "all">("all");
 const [currentPage, setCurrentPage] = useState(1);
 const [rowsPerPage, setRowsPerPage] = useState(10);

 const {
  data: users = [],
  isLoading,
  isError,
  error,
  refetch,
 } = useQuery<User[]>({
  queryKey: ["users"],
  queryFn: fetchUsers,
 });

 console.log(users, "USER");

 const filteredUsers = users?.filter((user) => {
  const matchesSearch =
   user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   user.email.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesRole = roleFilter === "all" || user.role === roleFilter;
  const matchesStatus = statusFilter === "all" || user.role === statusFilter;
  return matchesSearch && matchesRole && matchesStatus;
 });

 const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
 const startIndex = (currentPage - 1) * rowsPerPage;
 const endIndex = startIndex + rowsPerPage;
 const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

 const handleEditUser = (user: User) => {
  console.log("Edit user:", user);
  // Implement edit logic
 };

 const handleToggleStatus = (user: User) => {
  console.log("Toggle status for user:", user);
  // Implement status toggle logic
 };

 const handleResetPassword = (user: User) => {
  console.log("Reset password for user:", user);
  // Implement password reset logic
 };

 return (
  <div className="min-h-screen bg-gray-50 p-6">
   <div className="max-w-7xl mx-auto">
    <div className="flex items-center justify-between">
     <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
       User Management (Super Admin)
      </h1>
      <p className="text-base text-gray-600 mt-2">
       Efficiently Handle User Data, Roles And Permissions
      </p>
     </div>

     <UserFilters
      searchTerm={searchTerm}
      roleFilter={roleFilter}
      statusFilter={statusFilter}
      onSearchChange={setSearchTerm}
      onRoleFilterChange={setRoleFilter}
      onStatusFilterChange={setStatusFilter}
      onRefresh={refetch}
      loading={isLoading}
     />
    </div>

    <UserTable
     users={paginatedUsers}
     loading={isLoading}
     error={isError ? error.message : null}
     onEdit={handleEditUser}
     onToggleStatus={handleToggleStatus}
     onResetPassword={handleResetPassword}
    />

    {filteredUsers.length > 0 && (
     <UserPagination
      currentPage={currentPage}
      totalPages={totalPages}
      rowsPerPage={rowsPerPage}
      onPageChange={setCurrentPage}
      onRowsPerPageChange={setRowsPerPage}
     />
    )}
   </div>
  </div>
 );
}

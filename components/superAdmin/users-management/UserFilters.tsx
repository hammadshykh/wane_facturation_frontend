// components/users/UserFilters.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole, UserStatus } from "@/types/user";
import CreateUserDialog from "./CreateUserDialog";

export const UserFilters = ({
 searchTerm,
 //  roleFilter,
 //  statusFilter,
 onSearchChange,
}: //  onRoleFilterChange,
//  onStatusFilterChange,
//  onRefresh,
//  loading,
{
 searchTerm: string;
 roleFilter: UserRole | "all";
 statusFilter: UserRole | "all";
 onSearchChange: (term: string) => void;
 onRoleFilterChange: (role: UserRole | "all") => void;
 onStatusFilterChange: (status: UserRole | "all") => void;
 onRefresh: () => void;
 loading: boolean;
}) => {
 return (
  <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
   <div className="relative w-full md:w-[265px]">
    <Search className="absolute left-3 top-1/2 transform rounded-xl border-none -translate-y-1/2 h-4 w-4 text-gray-400" />
    <Input
     placeholder="Search users by name or email..."
     className="pl-10"
     value={searchTerm}
     onChange={(e) => onSearchChange(e.target.value)}
    />
   </div>
   <div className="flex items-center gap-2">
    <Button className="bg-[#93DA96] hover:bg-green-600">Export CSV</Button>

    <CreateUserDialog />
   </div>
  </div>
 );
};

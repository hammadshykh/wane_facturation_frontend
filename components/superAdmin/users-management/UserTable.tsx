// components/users/UserTable.tsx
"use client";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user";
import { CheckCircle, XCircle } from "lucide-react";
import { UserActions } from "./UserActions";
import { UserStatus } from "@/types/user";

export const UserTable = ({
 users,
 loading,
 error,
 onEdit,
 onToggleStatus,
 onResetPassword,
}: {
 users: User[];
 loading: boolean;
 error: string | null;
 onEdit: (user: User) => void;
 onToggleStatus: (user: User) => void;
 onResetPassword: (user: User) => void;
}) => {
 if (loading) return <p className="p-4 text-center">Loading users...</p>;
 if (error)
  return <p className="p-4 text-center text-red-600">Error: {error}</p>;

 return (
  <div className="rounded-2xl">
   <Table>
    <TableHeader>
     <TableRow className="bg-gray-50">
      <TableHead className="font-semibold text-gray-700">Name</TableHead>
      <TableHead className="font-semibold text-gray-700">Email</TableHead>
      <TableHead className="font-semibold text-gray-700">Role</TableHead>
      <TableHead className="font-semibold text-gray-700">Status</TableHead>
      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody className="space-y-4">
     {users.length === 0 ? (
      <TableRow>
       <TableCell colSpan={5} className="text-center text-gray-500 py-10">
        No users found
       </TableCell>
      </TableRow>
     ) : (
      users.map((user) => (
       <UserTableRow
        key={user.id}
        user={user}
        onEdit={onEdit}
        onToggleStatus={onToggleStatus}
        onResetPassword={onResetPassword}
       />
      ))
     )}
    </TableBody>
   </Table>
  </div>
 );
};

const UserTableRow = ({
 user,
 onEdit,
 onToggleStatus,
 onResetPassword,
}: {
 user: User;
 onEdit: (user: User) => void;
 onToggleStatus: (user: User) => void;
 onResetPassword: (user: User) => void;
}) => {
 return (
  <TableRow className="hover:bg-gray-50 bg-white mb-2 border-none rounded-2xl">
   <TableCell className="font-medium">{user.name}</TableCell>
   <TableCell className="text-gray-600">{user.email}</TableCell>
   <TableCell className="capitalize">{user.role}</TableCell>
   <TableCell>
    <StatusBadge status={user.is_active} />
   </TableCell>
   <TableCell>
    <UserActions
     user={user}
     onEdit={onEdit}
     onToggleStatus={onToggleStatus}
     onResetPassword={onResetPassword}
    />
   </TableCell>
  </TableRow>
 );
};

const StatusBadge = ({ status }: { status: boolean }) => {
 const isActive = status === true ? "Active" : "Inactive";

 return (
  <div className="flex items-center gap-2 rounded-2xl">
   {isActive ? (
    <CheckCircle className="h-4 w-4 text-green-500" />
   ) : (
    <XCircle className="h-4 w-4 text-red-500" />
   )}
   <span className="capitalize">{isActive}</span>
  </div>
 );
};

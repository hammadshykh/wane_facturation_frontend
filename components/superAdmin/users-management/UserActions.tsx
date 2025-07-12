// components/users/UserActions.tsx
"use client";
import { Button } from "@/components/ui/button";
import { LockKeyhole, PencilLine, Users } from "lucide-react";
import { User } from "@/types/user";

export const UserActions = ({
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
  <div className="flex w-full space-x-2">
   <Button
    variant="ghost"
    size="sm"
    className="flex flex-col items-center justify-center w-[95px] h-12 text-[10px] text-blue-500 bg-blue-50 hover:text-blue-800 hover:bg-blue-100"
    onClick={() => onResetPassword(user)}
   >
    <LockKeyhole className="h-4 w-4 mb-1" />
    Reset Password
   </Button>

   <Button
    variant="ghost"
    size="sm"
    className="flex flex-col items-center justify-center w-[95px] h-12 text-[10px] text-yellow-500 bg-yellow-50 hover:text-yellow-800 hover:bg-yellow-100"
    onClick={() => onEdit(user)}
   >
    <PencilLine className="h-4 w-4 mb-1" />
    Edit
   </Button>

   <Button
    variant="ghost"
    size="sm"
    className={`flex flex-col items-center justify-center w-[95px] h-12 text-[10px] ${
     user.is_active === false
      ? "text-green-500 bg-green-50 hover:text-green-800 hover:bg-green-100"
      : "text-red-500 bg-red-50 hover:text-red-800 hover:bg-red-100"
    }`}
    onClick={() => onToggleStatus(user)}
   >
    <Users className="h-4 w-4 mb-1" />
    {user.is_active === true ? "Deactivate" : "Activate"}
   </Button>
  </div>
 );
};

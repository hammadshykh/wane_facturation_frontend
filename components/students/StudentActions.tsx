"use client";
import { FileText, Edit, GraduationCap, UserX, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/student";

export const StudentActions = ({
 student,
 onEdit,
 onToggleStatus,
 onViewDetails,
}: {
 student: Student;
 onEdit: (student: Student) => void;
 onToggleStatus: (student: Student) => void;
 onViewDetails: (student: Student) => void;
}) => {
 return (
  <div className="flex items-center space-x-2">
   <Button
    variant="ghost"
    size="sm"
    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
    onClick={() => onViewDetails(student)}
   >
    <FileText className="h-4 w-4 mr-1" />
    Details
   </Button>
   <Button
    variant="ghost"
    size="sm"
    className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
    onClick={() => onEdit(student)}
   >
    <Edit className="h-4 w-4 mr-1" />
    Edit
   </Button>
   {student.status === "Active" ? (
    <Button
     variant="ghost"
     size="sm"
     className="text-red-600 hover:text-red-700 hover:bg-red-50"
     onClick={() => onToggleStatus(student)}
    >
     <UserX className="h-4 w-4 mr-1" />
     Deactivate
    </Button>
   ) : (
    <Button
     variant="ghost"
     size="sm"
     className="text-green-600 hover:text-green-700 hover:bg-green-50"
     onClick={() => onToggleStatus(student)}
    >
     <UserCheck className="h-4 w-4 mr-1" />
     Activate
    </Button>
   )}
  </div>
 );
};

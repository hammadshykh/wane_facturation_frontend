"use client";
import { FileText, Edit, GraduationCap, UserX, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Formation } from "@/types/formation";

export const FormationActions = ({
 formation,
 onEdit,
 onToggleStatus,
 onViewDetails,
}: {
 formation: Formation;
 onEdit: (formation: Formation) => void;
 onToggleStatus: (formation: Formation) => void;
 onViewDetails: (formation: Formation) => void;
}) => {
 return (
  <div className="flex items-center space-x-2">
   <Button
    variant="ghost"
    size="sm"
    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
    onClick={() => onViewDetails(formation)}
   >
    <FileText className="h-4 w-4 mr-1" />
    Details
   </Button>
   <Button
    variant="ghost"
    size="sm"
    className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
    onClick={() => onEdit(formation)}
   >
    <Edit className="h-4 w-4 mr-1" />
    Edit
   </Button>
   {formation.status === "Active" ? (
    <Button
     variant="ghost"
     size="sm"
     className="text-red-600 hover:text-red-700 hover:bg-red-50"
     onClick={() => onToggleStatus(formation)}
    >
     <UserX className="h-4 w-4 mr-1" />
     Deactivate
    </Button>
   ) : (
    <Button
     variant="ghost"
     size="sm"
     className="text-green-600 hover:text-green-700 hover:bg-green-50"
     onClick={() => onToggleStatus(formation)}
    >
     <UserCheck className="h-4 w-4 mr-1" />
     Activate
    </Button>
   )}
  </div>
 );
};

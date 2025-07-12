"use client";
import { CheckCircle, XCircle, GraduationCap } from "lucide-react";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/types/student";
import { StudentActions } from "./StudentActions";

export const StudentTable = ({
 students,
 loading,
 error,
 onEditStudent,
 onToggleStatus,
 onViewDetails,
}: {
 students: Student[];
 loading: boolean;
 error: string | null;
 onEditStudent: (student: Student) => void;
 onToggleStatus: (student: Student) => void;
 onViewDetails: (student: Student) => void;
}) => {
 if (loading) return <p>Loading students...</p>;
 if (error) return <p className="text-red-600">Error: {error}</p>;

 return (
  <div className="bg-white rounded-lg border border-gray-200">
   <Table>
    <TableHeader>
     <TableRow className="bg-gray-50">
      <TableHead className="font-semibold text-gray-700">Name</TableHead>
      <TableHead className="font-semibold text-gray-700">Email</TableHead>
      <TableHead className="font-semibold text-gray-700">Course</TableHead>
      <TableHead className="font-semibold text-gray-700">
       Enrollment Date
      </TableHead>
      <TableHead className="font-semibold text-gray-700">Status</TableHead>
      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {students.length === 0 ? (
      <TableRow>
       <TableCell colSpan={6} className="text-center text-gray-500 py-10">
        No students found matching your criteria.
       </TableCell>
      </TableRow>
     ) : (
      students.map((student) => (
       <StudentTableRow
        key={student.id}
        student={student}
        onEdit={onEditStudent}
        onToggleStatus={onToggleStatus}
        onViewDetails={onViewDetails}
       />
      ))
     )}
    </TableBody>
   </Table>
  </div>
 );
};

const StudentTableRow = ({
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
  <TableRow className="hover:bg-gray-50">
   <TableCell className="font-medium">{student.name}</TableCell>
   <TableCell className="text-gray-600">{student.email}</TableCell>
   <TableCell>
    <Badge variant="outline">{student.course}</Badge>
   </TableCell>
   <TableCell className="text-gray-600">{student.enrollmentDate}</TableCell>
   <TableCell>
    <StatusBadge
     status={student.status}
     enrollmentStatus={student.enrollmentStatus}
    />
   </TableCell>
   <TableCell>
    <StudentActions
     student={student}
     onEdit={onEdit}
     onToggleStatus={onToggleStatus}
     onViewDetails={onViewDetails}
    />
   </TableCell>
  </TableRow>
 );
};

const StatusBadge = ({
 status,
 enrollmentStatus,
}: {
 status: Student["status"];
 enrollmentStatus: Student["enrollmentStatus"];
}) => {
 const statusMap = {
  Active: {
   color: "bg-green-100 text-green-800",
   icon: <CheckCircle className="h-4 w-4" />,
  },
  Inactive: {
   color: "bg-red-100 text-red-800",
   icon: <XCircle className="h-4 w-4" />,
  },
  Pending: { color: "bg-yellow-100 text-yellow-800", icon: null },
  Graduated: {
   color: "bg-purple-100 text-purple-800",
   icon: <GraduationCap className="h-4 w-4" />,
  },
 };

 return (
  <div className="flex items-center space-x-2">
   <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${statusMap[status].color}`}
   >
    <div className="flex items-center space-x-1">
     {statusMap[status].icon}
     <span>{status}</span>
    </div>
   </span>
   {enrollmentStatus !== "Enrolled" && (
    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
     {enrollmentStatus}
    </span>
   )}
  </div>
 );
};

"use client";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudentFilters } from "@/components/students/StudentFilters";
import { StudentTable } from "@/components/students/StudentTable";
import { StudentPagination } from "@/components/students/StudentPagination";
import { Student, StudentStatus } from "@/types/student";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchStudents } from "@/actions/student";

export default function Students() {
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedStatus, setSelectedStatus] = useState<StudentStatus | "All">(
  "All"
 );
 const [currentPage, setCurrentPage] = useState(1);
 const [rowsPerPage, setRowsPerPage] = useState(10);

 // Fetch students with React Query
 const {
  data: students = [],
  isLoading,
  error,
 } = useQuery<Student[], Error>({
  queryKey: ["students"],
  queryFn: fetchStudents,
  staleTime: 1000 * 60 * 5, // 5 minutes
 });

 // Filter students by search term and status
 const filteredStudents = students.filter((student) => {
  const matchesSearch =
   student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   student.email.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesStatus =
   selectedStatus === "All" || student.status === selectedStatus;
  return matchesSearch && matchesStatus;
 });

 const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
 const startIndex = (currentPage - 1) * rowsPerPage;
 const endIndex = startIndex + rowsPerPage;
 const currentStudents = filteredStudents.slice(startIndex, endIndex);

 const handleEditStudent = (student: Student) => {
  console.log("Edit student:", student);
  // Implement edit logic
 };

 const handleToggleStatus = (student: Student) => {
  console.log("Toggle status for student:", student);
  // Implement status toggle logic
 };

 const handleViewDetails = (student: Student) => {
  console.log("View details for student:", student);
  // Implement view details logic
 };

 const handleAddStudent = () => {
  console.log("Add new student");
  // Implement add student logic
 };

 const handleExport = () => {
  console.log("Export students");
  // Implement export logic
 };

 return (
  <div className="min-h-screen bg-gray-50 flex">
   <div className="flex-1 flex flex-col">
    <main className="flex-1 px-4 py-6">
     <div className="space-y-6">
      <div className="flex items-center justify-between">
       <div>
        <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
        <p className="text-gray-600 mt-1">
         Manage all student records and enrollment status
        </p>
       </div>

       <div className="flex items-center space-x-3">
        <Button variant="outline" className="space-x-2" onClick={handleExport}>
         <Download className="h-4 w-4" />
         <span>Export</span>
        </Button>
        <Button
         className="bg-green-600 hover:bg-green-700 space-x-2"
         onClick={handleAddStudent}
        >
         <Plus className="h-4 w-4" />
         <span>Add Student</span>
        </Button>
       </div>
      </div>

      <StudentFilters
       searchTerm={searchTerm}
       selectedStatus={selectedStatus}
       onSearchChange={setSearchTerm}
       onStatusChange={setSelectedStatus}
      />

      <StudentTable
       students={currentStudents}
       loading={isLoading}
       error={error?.message || ""}
       onEditStudent={handleEditStudent}
       onToggleStatus={handleToggleStatus}
       onViewDetails={handleViewDetails}
      />

      {filteredStudents.length > 0 && (
       <StudentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
       />
      )}
     </div>
    </main>
   </div>
  </div>
 );
}

export type StudentStatus = "Active" | "Inactive" | "Pending" | "Graduated";
export type StudentEnrollmentStatus = "Enrolled" | "Waitlisted" | "Dropped";

export interface Student {
 id: number;
 name: string;
 email: string;
 course: string;
 enrollmentDate: string;
 status: StudentStatus;
 enrollmentStatus: StudentEnrollmentStatus;
 avatar?: string;
}

export interface StudentTableProps {
 students: Student[];
 loading: boolean;
 error: string | null;
 currentPage: number;
 rowsPerPage: number;
 onPageChange: (page: number) => void;
 onRowsPerPageChange: (rows: number) => void;
 onEditStudent: (student: Student) => void;
 onToggleStatus: (student: Student) => void;
 onViewDetails: (student: Student) => void;
}

export interface StudentFiltersProps {
 searchTerm: string;
 selectedStatus: StudentStatus | "All";
 onSearchChange: (term: string) => void;
 onStatusChange: (status: StudentStatus | "All") => void;
}

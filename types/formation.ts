// types/formation.ts

export type FormationStatus = "Active" | "Inactive" | "Pending" | "Graduated";
export type FormationEnrollmentStatus = "Enrolled" | "Waitlisted" | "Dropped";

export interface Formation {
  id: number;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  status: FormationStatus;
  enrollmentStatus: FormationEnrollmentStatus;
  avatar?: string;
}

export interface FormationTableProps {
  formation: Formation[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onEditStudent: (formation: Formation) => void;
  onToggleStatus: (formation: Formation) => void;
  onViewDetails: (formation: Formation) => void;
}

export interface FormationFiltersProps {
  searchTerm: string;
  selectedStatus: FormationStatus | "All";
  onSearchChange: (term: string) => void;
  onStatusChange: (status: FormationStatus | "All") => void;
}

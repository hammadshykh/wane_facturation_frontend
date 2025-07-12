"use client";
import {
  CheckCircle,
  XCircle,
  GraduationCap,
  Clock,
  CircleDot
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Formation, FormationTableProps } from "@/types/formation";
import { FormationActions } from "./FormationActions";

export const FormationTable = ({
  formation,
  loading,
  error,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEditStudent,
  onToggleStatus,
  onViewDetails,
}: FormationTableProps) => {
  if (loading) return <p>Loading formations...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Enrollment Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formation.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 py-10">
                No formations found.
              </TableCell>
            </TableRow>
          ) : (
            formation.map((item) => (
              <FormationTableRow
                key={item.id}
                formation={item}
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

const FormationTableRow = ({
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
    <TableRow className="hover:bg-gray-50">
      <TableCell className="flex items-center space-x-3 font-medium">
        {formation.avatar ? (
          <Image
            src={formation.avatar}
            alt={formation.name}
            width={30}
            height={30}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
        )}
        <span>{formation.name}</span>
      </TableCell>
      <TableCell>{formation.email}</TableCell>
      <TableCell>
        <Badge variant="outline">{formation.course}</Badge>
      </TableCell>
      <TableCell>{formation.enrollmentDate}</TableCell>
      <TableCell>
        <StatusBadge
          status={formation.status}
          enrollmentStatus={formation.enrollmentStatus}
        />
      </TableCell>
      <TableCell>
        <FormationActions
          formation={formation}
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
  status: Formation["status"];
  enrollmentStatus: Formation["enrollmentStatus"];
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
    Pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="h-4 w-4" />,
    },
    Graduated: {
      color: "bg-purple-100 text-purple-800",
      icon: <GraduationCap className="h-4 w-4" />,
    },
  };

  return (
    <div className="flex items-center space-x-2">
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusMap[status].color}`}
      >
        {statusMap[status].icon}
        <span>{status}</span>
      </span>
      {enrollmentStatus !== "Enrolled" && (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center gap-1">
          <CircleDot className="h-3 w-3" />
          {enrollmentStatus}
        </span>
      )}
    </div>
  );
};

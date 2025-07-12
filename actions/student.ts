import { Student } from "@/types/student";

export const fetchStudents = async (): Promise<Student[]> => {
 const res = await fetch("http://localhost:5000/api/v1/auth/all");
 if (!res.ok) {
  throw new Error(`Error fetching students: ${res.statusText}`);
 }
 return res.json();
};

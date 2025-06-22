export interface Student {
  upbCode: number;
  firstName: string;
  secondName: string;
  fatherLastName: string;
  motherLastName: string;
  email: string;
  phone: string;
  isAvailable: boolean;
  isConfirmed: boolean;
  department_id: number;
  role_id: number;
  department: string;
  semester: number;
}

export type CreateStudent = Omit<
  Student,
  "department" | "isAvailable" | "isConfirmed"
>;

export interface PaginatedStudents {
  data: Student[];
  total: number;
  page: number;
  lastPage: number;
}

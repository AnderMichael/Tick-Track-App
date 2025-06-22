export interface ScholarshipOfficer {
  upbCode: number;
  firstName: string;
  secondName: string;
  fatherLastName: string;
  motherLastName: string;
  email: string;
  phone: string;
  department: string;
  department_id: number;
  isAvailable: boolean;
  isConfirmed: boolean;
  role_id: number;
  upbRole: string;
}

export type CreateScholarshipOfficer = Omit<ScholarshipOfficer, 'department' | 'isAvailable' | 'isConfirmed'>

export interface PaginatedScholarshipOfficers {
  data: ScholarshipOfficer[];
  total: number;
  page: number;
  lastPage: number;
}
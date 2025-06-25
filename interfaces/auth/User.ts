export interface User {
  upbCode: number;
  email: string;
  fullName: string;
  role: string;
  department: string;
  department_id: number;
  isConfirmed: boolean;
  phone: string;
  student?: Student;
  administrative?: Administrative;
}

interface Administrative {
  upbRole: string;
  utils: {
    studentRoleId: number;
    supervisorRoleId: number;
    scholarshipOfficerRoleId: number;
    departments: { id: number; value: string }[];
    qualifications: { id: number; value: string }[];
  };
}

interface Student {
  semester: number;
  inscriptions: Inscription[];
  accountKey: string;
}

interface Inscription {
  id: number;
  semester_id: number;
  name: string;
  start_date: string;
  end_date: string;
  commitment_id: number;
}

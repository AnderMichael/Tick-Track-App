export interface Supervisor {
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

export type CreateSupervisor = Omit<Supervisor, 'department' | 'isAvailable' | 'isConfirmed'>

export interface PaginatedSupervisors {
  data: Supervisor[]
  total: number
  page: number
  lastPage: number
}

export interface PaginatedWorks {
  data: Work[]
  total: number
  page: number
  lastPage: number
}

export interface Work {
  id: number
  title: string
  description: string
  date_begin: string
  date_end: string
  administrative: {
    upbCode: number;
    upb_role: string;
    name: string;
  }
  semester_id: number
  is_open: boolean
  created_at: string
}

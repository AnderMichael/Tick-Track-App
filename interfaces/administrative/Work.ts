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
  administrative_id: number
  semester_id: number
}

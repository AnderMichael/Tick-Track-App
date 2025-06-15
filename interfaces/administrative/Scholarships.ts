export interface Scholarship {
  id: number;
  name: string;
  description: string;
}

export interface PaginatedScholarships {
  total: number;
  page: number;
  limit: number;
  data: Scholarship[];
}

export type CreateScholarship = Omit<Scholarship, "id">;
export type UpdateScholarship = Partial<CreateScholarship>;

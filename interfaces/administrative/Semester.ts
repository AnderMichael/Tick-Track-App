export interface Semester {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    number: number;
    year: number;
}

export interface PaginatedSemesters {
    total: number;
    page: number;
    limit: number;
    data: Semester[];
}
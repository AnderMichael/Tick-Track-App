export interface Semester {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
}

export interface PaginatedSemesters {
    total: number;
    page: number;
    limit: number;
    data: Semester[];
}
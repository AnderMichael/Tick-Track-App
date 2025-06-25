export interface Transaction {
    id: number;
    date: string;
    hours: number;
    comment_student: string;
    comment_administrative: string;
    administrative_name: string;
    author_name: string;
    student_name: string;
    work_name: string;
}

export interface PaginatedTransactions {
    total: number;
    page: number;
    limit: number;
    data: Transaction[];
}

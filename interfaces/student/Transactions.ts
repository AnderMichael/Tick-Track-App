interface Transaction {
    id: number;
    date: string;
    hours: number;
    comment_student: string;
    comment_administrative: string;
}

export interface PaginatedTransactions {
    total: number;
    page: number;
    limit: number;
    data: Transaction[];
}

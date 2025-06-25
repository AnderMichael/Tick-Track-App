import { useTransactionsQuery } from "@/store/api/app";

interface TransactionsQueryParams {
    page?: number;
    limit?: number;
    work_id?: number;
    administrative_upb_code?: number;
    student_upb_code?: number;
    semester_id: number;
}

export function useTransactions({ page = 1, limit = 10, work_id, semester_id, administrative_upb_code, student_upb_code }: TransactionsQueryParams) {
    const {
        data: transactions,
        isFetching,
        isLoading,
        refetch,
    } = useTransactionsQuery({
        administrative_upb_code,
        student_upb_code,
        semester_id,
        page,
        limit,
        work_id
    });

    return {
        transactions: transactions?.data || [],
        total: transactions?.total || 0,
        isFetching,
        isLoading,
        refetch
    };
}
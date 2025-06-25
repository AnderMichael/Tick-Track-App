import { environmentVariables } from "@/config";
import { Payment, StudentPaymentInfo } from "@/interfaces/payments";
import { PaginatedTransactions, Transaction } from "@/interfaces/student";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const transactionsApi = createApi({
    reducerPath: "transactionsApi",
    baseQuery: baseQueryWithInterceptor(`${API_URL}/transactions`),
    endpoints: (builder) => ({
        transactions: builder.query<
            PaginatedTransactions,
            { student_upb_code?: number; semester_id: number; page?: number; limit?: number, administrative_upb_code?: number, work_id?: number }
        >({
            query: ({ student_upb_code, semester_id, page = 1, limit = 10, administrative_upb_code, work_id }) => ({
                url: "/",
                method: "GET",
                params: {
                    student_upb_code,
                    semester_id,
                    page,
                    limit,
                    administrative_upb_code,
                    work_id
                },
            }),
        }),
        transaction: builder.query<Transaction, { transaction_id: string }>({
            query: ({ transaction_id }) => ({
                url: `/${transaction_id}`,
                method: "GET",
            }),
        }),
        removeTransaction: builder.mutation<void, { transaction_id: string }>({
            query: ({ transaction_id }) => ({
                url: `/${transaction_id}`,
                method: "DELETE",
            }),
        }),
        processAccount: builder.mutation<StudentPaymentInfo, { account_key: string, semesterId: number }>({
            query: ({ account_key, semesterId }) => ({
                url: `/process-account/${semesterId}`,
                method: "POST",
                body: { account_key },
            }),
        }),
        payment: builder.mutation<void, Payment>({
            query: (body) => ({
                url: `/`,
                method: "POST",
                body,
            }),
        }),
        studentComment: builder.mutation<void, { transaction_id: string; comment: string }>({
            query: ({ transaction_id, comment }) => ({
                url: `/${transaction_id}/comment`,
                method: "PATCH",
                body: { comment },
            }),
        }),
    }),
})

export const { useTransactionsQuery, useTransactionQuery, usePaymentMutation, useProcessAccountMutation, useStudentCommentMutation, useRemoveTransactionMutation } = transactionsApi;
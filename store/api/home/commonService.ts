import { environmentVariables } from "@/config";
import { PaginatedSemesters, PaginatedWorks, Work } from "@/interfaces/administrative";
import { PaginatedTransactions, Transaction } from "@/interfaces/student";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const commonApi = createApi({
    reducerPath: "commonApi",
    baseQuery: baseQueryWithInterceptor(`${API_URL}`),
    endpoints: (builder) => ({
        transactions: builder.query<
            PaginatedTransactions,
            { upbCode: number; semester_id: number; page?: number; limit?: number }
        >({
            query: ({ upbCode, semester_id, page = 1, limit = 10 }) => ({
                url: `/transactions`,
                method: "GET",
                params: {
                    student_upb_code: upbCode,
                    semester_id,
                    page,
                    limit,
                },
            }),
        }),
        transaction: builder.query<Transaction, { transaction_id: string }>({
            query: ({ transaction_id }) => ({
                url: `/transactions/${transaction_id}`,
                method: "GET",
            }),
        }),
        semesterPerYear: builder.query<PaginatedSemesters, { year: number }>({
            query: (params) => ({ url: "/semesters", method: "GET", params: { year: params.year } }),
        }),
        works: builder.query<PaginatedWorks, { semester_id: number; page?: number; limit?: number, administrative_upb_code: number }>({
            query: ({ semester_id, page = 1, limit = 10, administrative_upb_code }) => ({
                url: `/works`,
                method: "GET",
                params: {
                    semester_id,
                    page,
                    limit,
                    administrative_upb_code,
                },
            }),
        }),
        work: builder.query<Work, { id: string }>({
            query: ({ id }) => ({
                url: `/works/${id}`,
                method: "GET",
            }),
        }),
    })
})

export const { useTransactionsQuery, useTransactionQuery, useSemesterPerYearQuery, useWorksQuery, useWorkQuery } = commonApi;
import { environmentVariables } from "@/config";
import { PaginatedTransactions } from "@/interfaces/student";
import { getToken } from "@/utils/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { API_URL } = environmentVariables;

export const commonApi = createApi({
    reducerPath: "commonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}`,
        credentials: "include",
        prepareHeaders: async (headers) => {
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
    })
})

export const { useTransactionsQuery } = commonApi;
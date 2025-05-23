import { environmentVariables } from "@/config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";
import { PaginatedSemesters } from "@/interfaces/administrative";

const { API_URL } = environmentVariables;

export const semestersApi = createApi({
    reducerPath: "semestersApi",
    baseQuery: baseQueryWithInterceptor(`${API_URL}/semesters`),
    endpoints: (builder) => ({
        semesterPerYear: builder.query<PaginatedSemesters, { year: number }>({
            query: (params) => ({ url: "/", method: "GET", params: { year: params.year } }),
        }),
    })
})

export const { useSemesterPerYearQuery } = semestersApi;
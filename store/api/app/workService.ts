import { environmentVariables } from "@/config";
import { PaginatedWorks, Work } from "@/interfaces/administrative";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

type CreateWork = Omit<Work, "administrative" | "id">;

export const worksApi = createApi({
    reducerPath: "worksApi",
    baseQuery: baseQueryWithInterceptor(`${API_URL}/works`),
    endpoints: (builder) => ({
        works: builder.query<PaginatedWorks, { semester_id: number; page?: number; limit?: number, administrative_upb_code?: number, work_id?: number }>({
            query: ({ semester_id, page = 1, limit = 10, administrative_upb_code }) => ({
                url: "/",
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
                url: `/${id}`,
                method: "GET",
            }),
        }),
        createWork: builder.mutation<{ message: string }, CreateWork>({
            query: (body) => ({
                url: "/",
                method: "POST",
                body,
            }),
        }),
        editWork: builder.mutation<{ message: string }, { id: string; body: Partial<CreateWork> }>({
            query: ({ id, body }) => ({
                url: `/${id}`,
                method: "PATCH",
                body,
            }),
        }),
        deleteWork: builder.mutation<{ message: string }, { id: string }>({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const { useWorksQuery, useWorkQuery, useCreateWorkMutation, useEditWorkMutation } = worksApi;
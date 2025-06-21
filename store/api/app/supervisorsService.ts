import { environmentVariables } from "@/config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";
import {Supervisor, PaginatedSupervisors, CreateSupervisor } from "@/interfaces/administrative";

const { API_URL } = environmentVariables;

export const supervisorsApi = createApi({
  reducerPath: "supervisorsApi",
  baseQuery: baseQueryWithInterceptor(`${API_URL}/administratives/supervisors`),
  tagTypes: ["Supervisor", "Supervisors"],
  endpoints: (builder) => ({
    supervisors: builder.query<
      PaginatedSupervisors,
      { page?: number; limit?: number; department_id?: number }
    >({
      query: ({ page = 1, limit = 10, department_id }) => ({
        url: "/",
        method: "GET",
        params: {
          page,
          limit,
          department_id,
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((s) => ({
                type: "Supervisor" as const,
                id: s.upbCode,
              })),
              { type: "Supervisors", id: "LIST" },
            ]
          : [{ type: "Supervisors", id: "LIST" }],
    }),

    supervisor: builder.query<Supervisor, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Supervisor", id }],
    }),

    createSupervisor: builder.mutation<
      { message: string },
      CreateSupervisor
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Supervisors", id: "LIST" }],
    }),

    editSupervisor: builder.mutation<
      { message: string },
      { id: number; body: Partial<CreateSupervisor> }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Supervisor", id },
        { type: "Supervisors", id: "LIST" },
      ],
    }),

    deleteSupervisor: builder.mutation<{ message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Supervisor", id },
        { type: "Supervisors", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useSupervisorsQuery,
  useSupervisorQuery,
  useCreateSupervisorMutation,
  useEditSupervisorMutation,
  useDeleteSupervisorMutation,
} = supervisorsApi;

import { environmentVariables } from "@/config";
import {
  CreateScholarshipOfficer,
  PaginatedScholarshipOfficers,
  ScholarshipOfficer,
} from "@/interfaces/administrative";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const scholarshipOfficersApi = createApi({
  reducerPath: "scholarshipOfficersApi",
  baseQuery: baseQueryWithInterceptor(
    `${API_URL}/administratives/scholarship-officers`
  ),
  tagTypes: ["ScholarshipOfficer", "ScholarshipOfficers"],
  endpoints: (builder) => ({
    scholarshipOfficers: builder.query<
      PaginatedScholarshipOfficers,
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
              ...result.data.map((officer) => ({
                type: "ScholarshipOfficer" as const,
                id: officer.upbCode,
              })),
              { type: "ScholarshipOfficers", id: "LIST" },
            ]
          : [{ type: "ScholarshipOfficers", id: "LIST" }],
    }),

    scholarshipOfficer: builder.query<ScholarshipOfficer, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: "ScholarshipOfficer", id },
      ],
    }),

    createScholarshipOfficer: builder.mutation<
      { message: string },
      CreateScholarshipOfficer
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ScholarshipOfficers", id: "LIST" }],
    }),

    editScholarshipOfficer: builder.mutation<
      { message: string },
      { id: number; body: Partial<CreateScholarshipOfficer> }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ScholarshipOfficer", id },
        { type: "ScholarshipOfficers", id: "LIST" },
      ],
    }),

    deleteScholarshipOfficer: builder.mutation<
      { message: string },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ScholarshipOfficer", id },
        { type: "ScholarshipOfficers", id: "LIST" },
      ],
    }),

    lockScholarshipOfficer: builder.mutation<
      { message: string },
      { upbCode: number }
    >({
      query: ({ upbCode }) => ({
        url: `/${upbCode}/lock`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { upbCode }) => [
        { type: "ScholarshipOfficer", id: upbCode },
        { type: "ScholarshipOfficers", id: "LIST" },
      ],
    }),

    unlockScholarshipOfficer: builder.mutation<
      { message: string },
      { upbCode: number }
    >({
      query: ({ upbCode }) => ({
        url: `/${upbCode}/unlock`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { upbCode }) => [
        { type: "ScholarshipOfficer", id: upbCode },
        { type: "ScholarshipOfficers", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useScholarshipOfficersQuery,
  useScholarshipOfficerQuery,
  useCreateScholarshipOfficerMutation,
  useEditScholarshipOfficerMutation,
  useDeleteScholarshipOfficerMutation,
  useLockScholarshipOfficerMutation,
  useUnlockScholarshipOfficerMutation,
} = scholarshipOfficersApi;

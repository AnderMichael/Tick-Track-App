import { environmentVariables } from "@/config";
import {
  CreatePercentage,
  CreateScholarship,
  PaginatedScholarships,
  Percentage,
  Scholarship,
} from "@/interfaces/administrative";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const scholarshipsApi = createApi({
  reducerPath: "scholarshipsApi",
  baseQuery: baseQueryWithInterceptor(`${API_URL}/scholarships`),
  tagTypes: ["Scholarship", "Scholarships", "percentage", "percentages"],
  endpoints: (builder) => ({
    // ──────────────────────────────────────
    scholarships: builder.query<
      PaginatedScholarships,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search }) => ({
        url: "/",
        method: "GET",
        params: {
          page,
          limit,
          search,
        },
      }),
      providesTags: ["Scholarships"],
    }),

    scholarship: builder.query<Scholarship, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Scholarship", id }],
    }),

    createScholarship: builder.mutation<{ message: string }, CreateScholarship>(
      {
        query: (body) => ({
          url: "/",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Scholarships"],
      }
    ),

    editScholarship: builder.mutation<
      { message: string },
      { id: number; body: Partial<CreateScholarship> }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Scholarship", id },
        "Scholarships",
      ],
    }),

    deleteScholarship: builder.mutation<{ message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Scholarship", id },
        "Scholarships",
      ],
    }),

    getPercentages: builder.query<Percentage[], { id: number }>({
      query: ({ id }) => ({
        url: `/${id}/service-details`,
        method: "GET",
      }),
      providesTags: (_result, _error, { id }) => [{ type: "percentages", id }],
    }),

    getPercentageById: builder.query<
      Percentage,
      { id: number; detailId: number }
    >({
      query: ({ id, detailId }) => ({
        url: `/${id}/service-details/${detailId}`,
        method: "GET",
      }),
      providesTags: (result, error, { detailId }) => [
        { type: "percentage", id: detailId },
      ],
    }),

    createPercentage: builder.mutation<
      { message: string },
      { id: number; body: CreatePercentage }
    >({
      query: ({ id, body }) => ({
        url: `/${id}/service-details`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "percentages", id }],
    }),

    updatePercentage: builder.mutation<
      { message: string },
      { id: number; detailId: number; body: Partial<CreatePercentage> }
    >({
      query: ({ id, detailId, body }) => ({
        url: `/${id}/service-details/${detailId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { detailId, id }) => [
        { type: "percentage", id: detailId },
        { type: "percentages", id },
      ],
    }),

    deletePercentage: builder.mutation<
      { message: string },
      { id: number; detailId: number }
    >({
      query: ({ id, detailId }) => ({
        url: `/${id}/service-details/${detailId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { detailId, id }) => [
        { type: "percentage", id: detailId },
        { type: "percentages", id },
      ],
    }),
  }),
});

export const {
  useScholarshipsQuery,
  useScholarshipQuery,
  useCreateScholarshipMutation,
  useEditScholarshipMutation,
  useDeleteScholarshipMutation,

  useGetPercentagesQuery,
  useGetPercentageByIdQuery,
  useCreatePercentageMutation,
  useUpdatePercentageMutation,
  useDeletePercentageMutation,
} = scholarshipsApi;

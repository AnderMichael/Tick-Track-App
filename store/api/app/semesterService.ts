import { environmentVariables } from "@/config";
import { PaginatedSemesters, Semester } from "@/interfaces/administrative";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const semestersApi = createApi({
  reducerPath: "semestersApi",
  baseQuery: baseQueryWithInterceptor(`${API_URL}/semesters`),
  tagTypes: ["Semester", "Semesters"],
  endpoints: (builder) => ({
    semesterPerYear: builder.query<PaginatedSemesters, { year: number }>({
      query: (params) => ({
        url: "/",
        method: "GET",
        params: { year: params.year },
      }),
      providesTags: ["Semesters"],
    }),
    semester: builder.query<Semester, { id: number }>({
      query: (params) => ({
        url: `/${params.id}`,
        method: "GET",
      }),
      providesTags: ["Semester"],
    }),
    createSemester: builder.mutation<void, Omit<Semester, "id" | "name">>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Semesters"],
    }),
    editSemester: builder.mutation<
      void,
      { id: number; body: Partial<Semester> }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Semester", "Semesters"],
    }),
    deleteSemester: builder.mutation<void, { id: number }>({
      query: (params) => ({
        url: `/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Semesters"],
    }),
  }),
});

export const {
  useSemesterPerYearQuery,
  useSemesterQuery,
  useCreateSemesterMutation,
  useDeleteSemesterMutation,
  useEditSemesterMutation,
} = semestersApi;

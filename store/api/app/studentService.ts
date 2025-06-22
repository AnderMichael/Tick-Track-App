import { environmentVariables } from "@/config";
import {
  CreateStudent,
  PaginatedStudents,
  Student,
} from "@/interfaces/administrative";
import { CommitmentInfo, TracksInfo } from "@/interfaces/student";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const studentApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: baseQueryWithInterceptor(`${API_URL}`),
  tagTypes: ["Student", "Students"],
  endpoints: (builder) => ({
    // --- ADMINISTRATIVE ROUTES ---
    students: builder.query<
      PaginatedStudents,
      { page?: number; limit?: number; department_id?: number }
    >({
      query: ({ page = 1, limit = 10, department_id }) => ({
        url: "/students",
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
                type: "Student" as const,
                id: s.upbCode,
              })),
              { type: "Students", id: "LIST" },
            ]
          : [{ type: "Students", id: "LIST" }],
    }),

    student: builder.query<Student, { id: number }>({
      query: ({ id }) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Student", id }],
    }),

    createStudent: builder.mutation<{ message: string }, CreateStudent>({
      query: (body) => ({
        url: "/students",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Students", id: "LIST" }],
    }),

    editStudent: builder.mutation<
      { message: string },
      { id: number; body: Partial<CreateStudent> }
    >({
      query: ({ id, body }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Student", id },
        { type: "Students", id: "LIST" },
      ],
    }),

    deleteStudent: builder.mutation<{ message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Student", id },
        { type: "Students", id: "LIST" },
      ],
    }),

    lockStudent: builder.mutation<{ message: string }, { upbCode: number }>({
      query: ({ upbCode }) => ({
        url: `/students/${upbCode}/lock`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { upbCode }) => [
        { type: "Student", id: upbCode },
        { type: "Students", id: "LIST" },
      ],
    }),

    unlockStudent: builder.mutation<{ message: string }, { upbCode: number }>({
      query: ({ upbCode }) => ({
        url: `/students/${upbCode}/unlock`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { upbCode }) => [
        { type: "Student", id: upbCode },
        { type: "Students", id: "LIST" },
      ],
    }),

    // --- STUDENT ROUTES ---
    tracksInfo: builder.query<TracksInfo, { upbCode: number; semester_id: number }>({
      query: ({ upbCode, semester_id }) => ({
        url: `/students/${upbCode}/tracks/${semester_id}`,
        method: "GET",
      }),
    }),

    commitmentInfo: builder.query<CommitmentInfo, { commitment_id: number }>({
      query: ({ commitment_id }) => ({
        url: `/students/commitments/${commitment_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  // administrative
  useStudentsQuery,
  useStudentQuery,
  useCreateStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
  useLockStudentMutation,
  useUnlockStudentMutation,
  // student
  useTracksInfoQuery,
  useCommitmentInfoQuery,
} = studentApi;

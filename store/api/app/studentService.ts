import { environmentVariables } from "@/config";
import {
  CreateStudent,
  Inscription,
  PaginatedStudents,
  Student,
} from "@/interfaces/administrative";
import { Commitment, CommitmentInfo, TracksInfo } from "@/interfaces/student";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const studentApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: baseQueryWithInterceptor(`${API_URL}`),
  tagTypes: [
    "Student",
    "Students",
    "Commitments",
    "Inscriptions",
    "Inscription",
  ],
  endpoints: (builder) => ({
    // --- ADMINISTRATIVE ROUTES ---
    students: builder.query<
      PaginatedStudents,
      { page?: number; limit?: number; department_id?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, department_id, search }) => ({
        url: "/students",
        method: "GET",
        params: {
          page,
          limit,
          department_id,
          search,
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
    tracksInfo: builder.query<
      TracksInfo,
      { upbCode: number; semester_id: number }
    >({
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
    commitmentsByStudent: builder.query<Commitment[], { upbCode: number }>({
      query: ({ upbCode }) => ({
        url: `/students/${upbCode}/commitments`,
        method: "GET",
      }),
      providesTags: (result, error, { upbCode }) =>
        result && result.length > 0
          ? [
              ...result.map((c) => ({
                type: "Commitments" as const,
                id: c.id,
              })),
              { type: "Commitments", id: `STUDENT_${upbCode}` },
            ]
          : [{ type: "Commitments", id: `STUDENT_${upbCode}` }],
    }),

    createNewCommitment: builder.mutation<
      { message: string },
      { upbCode: number; body: { percentage_id: number } }
    >({
      query: ({ upbCode, body }) => ({
        url: `/scholarships/${upbCode}/commitment`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { upbCode }) => [
        { type: "Commitments", id: `STUDENT_${upbCode}` },
      ],
    }),
    inscriptionsByStudent: builder.query<
      Inscription[],
      { upbCode: number; year: number }
    >({
      query: ({ upbCode, year }) => ({
        url: `/students/${upbCode}/inscriptions`,
        method: "GET",
        params: { year },
      }),
      providesTags: (result, error, { upbCode }) =>
        result && result.length > 0
          ? [
              ...result.map((i) => ({
                type: "Inscriptions" as const,
                id: i.id,
              })),
              { type: "Inscriptions", id: `STUDENT_${upbCode}` },
            ]
          : [{ type: "Inscriptions", id: `STUDENT_${upbCode}` }],
    }),
    createInscription: builder.mutation<
      { message: string },
      { upbCode: number; semester_id: number; commitment_id: number }
    >({
      query: ({ upbCode, semester_id, commitment_id }) => ({
        url: `/students/${upbCode}/inscribe/${semester_id}`,
        method: "POST",
        body: {
          commitment_id,
        },
      }),
      invalidatesTags: (result, error, { upbCode }) => [
        { type: "Inscriptions", id: `STUDENT_${upbCode}` },
      ],
    }),
    editInscription: builder.mutation<
      { message: string },
      { upbCode: number; inscriptionId: number; commitment_id: number }
    >({
      query: ({ upbCode, inscriptionId, commitment_id }) => ({
        url: `/students/${upbCode}/inscriptions/${inscriptionId}`,
        method: "PATCH",
        body: {
          commitment_id,
        },
      }),
      invalidatesTags: (result, error, { upbCode, inscriptionId }) => [
        { type: "Inscriptions", id: inscriptionId },
        { type: "Inscriptions", id: `STUDENT_${upbCode}` },
      ],
    }),
    findInscriptionById: builder.query<
      Inscription,
      { upbCode: number; id: number }
    >({
      query: ({ upbCode, id }) => ({
        url: `/students/${upbCode}/inscriptions/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { upbCode, id }) => [
        { type: "Inscription", id },
        { type: "Inscriptions", id: `STUDENT_${upbCode}` },
      ],
    }),
    uninscribeFromSemester: builder.mutation<
      { message: string },
      { upbCode: number; semester_id: number, commitment_id: number }
    >({
      query: ({ upbCode, semester_id, commitment_id }) => ({
        url: `/students/${upbCode}/uninscribe/${semester_id}`,
        method: "PATCH",
        body: {
          commitment_id,
        },
      }),
      invalidatesTags: (result, error, { upbCode }) => [
        { type: "Inscriptions", id: `STUDENT_${upbCode}` },
      ],
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
  useLazyTracksInfoQuery,
  useCommitmentInfoQuery,
  useCommitmentsByStudentQuery,
  useCreateNewCommitmentMutation,
  useInscriptionsByStudentQuery,
  useCreateInscriptionMutation,
  useEditInscriptionMutation,
  useFindInscriptionByIdQuery,
  useUninscribeFromSemesterMutation,
} = studentApi;

import { environmentVariables } from "@/config";
import { PaginatedWorks, Work } from "@/interfaces/administrative";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export type CreateWork = Omit<Work, "administrative" | "id">;

export const worksApi = createApi({
  reducerPath: "worksApi",
  baseQuery: baseQueryWithInterceptor(`${API_URL}/works`),
  tagTypes: ["Work", "Works", "WorkTracksInfo"],
  endpoints: (builder) => ({
    works: builder.query<
      PaginatedWorks,
      {
        semester_id: number;
        page?: number;
        limit?: number;
        administrative_upb_code?: number;
        work_id?: number;
        department_id?: number;
      }
    >({
      query: ({
        semester_id,
        page = 1,
        limit = 10,
        administrative_upb_code,
        department_id
      }) => ({
        url: "/",
        method: "GET",
        params: {
          semester_id,
          page,
          limit,
          administrative_upb_code,
          department_id
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((work) => ({
                type: "Work" as const,
                id: work.id,
              })),
              { type: "Works", id: "LIST" },
            ]
          : [{ type: "Works", id: "LIST" }],
    }),
    work: builder.query<Work, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Work", id }],
    }),
    createWork: builder.mutation<{ message: string }, CreateWork>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Works", id: "LIST" }, { type: "WorkTracksInfo", id: "TRACKS" }],
    }),
    editWork: builder.mutation<
      { message: string },
      { id: number; body: Partial<CreateWork> }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Work", id },
        { type: "Works", id: "LIST" },
        { type: "WorkTracksInfo", id: "TRACKS" }
      ],
    }),
    deleteWork: builder.mutation<{ message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Work", id },
        { type: "Works", id: "LIST" },
        { type: "WorkTracksInfo", id: "TRACKS" }
      ],
    }),
    lockWork: builder.mutation<{ message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}/lock`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Work", id },
        { type: "Works", id: "LIST" },
        { type: "WorkTracksInfo", id: "TRACKS" }
      ],
    }),
    unlockWork: builder.mutation<{ message: string }, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}/unlock`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Work", id },
        { type: "Works", id: "LIST" },
        { type: "WorkTracksInfo", id: "TRACKS" }
      ],
    }),
  }),
});

export const {
  useWorksQuery,
  useWorkQuery,
  useCreateWorkMutation,
  useEditWorkMutation,
  useDeleteWorkMutation,
  useLockWorkMutation,
  useUnlockWorkMutation,
} = worksApi;

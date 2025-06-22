import { environmentVariables } from "@/config";
import { WorkTracksInfo } from "@/interfaces/student";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const administrativeApi = createApi({
  reducerPath: "administrativeApi",
  baseQuery: baseQueryWithInterceptor(`${API_URL}/administratives`),
  tagTypes: ["WorkTracksInfo"],
  endpoints: (builder) => ({
    workTracksInfo: builder.query<
      WorkTracksInfo,
      { upbCode?: number; semester_id: number; department_id?: number }
    >({
      query: (params) => ({
        url: `/tracks/${params.semester_id}`,
        method: "GET",
        params: {
          upbCode: params.upbCode,
          department_id: params.department_id,
        },
      }),
      providesTags: (result) =>
        result ? [{ type: "WorkTracksInfo", id: 'TRACKS' }] : [],
    }),
  }),
});

export const { useWorkTracksInfoQuery } = administrativeApi;

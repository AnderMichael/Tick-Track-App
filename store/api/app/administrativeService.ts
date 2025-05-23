import { environmentVariables } from "@/config";
import { PaginatedSemesters } from "@/interfaces/administrative";
import { WorkTracksInfo } from "@/interfaces/student";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const administrativeApi = createApi({
    reducerPath: "administrativeApi",
    baseQuery: baseQueryWithInterceptor(`${API_URL}/administratives`),
    endpoints: (builder) => ({
        workTracksInfo: builder.query<WorkTracksInfo, { upbCode: number, semester_id: number }>({
            query: (params) => ({ url: `/${params.upbCode}/tracks/${params.semester_id}`, method: "GET" }),
        }),
    })
})

export const { useWorkTracksInfoQuery } = administrativeApi;
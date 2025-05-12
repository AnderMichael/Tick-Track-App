import { environmentVariables } from "@/config";
import { CommitmentInfo, TracksInfo } from "@/interfaces/student";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../baseQueryWithInterceptor";

const { API_URL } = environmentVariables;

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: baseQueryWithInterceptor(`${API_URL}/students`),
    endpoints: (builder) => ({
        tracksInfo: builder.query<TracksInfo, { upbCode: number, semester_id: number }>({
            query: (params) => ({ url: `/${params.upbCode}/tracks/${params.semester_id}`, method: "GET" }),
        }),
        commitmentInfo: builder.query<CommitmentInfo, { commitment_id: number }>({
            query: (params) => ({ url: `/commitments/${params.commitment_id}`, method: "GET" }),
        }),
    })
})

export const { useTracksInfoQuery, useCommitmentInfoQuery } = studentApi;
import { environmentVariables } from "@/config";
import { CommitmentInfo, PaginatedTransactions, TracksInfo } from "@/interfaces/student";
import { getToken } from "@/utils/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { API_URL } = environmentVariables;

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/students`,
        credentials: "include",
        prepareHeaders: async (headers) => {
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
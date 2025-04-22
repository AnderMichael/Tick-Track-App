import { environmentVariables } from "@/config";
import { ConfirmationPasswordForm } from "@/interfaces/auth";
import { LoginForm } from "@/interfaces/auth/LoginForm";
import { User } from "@/store/slices/sessionSlice";
import { getToken } from "@/utils/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { API_URL } = environmentVariables;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/auth`,
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
        login: builder.mutation<{ token: string }, LoginForm>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),

        getMe: builder.query<{ user: User }, void>({
            query: () => "/me",
        }),

        confirmPassword: builder.mutation<void, ConfirmationPasswordForm>({
            query: (data) => ({
                url: "/confirmation",
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useGetMeQuery,
    useConfirmPasswordMutation,
} = authApi;

export const authReducer = authApi.reducer;
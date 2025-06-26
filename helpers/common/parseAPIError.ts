import { APIError } from "@/interfaces/common";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function parseAPIError(
    error: FetchBaseQueryError | SerializedError | undefined | null | any,
    fallback: string = "Ocurrió un error inesperado"
): string {
    if (!error) return fallback;

    if ("data" in error && typeof error.data === "object") {
        const data = error.data as APIError;
        if (data.message) return data.message;
    }

    if ("error" in error && typeof error.error === "string") {
        return error.error;
    }

    return fallback;
}

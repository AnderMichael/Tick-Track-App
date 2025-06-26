import { getToken } from "@/utils/auth";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ToastAndroid } from "react-native";
import { logout } from "../slices/sessionSlice";

export const baseQueryWithInterceptor =
  (baseUrl: string) => async (args: any, api: any, extraOptions: any) => {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl,
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
    });

    const result = await rawBaseQuery(args, api, extraOptions);

    if (
      result.error &&
      (result.error.status === 401 || result.error.status === 403)
    ) {
      if (result.error.status === 401) {
        ToastAndroid.show("Sesión expirada", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Acción no autorizada, cierre de seguridad", ToastAndroid.SHORT);
      }
      api.dispatch(logout());
    }

    return result;
  };

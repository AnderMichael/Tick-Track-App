import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { commonApi, administrativeApi, studentApi } from "./api/home";
import sessionReducer from "./slices/sessionSlice";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        [authApi.reducerPath]: authApi.reducer,
        [administrativeApi.reducerPath]: administrativeApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(administrativeApi.middleware)
            .concat(commonApi.middleware)
            .concat(studentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

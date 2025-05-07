import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { commonApi, studentApi } from "./api/home";
import sessionReducer from "./slices/sessionSlice";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        [authApi.reducerPath]: authApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(studentApi.middleware)
            .concat(commonApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

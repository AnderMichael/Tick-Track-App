import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth";
import { studentApi } from "./api/home";
import sessionReducer from "./slices/sessionSlice";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        [authApi.reducerPath]: authApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(studentApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

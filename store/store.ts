import { configureStore } from "@reduxjs/toolkit";
import {
  administrativeApi,
  scholarshipsApi,
  semestersApi,
  studentApi,
  supervisorsApi,
  transactionsApi,
  worksApi,
} from "./api/app";
import { authApi } from "./api/auth";
import sessionReducer from "./slices/sessionSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [authApi.reducerPath]: authApi.reducer,
    [administrativeApi.reducerPath]: administrativeApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [semestersApi.reducerPath]: semestersApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [worksApi.reducerPath]: worksApi.reducer,
    [scholarshipsApi.reducerPath]: scholarshipsApi.reducer,
    [supervisorsApi.reducerPath]: supervisorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(administrativeApi.middleware)
      .concat(studentApi.middleware)
      .concat(semestersApi.middleware)
      .concat(transactionsApi.middleware)
      .concat(worksApi.middleware)
      .concat(scholarshipsApi.middleware)
      .concat(supervisorsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

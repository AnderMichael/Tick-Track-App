import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StudentData = {
  semester: number;
  inscriptions: any[];
};

export type User = {
  upbCode: number;
  email: string;
  fullName: string;
  role: "STUDENT" | "SUPERVISOR" | "ADMIN";
  department: string;
  isConfirmed: boolean;
  student?: StudentData;
};

interface SessionState {
  user: User | null;
  loading: boolean;
}

const initialState: SessionState = {
  user: null,
  loading: true,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, logout } = sessionSlice.actions;
export default sessionSlice.reducer;

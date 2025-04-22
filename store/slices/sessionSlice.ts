import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
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

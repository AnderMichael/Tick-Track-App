import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdministrativeState {
    upbRole: string | null;
}

const initialState: AdministrativeState = {
    upbRole: null,
};

export const administrativeSlice = createSlice({
    name: "administrative",
    initialState,
    reducers: {
        setAdministrativeInfo: (state, action: PayloadAction<string>) => {
            state.upbRole = action.payload;
        },
        clearAdministrativeInfo: (state) => {
            state.upbRole = null;
        },
    },
});

export const { setAdministrativeInfo, clearAdministrativeInfo } = administrativeSlice.actions;
export default administrativeSlice.reducer;

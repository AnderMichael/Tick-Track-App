import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Inscription = any;

interface StudentState {
    semester: number | null;
    inscriptions: Inscription[];
}

const initialState: StudentState = {
    semester: null,
    inscriptions: [],
};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setStudentInfo: (
            state,
            action: PayloadAction<{ semester: number; inscriptions: Inscription[] }>
        ) => {
            state.semester = action.payload.semester;
            state.inscriptions = action.payload.inscriptions;
        },
        clearStudentInfo: (state) => {
            state.semester = null;
            state.inscriptions = [];
        },
    },
});

export const { setStudentInfo, clearStudentInfo } = studentSlice.actions;
export default studentSlice.reducer;

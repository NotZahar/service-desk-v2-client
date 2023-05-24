import { IAppeal } from "@/types/models/appeal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppealsState {
    appeals: IAppeal[];
    error: string;
}

const initialState: AppealsState = {
    appeals: [],
    error: ''
};

export const appealsSlice = createSlice({
    name: 'appeals',
    initialState,
    reducers: {
        setAppealsSuccess(state, action: PayloadAction<IAppeal[]>) {
            state.appeals = action.payload;
            state.error = '';
        },
        setAppealsError(state, action: PayloadAction<string>) {
            state.appeals = [];
            state.error = action.payload;
        },
        resetAppeals(state) {
            state.appeals = [];
            state.error = '';
        }
    }
})

export default appealsSlice.reducer;
import { IAppeal } from "@/types/models/appeal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppealState {
    appeals: IAppeal[];
    error: string;
}

const initialState: AppealState = {
    appeals: [],
    error: ''
};

export const appealsSlice = createSlice({
    name: 'appeal',
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
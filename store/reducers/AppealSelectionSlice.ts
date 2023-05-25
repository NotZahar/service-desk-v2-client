import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppealSelectionSliceState {
    selectedAppealId: string | undefined;
}

const initialState: AppealSelectionSliceState = {
    selectedAppealId: undefined
};

export const appealSelectionSlice = createSlice({
    name: 'appeal-selection',
    initialState,
    reducers: {
        setSelectedAppealId(state, action: PayloadAction<string | undefined>) {
            state.selectedAppealId = action.payload;
        }
    }
})

export default appealSelectionSlice.reducer;
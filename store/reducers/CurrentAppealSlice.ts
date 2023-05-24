import { IAppeal } from "@/types/models/appeal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentAppealState {
    currentAppeal: IAppeal | undefined;
}

const initialState: CurrentAppealState = {
    currentAppeal: undefined
};

export const currentAppealSlice = createSlice({
    name: 'current-appeal',
    initialState,
    reducers: {
        setAppeal(state, action: PayloadAction<IAppeal>) {
            state.currentAppeal = action.payload;
        },
        resetAppeal(state) {
            state.currentAppeal = undefined;
        }
    }
})

export default currentAppealSlice.reducer;
import { IRequestStats } from "@/types/models/stats";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatsState {
    requestStats: IRequestStats | undefined;
    error: string;
}

const initialState: StatsState = {
    requestStats: undefined,
    error: ''
};

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        setStatsStatsSuccess(state, action: PayloadAction<IRequestStats>) {
            state.requestStats = action.payload;
            state.error = '';
        },
        setStatsError(state, action: PayloadAction<string>) {
            state.requestStats = undefined;
            state.error = action.payload;
        },
        resetStats(state) {
            state.requestStats = undefined;
            state.error = '';
        }
    }
})

export default statsSlice.reducer;
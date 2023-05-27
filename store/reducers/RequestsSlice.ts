import { IRequest } from "@/types/models/request";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestsState {
    requests: IRequest[];
    error: string;
}

const initialState: RequestsState = {
    requests: [],
    error: ''
};

export const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        setRequestsSuccess(state, action: PayloadAction<IRequest[]>) {
            state.requests = action.payload;
            state.error = '';
        },
        setRequestsError(state, action: PayloadAction<string>) {
            state.requests = [];
            state.error = action.payload;
        },
        resetRequests(state) {
            state.requests = [];
            state.error = '';
        }
    }
})

export default requestsSlice.reducer;
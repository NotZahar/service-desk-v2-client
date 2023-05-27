import { IRequest } from "@/types/models/request";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentRequestState {
    currentRequest: IRequest | undefined;
}

const initialState: CurrentRequestState = {
    currentRequest: undefined
};

export const currentRequestSlice = createSlice({
    name: 'current-request',
    initialState,
    reducers: {
        setRequest(state, action: PayloadAction<IRequest>) {
            state.currentRequest = action.payload;
        },
        resetRequest(state) {
            state.currentRequest = undefined;
        }
    }
})

export default currentRequestSlice.reducer;
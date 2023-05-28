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
        changeStatus(state, action: PayloadAction<{ 
            status_id: string; 
            status_name: string;
        }>) {
            if (state.currentRequest) {
                state.currentRequest.status_id =  action.payload.status_id;
                state.currentRequest.status_name = action.payload.status_name;
            }
        },
        changePriority(state, action: PayloadAction<{ 
            priority_id: string; 
            priority_name: string;
        }>) {
            if (state.currentRequest) {
                state.currentRequest.priority_id =  action.payload.priority_id;
                state.currentRequest.priority_name = action.payload.priority_name;
            }
        },
        changeController(state, action: PayloadAction<{ 
            controller_id: string;
            controller_name: string;
            controller_email: string;
            controller_appointment: string;
        }>) {
            if (state.currentRequest) {
                state.currentRequest.controller_id = action.payload.controller_id;
                state.currentRequest.controller_name = action.payload.controller_name;
                state.currentRequest.controller_email = action.payload.controller_email;
                state.currentRequest.controller_appointment = action.payload.controller_appointment;
            }
        },
        changeExecutor(state, action: PayloadAction<{ 
            executor_id: string;
            executor_name: string;
            executor_email: string;
            executor_appointment: string;
        }>) {
            if (state.currentRequest) {
                state.currentRequest.executor_id = action.payload.executor_id;
                state.currentRequest.executor_name = action.payload.executor_name;
                state.currentRequest.executor_email = action.payload.executor_email;
                state.currentRequest.executor_appointment = action.payload.executor_appointment;
            }
        },
        setFinishDate(state, action: PayloadAction<Date>) {
            if (state.currentRequest) state.currentRequest.finish_date = action.payload;
        },
        resetRequest(state) {
            state.currentRequest = undefined;
        }
    }
})

export default currentRequestSlice.reducer;
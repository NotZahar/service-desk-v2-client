import { IEmployee } from "@/types/models/employee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentEmployeeState {
    currentEmployee: IEmployee | undefined;
}

const initialState: CurrentEmployeeState = {
    currentEmployee: undefined
};

export const currentEmployeeSlice = createSlice({
    name: 'current-employee',
    initialState,
    reducers: {
        setEmployee(state, action: PayloadAction<IEmployee>) {
            state.currentEmployee = action.payload;
        },
        resetEmployee(state) {
            state.currentEmployee = undefined;
        }
    }
})

export default currentEmployeeSlice.reducer;
import { IEmployee } from "@/types/models/employee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeesState {
    employees: IEmployee[];
    error: string;
}

const initialState: EmployeesState = {
    employees: [],
    error: ''
};

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployeesSuccess(state, action: PayloadAction<IEmployee[]>) {
            state.employees = action.payload;
            state.error = '';
        },
        setEmployeesError(state, action: PayloadAction<string>) {
            state.employees = [];
            state.error = action.payload;
        },
        resetEmployees(state) {
            state.employees = [];
            state.error = '';
        }
    }
})

export default employeesSlice.reducer;
import { ICustomer } from "@/types/models/customer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomersState {
    customers: ICustomer[];
    error: string;
}

const initialState: CustomersState = {
    customers: [],
    error: ''
};

export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setCustomersSuccess(state, action: PayloadAction<ICustomer[]>) {
            state.customers = action.payload;
            state.error = '';
        },
        setCustomersError(state, action: PayloadAction<string>) {
            state.customers = [];
            state.error = action.payload;
        },
        resetCustomers(state) {
            state.customers = [];
            state.error = '';
        }
    }
})

export default customersSlice.reducer;
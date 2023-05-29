import { ICustomer } from "@/types/models/customer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentCustomerState {
    currentCustomer: ICustomer | undefined;
}

const initialState: CurrentCustomerState = {
    currentCustomer: undefined
};

export const currentCustomerSlice = createSlice({
    name: 'current-customer',
    initialState,
    reducers: {
        setCustomer(state, action: PayloadAction<ICustomer>) {
            state.currentCustomer = action.payload;
        },
        resetCustomer(state) {
            state.currentCustomer = undefined;
        }
    }
})

export default currentCustomerSlice.reducer;
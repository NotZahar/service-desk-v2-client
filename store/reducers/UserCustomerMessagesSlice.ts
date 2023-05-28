import { IUserCustomerMessage } from "@/types/models/user-customer-message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserCustomerMessagesState {
    userCustomerMessages: IUserCustomerMessage[];
    userCustomerMessagesError: string;
}

const initialState: UserCustomerMessagesState = {
    userCustomerMessages: [],
    userCustomerMessagesError: ''
};

export const userCustomerMessagesSlice = createSlice({
    name: 'user-customer-messages',
    initialState,
    reducers: {
        setUserCustomerMessagesSuccess(state, action: PayloadAction<IUserCustomerMessage[]>) {
            state.userCustomerMessages = action.payload;
            state.userCustomerMessagesError = '';
        },
        setUserCustomerMessagesError(state, action: PayloadAction<string>) {
            state.userCustomerMessages = [];
            state.userCustomerMessagesError = action.payload;
        },
        resetUserCustomerMessages(state) {
            state.userCustomerMessages = [];
            state.userCustomerMessagesError = '';
        }
    }
})

export default userCustomerMessagesSlice.reducer;
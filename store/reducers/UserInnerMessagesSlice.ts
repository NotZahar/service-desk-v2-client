import { IUserInnerMessage } from "@/types/models/user-inner-message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInnerMessagesState {
    userInnerMessages: IUserInnerMessage[];
    userInnerMessagesError: string;
}

const initialState: UserInnerMessagesState = {
    userInnerMessages: [],
    userInnerMessagesError: ''
};

export const userInnerMessagesSlice = createSlice({
    name: 'user-inner-messages',
    initialState,
    reducers: {
        setUserInnerMessagesSuccess(state, action: PayloadAction<IUserInnerMessage[]>) {
            state.userInnerMessages = action.payload;
            state.userInnerMessagesError = '';
        },
        setUserInnerMessagesError(state, action: PayloadAction<string>) {
            state.userInnerMessages = [];
            state.userInnerMessagesError = action.payload;
        },
        resetUserInnerMessages(state) {
            state.userInnerMessages = [];
            state.userInnerMessagesError = '';
        }
    }
})

export default userInnerMessagesSlice.reducer;
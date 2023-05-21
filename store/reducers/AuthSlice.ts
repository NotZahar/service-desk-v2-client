import { userType } from "@/types/redux/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    userChoice: userType;
    token: string | undefined;
}

const initialState: AuthState = {
    userChoice: 'none',
    token: undefined
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserChoice(state, action: PayloadAction<userType>) {
            state.userChoice = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        authReset(state) {
            state.userChoice = 'none';
            state.token = undefined;
        }
    }
});

export default authSlice.reducer;
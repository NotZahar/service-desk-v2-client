import { IUser } from "@/types/redux/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: IUser | undefined;
}

const initialState: UserState = {
    user: undefined
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        resetUser(state) {
            state.user = undefined;
        }
    }
});

export default userSlice.reducer;

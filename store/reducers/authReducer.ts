import { AuthAction, AuthActionTypes, AuthState } from "@/types/auth";

const initialState: AuthState = {
    userChoice: 'none'
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_USER_CHOICE:
            return { ...state, userChoice: action.payload };    
        default:
            return state;
    }
};
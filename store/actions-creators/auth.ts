import { AuthAction, AuthActionTypes, userType } from "@/types/auth";

export const setUserChoice = (payload: userType): AuthAction => {
    return { type: AuthActionTypes.SET_USER_CHOICE, payload };
} 
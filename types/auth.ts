export type userType = 'none' | 'customer' | 'employee';

export interface AuthState {
    userChoice: userType;
}

export enum AuthActionTypes {
    SET_USER_CHOICE = 'SET_USER_CHOICE'
}

interface SetUserChoiceAction {
    type: AuthActionTypes.SET_USER_CHOICE;
    payload: userType;
}

export type AuthAction = 
    SetUserChoiceAction;
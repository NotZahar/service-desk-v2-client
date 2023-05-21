export interface ICustomerUser {
    id: string;
    name: string;
}

export interface CustomerUserState {
    user: ICustomerUser;
}

export enum CustomerUserActionTypes {
    SET_CUSTOMER_USER = 'SET_CUSTOMER_USER',
    RESET_CUSTOMER_USER = 'RESET_CUSTOMER_USER'
}

interface SetCustomerUserAction {
    type: CustomerUserActionTypes.SET_CUSTOMER_USER;
    payload: ICustomerUser;
}

interface ResetCustomerUserAction {
    type: CustomerUserActionTypes.RESET_CUSTOMER_USER;
}

export type CustomerUserAction = 
    SetCustomerUserAction
    | ResetCustomerUserAction;
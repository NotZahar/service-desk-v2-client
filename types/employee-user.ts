export interface IEmployeeUser {
    id: string;
    name: string;
}

export interface EmployeeUserState {
    user: IEmployeeUser;
}

export enum EmployeeUserActionTypes {
    SET_EMPLOYEE_USER = 'SET_EMPLOYEE_USER',
    RESET_EMPLOYEE_USER = 'RESET_EMPLOYEE_USER'
}

interface SetEmployeeUserAction {
    type: EmployeeUserActionTypes.SET_EMPLOYEE_USER;
    payload: IEmployeeUser;
}

interface ResetEmployeeUserAction {
    type: EmployeeUserActionTypes.RESET_EMPLOYEE_USER;
}

export type EmployeeUserAction = 
    SetEmployeeUserAction
    | ResetEmployeeUserAction;
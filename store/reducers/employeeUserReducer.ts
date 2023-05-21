import { EmployeeUserAction, EmployeeUserActionTypes, EmployeeUserState } from "@/types/employee-user";

const initialState: EmployeeUserState = {
    user: { id: '', name: '' }
};

export const employeeUserReducer = (state = initialState, action: EmployeeUserAction): EmployeeUserState => {
    switch (action.type) {
        case EmployeeUserActionTypes.SET_EMPLOYEE_USER:
            return { ...state, user: action.payload };
        case EmployeeUserActionTypes.RESET_EMPLOYEE_USER: 
            return { user: { id: '', name: '' } };
        default:
            return state;
    }
};
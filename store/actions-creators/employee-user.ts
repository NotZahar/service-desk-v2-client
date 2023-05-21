import { EmployeeUserAction, EmployeeUserActionTypes, IEmployeeUser } from "@/types/employee-user";

export const setEmployeeUser = (payload: IEmployeeUser): EmployeeUserAction => {
    return { type: EmployeeUserActionTypes.SET_EMPLOYEE_USER, payload };
};

export const resetEmployeeUser = (): EmployeeUserAction => {
    return { type: EmployeeUserActionTypes.RESET_EMPLOYEE_USER };
};
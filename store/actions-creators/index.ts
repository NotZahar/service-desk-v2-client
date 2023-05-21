import * as AuthActionCreators from "../actions-creators/auth";
import * as EmployeeUserActionCreators from "../actions-creators/employee-user";
import * as CustomerUserActionCreators from "../actions-creators/customer-user";

export default {
    ...AuthActionCreators,
    ...EmployeeUserActionCreators,
    ...CustomerUserActionCreators
}
import { CustomerUserAction, CustomerUserActionTypes, ICustomerUser } from "@/types/customer-user";

export const setCustomerUser = (payload: ICustomerUser): CustomerUserAction => {
    return { type: CustomerUserActionTypes.SET_CUSTOMER_USER, payload };
};

export const resetCustomerUser = (): CustomerUserAction => {
    return { type: CustomerUserActionTypes.RESET_CUSTOMER_USER };
};
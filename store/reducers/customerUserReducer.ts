import { CustomerUserAction, CustomerUserActionTypes, CustomerUserState } from "@/types/customer-user";

const initialState: CustomerUserState = {
    user: { id: '', name: '' }
};

export const customerUserReducer = (state = initialState, action: CustomerUserAction): CustomerUserState => {
    switch (action.type) {
        case CustomerUserActionTypes.SET_CUSTOMER_USER:
            return { ...state, user: action.payload };
        case CustomerUserActionTypes.RESET_CUSTOMER_USER: 
            return { user: { id: '', name: '' } };
        default:
            return state;
    }
};
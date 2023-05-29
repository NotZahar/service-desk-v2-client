import { useTypedDispatch } from "@/hooks/redux";
import { currentCustomerSlice } from "@/store/reducers/CurrentCustomerSlice";
import { ICustomer } from "@/types/models/customer";
import customerCSSVariables from "../styles/components/Customer.module.scss";

interface CustomerProps {
    customer: ICustomer;
    leftClickHandler: Function;
}

const Customer: React.FC<CustomerProps> = ({ customer, leftClickHandler }) => {
    const { setCustomer } = currentCustomerSlice.actions;
    const dispatch = useTypedDispatch();

    const onLeftClickHandler = () => {
        dispatch(setCustomer(customer));
        leftClickHandler();
    };

    return (
        <>  
            <div id={ customer.id } className={ customerCSSVariables.customerClass } onClick={ onLeftClickHandler } >
                <p className={ customerCSSVariables.customerName } title={ customer.first_name } >{ customer.first_name }</p>
                <p className={ customerCSSVariables.customerEmail } title={ customer.email } >{ customer.email }</p>
                <p className={ customerCSSVariables.customerPhone } title={ customer.phone_number || '(Отсутствует)' } >{ customer.phone_number }</p>
                <p className={ customerCSSVariables.customerOrganization } title={ customer.organization || '(Отсутствует)' } >{ customer.organization }</p>
            </div>  
        </>
    );
};

export default Customer;

import { useTypedSelector } from "@/hooks/redux";
import customersListCSSVariables from "../styles/components/CustomersList.module.scss";
import Customer from "./Customer";

interface CustomersListProps {
    leftClickAppealHandler: Function;
}

const CustomersList: React.FC<CustomersListProps> = ({ leftClickAppealHandler }) => {
    const { customers } = useTypedSelector(state => state.customersReducer);

    return (
        <>  
            <div id={ customersListCSSVariables.columnNamesId }>
                <p className={ customersListCSSVariables.nameColumn } >Имя</p>
                <p className={ customersListCSSVariables.emailColumn } >Email</p>
                <p className={ customersListCSSVariables.phoneNumberColumn } >Телефон</p>     
                <p className={ customersListCSSVariables.organizationColumn } >Организация</p>
            </div>

            <div id={ customersListCSSVariables.customersId }>
                {   Array.isArray(customers) &&
                    customers.map((elem) => {
                        return <Customer 
                            customer={ elem } 
                            leftClickHandler={ leftClickAppealHandler }
                            key={ elem.id } />;
                    }) 
                }
            </div>
        </>
    );
};

export default CustomersList;

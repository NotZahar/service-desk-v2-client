import { CustomerErrorMessage } from "@/errors/customer-errors";
import { baseServerPath } from "@/helpers/paths";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { customersSlice } from "@/store/reducers/CustomersSlice";
import { useEffect, useRef, useState } from "react";
import CustomersList from "./CustomersList";
import Filter from "./Filter";
import Loader from "./Loader";

type filterSelectValue = 'all' | 'first_name' | 'email' | 'phone_number' | 'organization';
type filterSelectTitle = 'Все' | 'Имя' | 'Email' | 'Телефон' | 'Организация';

const filterOptions = new Map<filterSelectValue, filterSelectTitle>([
    ['all', 'Все' ],
    ['first_name', 'Имя'],
    ['email', 'Email'],
    ['phone_number', 'Телефон'],
    ['organization', 'Организация']
]);

const selectOptionToUrl = (optionValue: filterSelectValue, searchPattern: string) => {
    switch (optionValue) {
        case 'all':
            return `${baseServerPath}/customers/filtered?pattern=${searchPattern}`;
        case 'first_name':
            return `${baseServerPath}/customers/filtered-by-name?pattern=${searchPattern}`;
        case 'email':
            return `${baseServerPath}/customers/filtered-by-email?pattern=${searchPattern}`;
        case 'phone_number':
            return `${baseServerPath}/customers/filtered-by-phone-number?pattern=${searchPattern}`;
        case 'organization':
            return `${baseServerPath}/customers/filtered-by-organization?pattern=${searchPattern}`;
    }
}

interface WorkWithCustomersProps {
    leftClickAppealHandler: Function;
    refreshCustomersTrigger: boolean;
}

const WorkWithCustomers: React.FC<WorkWithCustomersProps> = ({ leftClickAppealHandler, refreshCustomersTrigger }) => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { error } = useTypedSelector(state => state.customersReducer);
    const { setCustomersSuccess, setCustomersError } = customersSlice.actions;
    const dispatch = useTypedDispatch();

    const [isLoading, setLoading] = useState(false);

    const filterInputRef = useRef<HTMLInputElement>(null);
    const filterSelectRef = useRef<HTMLSelectElement>(null);
    
    const filterHandler = (selectValue: filterSelectValue = filterSelectRef.current?.value as filterSelectValue, inputValue: string = filterInputRef.current?.value || '') => {
        setLoading(true);
        fetch(selectOptionToUrl(selectValue, inputValue), {
            headers: { Authorization: token || '' }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setCustomersSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setCustomersError(String(err)));
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${baseServerPath}/customers`, { headers: { Authorization: token || ''} })
        .then(res => res.json())
        .then(data => {
            dispatch(setCustomersSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setCustomersError(String(err)));
            setLoading(false);
        });

        if (refreshCustomersTrigger) filterHandler('all', '');

    }, [refreshCustomersTrigger]);
    
    if (isLoading) return <Loader error={ false } message={ 'Подгрузка данных...' } />;
    if (error) return <Loader error={ true } message={ `${CustomerErrorMessage.FetchDataProblems}: ${error}` } />;

    return (
        <>  
            <Filter 
                selectFilter={ { options: Array.from(filterOptions).map(([value, title]) => ({ value, title })) } }
                selectedOption={ 'all' }
                refInput={ filterInputRef }
                refSelect={ filterSelectRef }
                filterHandler={ filterHandler } />
            <CustomersList leftClickAppealHandler={ leftClickAppealHandler } />
        </>
    );
};

export default WorkWithCustomers;
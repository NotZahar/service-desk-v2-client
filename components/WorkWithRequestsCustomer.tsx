import { RequestErrorMessage } from "@/errors/request-errors";
import { baseServerPath } from "@/helpers/paths";
import { updateRequestsIntervalTime } from "@/helpers/update-data";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { requestsSlice } from "@/store/reducers/RequestsSlice";
import { useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import Loader from "./Loader";
import RequestsList from "./RequestsList";

type filterSelectValue = 'all' | 'theme' | 'registration_date' | 'status';
type filterSelectTitle = 'Все' | 'Тема' | 'Дата регистрации' | 'Статус';

const filterOptions = new Map<filterSelectValue, filterSelectTitle>([
    ['all', 'Все' ],
    ['theme', 'Тема'],
    ['registration_date', 'Дата регистрации'],
    ['status', 'Статус']
]);

const selectOptionToUrl = (optionValue: filterSelectValue, searchPattern: string, customerId: string) => {
    switch (optionValue) {
        case 'all':
            return `${baseServerPath}/requests/customer/filtered?id=${customerId}&pattern=${searchPattern}`;
        case 'theme':
            return `${baseServerPath}/requests/customer/filtered-by-theme?id=${customerId}&pattern=${searchPattern}`;
        case 'registration_date':
            return `${baseServerPath}/requests/customer/filtered-by-registration-date?id=${customerId}&pattern=${searchPattern}`;
        case 'status':
            return `${baseServerPath}/requests/customer/filtered-by-status?id=${customerId}&pattern=${searchPattern}`;
    }
}

interface WorkWithRequestsCustomerProps {
    leftClickAppealHandler: Function;
}

const WorkWithRequestsCustomer: React.FC<WorkWithRequestsCustomerProps> = ({ leftClickAppealHandler }) => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { error } = useTypedSelector(state => state.requestsReducer);
    const { user } = useTypedSelector(state => state.userReducer);
    const { setRequestsSuccess, setRequestsError } = requestsSlice.actions;
    const dispatch = useTypedDispatch();

    const [isLoading, setLoading] = useState(false);

    const filterInputRef = useRef<HTMLInputElement>(null);
    const filterSelectRef = useRef<HTMLSelectElement>(null);
    
    const filterHandler = (selectValue: filterSelectValue = filterSelectRef.current?.value as filterSelectValue, inputValue: string = filterInputRef.current?.value || '') => {
        setLoading(true);
        fetch(selectOptionToUrl(selectValue, inputValue, user?.id || ''), {
            headers: { Authorization: token || '' }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setRequestsSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setRequestsError(String(err)));
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${baseServerPath}/requests/customer?id=${user?.id}`, { headers: { Authorization: token || ''} })
        .then(res => res.json())
        .then(data => {
            dispatch(setRequestsSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setRequestsError(String(err)));
            setLoading(false);
        });

        const interval = setInterval(() => { 
            filterHandler('all', '');
        }, updateRequestsIntervalTime);
        return () => clearInterval(interval);
    }, []);
    
    if (isLoading) return <Loader error={ false } message={ 'Подгрузка данных...' } />;
    if (error) return <Loader error={ true } message={ `${RequestErrorMessage.FetchDataProblems}: ${error}` } />;

    return (
        <>  
            <Filter 
                selectFilter={ { options: Array.from(filterOptions).map(([value, title]) => ({ value, title })) } }
                selectedOption={ 'all' }
                refInput={ filterInputRef }
                refSelect={ filterSelectRef }
                filterHandler={ filterHandler } />
            <RequestsList leftClickAppealHandler={ leftClickAppealHandler } notForCustomer={ false } />
        </>
    );
};

export default WorkWithRequestsCustomer;
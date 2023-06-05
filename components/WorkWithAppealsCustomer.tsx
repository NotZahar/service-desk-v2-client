import { AppealErrorMessage } from "@/errors/appeal-errors";
import { baseServerPath } from "@/helpers/paths";
import { updateAppealsIntervalTime } from "@/helpers/update-data";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { appealsSlice } from "@/store/reducers/AppealsSlice";
import { useEffect, useRef, useState } from "react";
import AppealsList from "./AppealsList";
import Filter from "./Filter";
import Loader from "./Loader";

type filterSelectValue = 'all' | 'theme' | 'date' | 'status';
type filterSelectTitle = 'Все' | 'Тема' | 'Дата регистрации' | 'Статус';

const filterOptions = new Map<filterSelectValue, filterSelectTitle>([
    ['all', 'Все' ],
    ['theme', 'Тема'],
    ['date', 'Дата регистрации'],
    ['status', 'Статус']
]);

const selectOptionToUrl = (optionValue: filterSelectValue, searchPattern: string, customerId: string) => {
    switch (optionValue) {
        case 'all':
            return `${baseServerPath}/appeals/customer/filtered?id=${customerId}&pattern=${searchPattern}`;
        case 'date':
            return `${baseServerPath}/appeals/customer/filtered-by-date?id=${customerId}&pattern=${searchPattern}`;
        case 'status':
            return `${baseServerPath}/appeals/customer/filtered-by-status?id=${customerId}&pattern=${searchPattern}`;
        case 'theme':
            return `${baseServerPath}/appeals/customer/filtered-by-theme?id=${customerId}&pattern=${searchPattern}`;
    }
}

interface WorkWithAppealsCustomerProps {
    leftClickAppealHandler: Function;
    refreshAppealsTrigger: boolean;
}

const WorkWithAppealsCustomer: React.FC<WorkWithAppealsCustomerProps> = ({ leftClickAppealHandler, refreshAppealsTrigger }) => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { error } = useTypedSelector(state => state.appealsReducer);
    const { user } = useTypedSelector(state => state.userReducer);
    const { setAppealsError, setAppealsSuccess } = appealsSlice.actions;
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
            dispatch(setAppealsSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setAppealsError(String(err)));
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${baseServerPath}/appeals/customer?id=${user?.id}`, { headers: { Authorization: token || ''} })
        .then(res => res.json())
        .then(data => {
            dispatch(setAppealsSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setAppealsError(String(err)));
            setLoading(false);
        });

        if (refreshAppealsTrigger) filterHandler('all', '');

        const interval = setInterval(() => { 
            filterHandler('all', '');
        }, updateAppealsIntervalTime);
        return () => clearInterval(interval);
    }, [refreshAppealsTrigger]);
    
    if (isLoading) return <Loader error={ false } message={ 'Подгрузка данных...' } />;
    if (error) return <Loader error={ true } message={ `${AppealErrorMessage.FetchDataProblems}: ${error}` } />;

    return (
        <>  
            <Filter 
                selectFilter={ { options: Array.from(filterOptions).map(([value, title]) => ({ value, title })) } }
                selectedOption={ 'all' }
                refInput={ filterInputRef }
                refSelect={ filterSelectRef }
                filterHandler={ filterHandler } />
            <AppealsList leftClickAppealHandler={ leftClickAppealHandler } />
        </>
    );
};

export default WorkWithAppealsCustomer;
import { RequestErrorMessage } from "@/errors/request-errors";
import { baseServerPath } from "@/helpers/paths";
import { updateRequestsIntervalTime } from "@/helpers/update-data";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { requestsSlice } from "@/store/reducers/RequestsSlice";
import { useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import Loader from "./Loader";
import RequestsList from "./RequestsList";

type filterSelectValue = 'all' | 'theme' | 'priority' | 'planned_date' | 'registration_date' | 'status';
type filterSelectTitle = 'Все' | 'Тема' | 'Приоритет' | 'Запланированная дата' | 'Дата регистрации' | 'Статус';

const filterOptions = new Map<filterSelectValue, filterSelectTitle>([
    ['all', 'Все' ],
    ['theme', 'Тема'],
    ['priority', 'Приоритет'],
    ['planned_date', 'Запланированная дата'],
    ['registration_date', 'Дата регистрации'],
    ['status', 'Статус']
]);

const selectOptionToUrl = (employeeId: string, optionValue: filterSelectValue, searchPattern: string) => {
    switch (optionValue) {
        case 'all':
            return `${baseServerPath}/requests/specialist/filtered?id=${employeeId}&pattern=${searchPattern}`;
        case 'theme':
            return `${baseServerPath}/requests/specialist/filtered-by-theme?id=${employeeId}&pattern=${searchPattern}`;
        case 'priority':
            return `${baseServerPath}/requests/specialist/filtered-by-priority?id=${employeeId}&pattern=${searchPattern}`;
        case 'planned_date':
            return `${baseServerPath}/requests/specialist/filtered-by-planned-date?id=${employeeId}&pattern=${searchPattern}`;
        case 'registration_date':
            return `${baseServerPath}/requests/specialist/filtered-by-registration-date?id=${employeeId}&pattern=${searchPattern}`;
        case 'status':
            return `${baseServerPath}/requests/specialist/filtered-by-status?id=${employeeId}&pattern=${searchPattern}`;
    }
}

interface WorkWithRequestsSpecProps {
    leftClickAppealHandler: Function;
}

const WorkWithRequestsSpec: React.FC<WorkWithRequestsSpecProps> = ({ leftClickAppealHandler }) => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { user } = useTypedSelector(state => state.userReducer);
    const { error } = useTypedSelector(state => state.requestsReducer);
    const { setRequestsSuccess, setRequestsError } = requestsSlice.actions;
    const dispatch = useTypedDispatch();

    const [isLoading, setLoading] = useState(false);

    const filterInputRef = useRef<HTMLInputElement>(null);
    const filterSelectRef = useRef<HTMLSelectElement>(null);
    
    const filterHandler = (selectValue: filterSelectValue = filterSelectRef.current?.value as filterSelectValue, inputValue: string = filterInputRef.current?.value || '') => {
        setLoading(true);
        fetch(selectOptionToUrl(user?.id || '', selectValue, inputValue), {
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
        fetch(`${baseServerPath}/requests/specialist?id=${user?.id}`, { headers: { Authorization: token || ''} })
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
            <RequestsList leftClickAppealHandler={ leftClickAppealHandler } />
        </>
    );
};

export default WorkWithRequestsSpec;
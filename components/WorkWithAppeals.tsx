import { AppealErrorMessage } from "@/errors/appeal-errors";
import { baseServerPath } from "@/helpers/paths";
import { updateAppealsIntervalTime } from "@/helpers/update-data";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { appealsSlice } from "@/store/reducers/AppealsSlice";
import { useEffect, useRef, useState } from "react";
import AppealsList from "./AppealsList";
import Filter from "./Filter";

type filterSelectValue = 'all' | 'theme' | 'date' | 'status';
type filterSelectTitle = 'Все' | 'Тема' | 'Дата регистрации' | 'Статус';

const filterOptions = new Map<filterSelectValue, filterSelectTitle>([
    ['all', 'Все' ],
    ['theme', 'Тема'],
    ['date', 'Дата регистрации'],
    ['status', 'Статус']
]);

const selectOptionToUrl = (optionValue: filterSelectValue, searchPattern: string) => {
    switch (optionValue) {
        case 'all':
            return `${baseServerPath}/appeals/filtered?pattern=${searchPattern}`;
        case 'date':
            return `${baseServerPath}/appeals/filtered-by-date?pattern=${searchPattern}`;
        case 'status':
            return `${baseServerPath}/appeals/filtered-by-status?pattern=${searchPattern}`;
        case 'theme':
            return `${baseServerPath}/appeals/filtered-by-theme?pattern=${searchPattern}`;
    }
}

interface WorkWithAppealsProps {
    parentHandlerAppeal: Function;
}

const WorkWithAppeals: React.FC<WorkWithAppealsProps> = ({ parentHandlerAppeal }) => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { error } = useTypedSelector(state => state.appealsReducer);
    const { setAppealsError, setAppealsSuccess } = appealsSlice.actions;
    const dispatch = useTypedDispatch();

    const [isLoading, setLoading] = useState(false);

    const filterInputRef = useRef<HTMLInputElement>(null);
    const filterSelectRef = useRef<HTMLSelectElement>(null);
    
    useEffect(() => {
        setLoading(true);
        fetch(`${baseServerPath}/appeals`, { headers: { Authorization: token || ''} })
        .then(res => res.json())
        .then(data => {
            dispatch(setAppealsSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setAppealsError(String(err)));
            setLoading(false);
        });

        const interval = setInterval(() => { 
            setLoading(true);
            fetch(selectOptionToUrl('all', ''), {
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
        }, updateAppealsIntervalTime);
        return () => clearInterval(interval);
    }, []);

    const filterHandler = () => {
        setLoading(true);
        fetch(selectOptionToUrl(filterSelectRef.current?.value as filterSelectValue, filterInputRef.current?.value || ''), {
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
    
    if (isLoading) return <h2 style={{padding: '15px'}}>Подгрузка данных...</h2>;
    if (error) return <h2 style={{padding: '15px'}}>&#128308; {`${AppealErrorMessage.FetchDataProblems}: ${error}`}</h2>;

    return (
        <>  
            <Filter 
                selectFilter={ { options: Array.from(filterOptions).map(([value, title]) => ({ value, title })) } }
                selectedOption={ 'all' }
                refInput={ filterInputRef }
                refSelect={ filterSelectRef }
                filterHandler={ filterHandler } />
            <AppealsList parentAppealHandler={ parentHandlerAppeal } />
        </>
    );
};

export default WorkWithAppeals;
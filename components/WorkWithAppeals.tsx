import { AppealErrorMessage } from "@/errors/appeal-errors";
import { baseServerPath } from "@/helpers/paths";
import { updateAppealsIntervalTime } from "@/helpers/update-data";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { appealSelectionSlice } from "@/store/reducers/AppealSelectionSlice";
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
    leftClickAppealHandler: Function;
    denyAppealTrigger: boolean;
}

const WorkWithAppeals: React.FC<WorkWithAppealsProps> = ({ leftClickAppealHandler, denyAppealTrigger }) => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { error } = useTypedSelector(state => state.appealsReducer);
    const { setAppealsError, setAppealsSuccess } = appealsSlice.actions;
    const { setSelectedAppealId } = appealSelectionSlice.actions;
    const dispatch = useTypedDispatch();

    const [isLoading, setLoading] = useState(false);

    const filterInputRef = useRef<HTMLInputElement>(null);
    const filterSelectRef = useRef<HTMLSelectElement>(null);
    
    const filterHandler = (selectValue: filterSelectValue = filterSelectRef.current?.value as filterSelectValue, inputValue: string = filterInputRef.current?.value || '') => {
        dispatch(setSelectedAppealId(undefined));
        setLoading(true);
        fetch(selectOptionToUrl(selectValue, inputValue), {
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
        dispatch(setSelectedAppealId(undefined));
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

        if (denyAppealTrigger) filterHandler('all', '');

        const interval = setInterval(() => { 
            filterHandler('all', '');
        }, updateAppealsIntervalTime);
        return () => clearInterval(interval);
    }, [denyAppealTrigger]);
    
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

export default WorkWithAppeals;
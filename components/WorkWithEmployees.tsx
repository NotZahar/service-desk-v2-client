import { EmployeeErrorMessage } from "@/errors/employee-errors";
import { baseServerPath } from "@/helpers/paths";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { employeesSlice } from "@/store/reducers/EmployeesSlice";
import { useEffect, useRef, useState } from "react";
import EmployeesList from "./EmployeeList";
import Filter from "./Filter";
import Loader from "./Loader";

type filterSelectValue = 'all' | 'first_name' | 'email' | 'appointment' | 'department';
type filterSelectTitle = 'Все' | 'Имя' | 'Email' | 'Должность' | 'Отдел';

const filterOptions = new Map<filterSelectValue, filterSelectTitle>([
    ['all', 'Все' ],
    ['first_name', 'Имя'],
    ['email', 'Email'],
    ['appointment', 'Должность'],
    ['department', 'Отдел']
]);

const selectOptionToUrl = (optionValue: filterSelectValue, searchPattern: string) => {
    switch (optionValue) {
        case 'all':
            return `${baseServerPath}/employees/filtered?pattern=${searchPattern}`;
        case 'first_name':
            return `${baseServerPath}/employees/filtered-by-name?pattern=${searchPattern}`;
        case 'email':
            return `${baseServerPath}/employees/filtered-by-email?pattern=${searchPattern}`;
        case 'appointment':
            return `${baseServerPath}/employees/filtered-by-appointment?pattern=${searchPattern}`;
        case 'department':
            return `${baseServerPath}/employees/filtered-by-department?pattern=${searchPattern}`;
    }
}

interface WorkWithCustomersProps {
    leftClickAppealHandler: Function;
    refreshEmployeesTrigger: boolean;
}

const WorkWithEmployees: React.FC<WorkWithCustomersProps> = ({ leftClickAppealHandler, refreshEmployeesTrigger }) => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { error } = useTypedSelector(state => state.employeesReducer);
    const { setEmployeesSuccess, setEmployeesError } = employeesSlice.actions;
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
            dispatch(setEmployeesSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setEmployeesError(String(err)));
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${baseServerPath}/employees`, { headers: { Authorization: token || ''} })
        .then(res => res.json())
        .then(data => {
            dispatch(setEmployeesSuccess(data));
            setLoading(false);
        })
        .catch(err => {
            dispatch(setEmployeesError(String(err)));
            setLoading(false);
        });

        if (refreshEmployeesTrigger) filterHandler('all', '');

    }, [refreshEmployeesTrigger]);
    
    if (isLoading) return <Loader error={ false } message={ 'Подгрузка данных...' } />;
    if (error) return <Loader error={ true } message={ `${EmployeeErrorMessage.FetchDataProblems}: ${error}` } />;

    return (
        <>  
            <Filter 
                selectFilter={ { options: Array.from(filterOptions).map(([value, title]) => ({ value, title })) } }
                selectedOption={ 'all' }
                refInput={ filterInputRef }
                refSelect={ filterSelectRef }
                filterHandler={ filterHandler } />
            <EmployeesList leftClickAppealHandler={ leftClickAppealHandler } />
        </>
    );
};

export default WorkWithEmployees;
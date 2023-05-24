import { AppealErrorMessage } from "@/errors/appeal-errors";
import { baseServerPath } from "@/helpers/paths";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { appealsSlice } from "@/store/reducers/AppealsSlice";
import { useEffect, useRef, useState } from "react";
import AppealsList from "./AppealsList";
import Filter from "./Filter";

interface WorkWithAppealsProps {

}

const WorkWithAppeals: React.FC<WorkWithAppealsProps> = () => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { error } = useTypedSelector(state => state.appealsReducer);
    const { setAppealsError, setAppealsSuccess } = appealsSlice.actions;
    const dispatch = useTypedDispatch();

    const [isLoading, setLoading] = useState(false);

    const filterInputRef = useRef<HTMLInputElement>(null);
    const filterSelectRef = useRef<HTMLSelectElement>(null);

    const filterOptions = new Map<string, string>([
        ['all', 'Все' ],
        ['theme', 'Тема'],
        ['date', 'Дата регистрации'],
        ['status', 'Статус']
    ]);
    
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
    }, []);

    const filterHandler = () => {
        // setLoading(true);
        filterInputRef.current?.value 
        filterSelectRef.current?.value
        // fetch(`${baseServerPath}/appeals`, { headers: { Authorization: token || ''} })
        // .then(res => res.json())
        // .then(data => {
        //     dispatch(setAppealsSuccess(data));
        //     setInitLoading(false);
        // })
        // .catch(err => {
        //     dispatch(setAppealsError(String(err)));
        //     setInitLoading(false);
        // });
    }
    
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
            <AppealsList />
        </>
    );
};

export default WorkWithAppeals;
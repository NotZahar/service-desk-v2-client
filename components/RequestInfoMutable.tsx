import { RequestErrorMessage } from "@/errors/request-errors";
import { baseServerPath } from "@/helpers/paths";
import { RequestPriority } from "@/helpers/request-priorities";
import { RequestStatus } from "@/helpers/request-statuses";
import { toStringArray } from "@/helpers/transform";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import useUUID from "@/hooks/useUUID";
import { currentRequestSlice } from "@/store/reducers/CurrentRequestSlice";
import { IEmployee } from "@/types/models/employee";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import requestInfoMutableCSSVariables from "../styles/components/RequestInfoMutable.module.scss";
import Loader from "./Loader";
import Modal from "./Modal";

interface RequestInfoMutableProps {

}

const RequestInfoMutable: React.FC<RequestInfoMutableProps> = () => {
    const { changeStatus, changePriority, setFinishDate, changeController, changeExecutor } = currentRequestSlice.actions;
    const dispatch = useTypedDispatch();
    const { currentRequest } = useTypedSelector(state => state.currentRequestReducer);
    const { token } = useTypedSelector(state => state.authReducer);

    const [isLoading, setLoading] = useState(false);
    const [employeesData, setEmployeesData] = useState<IEmployee[] | undefined>(undefined);
    const [fetchError, setFetchError] = useState<string | undefined>(undefined);
    const [errorsVisible, setErrorsVisible] = useState(false);
    const [errorsMessages, setErrorsMessages] = useState<string[]>();

    const statusRef = useRef<HTMLSelectElement>(null);
    const priorityRef = useRef<HTMLSelectElement>(null);
    const controllerRef = useRef<HTMLSelectElement>(null);
    const executorRef = useRef<HTMLSelectElement>(null);
    
    const dateString = new Date(typeof currentRequest?.date === 'string' ? currentRequest?.date : '').toLocaleString('ru-RU');
    const plannedDateString = new Date(typeof currentRequest?.planned_date === 'string' ? currentRequest?.planned_date : '').toLocaleString('ru-RU');

    const priorities = Object.entries(RequestPriority).map((elem) => { return { value: elem[0], title: elem[1] } });
    const statuses = Object.entries(RequestStatus).map((elem) => { return { value: elem[0], title: elem[1] } });

    const prioritiesKeys = useUUID(priorities.length);
    const statusesKeys = useUUID(statuses.length);

    const changeStatusHandler = async () => {
        if (currentRequest?.status_name !== RequestStatus.AT_WORK && statusRef.current?.value === RequestStatus.AT_WORK) {
            if (statusRef.current) statusRef.current.value = currentRequest?.status_name || ''; 
            setErrorsMessages([ RequestErrorMessage.ChangeStatusForbidden ]);
            setErrorsVisible(prev => !prev);
            return;
        }

        try {
            const response = await axios.put(`${baseServerPath}/requests/change-status`, {
                id: currentRequest?.id,
                status_name: statusRef.current?.value,
                appeal_id: currentRequest?.appeal_id || undefined
            }, {
                headers: {
                    Authorization: token
                }
            });

            dispatch(setFinishDate(response.data.finish_date));
            dispatch(changeStatus({ status_id: response.data.status_id, status_name: response.data.status_name }));
        } catch (err) {
            setErrorsMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible(prev => !prev);
        }
    };

    const changePriorityHandler = async () => {
        try {
            const response = await axios.put(`${baseServerPath}/requests/change-priority`, {
                id: currentRequest?.id,
                priority_name: priorityRef.current?.value
            }, {
                headers: {
                    Authorization: token
                }
            });

            dispatch(changePriority({ priority_id: response.data.priority_id, priority_name: response.data.priority_name }));
        } catch (err) {
            setErrorsMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible(prev => !prev);
        }
    };

    const changeControllerHandler = async () => {
        try {
            const response = await axios.put(`${baseServerPath}/requests/change-controller`, {
                id: currentRequest?.id,
                controller_id: controllerRef.current?.value
            }, {
                headers: {
                    Authorization: token
                }
            });

            dispatch(changeController({ 
                controller_id: response.data.controller_id, 
                controller_name: response.data.controller_name,
                controller_email: response.data.controller_email,
                controller_appointment: response.data.controller_appointment
            }));
        } catch (err) {
            setErrorsMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible(prev => !prev);
        }
    }

    const changeExecutorHandler = async () => {
        try {
            const response = await axios.put(`${baseServerPath}/requests/change-executor`, {
                id: currentRequest?.id,
                executor_id: executorRef.current?.value
            }, {
                headers: {
                    Authorization: token
                }
            });

            dispatch(changeExecutor({ 
                executor_id: response.data.executor_id, 
                executor_name: response.data.executor_name,
                executor_email: response.data.executor_email,
                executor_appointment: response.data.executor_appointment
            }));
        } catch (err) {
            setErrorsMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible(prev => !prev);
        }
    }

    const fetchData = (url: string, callbackSuccess: Function, callbackError: Function) => {
        setLoading(true);
        fetch(url, { 
            headers: { 
                Authorization: token || ''
            } 
        })
        .then(res => res.json())
        .then(data => {
            callbackSuccess(data);
            setLoading(false);
        })
        .catch(err => {
            callbackError(String(err));
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData(`${baseServerPath}/employees`, setEmployeesData, setFetchError);
    }, []);

    if (isLoading) return <Loader error={ false } message={ 'Подгрузка данных...' } />;
    if (fetchError) return <Loader error={ true } message={ fetchError } />;

    return (
        <>
            <div id={ requestInfoMutableCSSVariables.mainLayoutId }>
                <div className={ requestInfoMutableCSSVariables.infoBlockClass }>
                    <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                        <select ref={ statusRef } defaultValue={ currentRequest?.status_name } onChange={ changeStatusHandler } >
                            {   statuses.map(({ title }, index) => {
                                    return <option key={ statusesKeys[index] } value={ title }>{ title }</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className={ requestInfoMutableCSSVariables.infoBlockClass }>
                    <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                        <p className={ requestInfoMutableCSSVariables.fieldNameClass }>Дата регистрации:</p>
                        <p>{ dateString }</p>
                    </div>
                    <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                        <p className={ requestInfoMutableCSSVariables.fieldNameClass }>Плановая дата решения:</p>
                        <p>{ plannedDateString }</p>
                    </div>
                    {   currentRequest?.finish_date &&
                        <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                            <p className={ requestInfoMutableCSSVariables.fieldNameClass }>Фактическая дата решения:</p>
                            <p>{ new Date(typeof currentRequest?.finish_date === 'string' ? currentRequest?.finish_date : '').toLocaleString('ru-RU') }</p> 
                        </div>
                    }
                    <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                        <p className={ requestInfoMutableCSSVariables.fieldNameClass }>Тип заявки:</p>
                        <p>{ currentRequest?.type_name }</p>
                    </div>
                    <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                        <p className={ requestInfoMutableCSSVariables.fieldNameClass }>Приоритет:</p>
                        <select ref={ priorityRef } defaultValue={ currentRequest?.priority_name } onChange={ changePriorityHandler } >
                            {   priorities.map(({ title }, index) => {
                                    return <option key={ prioritiesKeys[index] } value={ title }>{ title }</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className={ requestInfoMutableCSSVariables.infoBlockClass }>
                    <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                        <p className={ requestInfoMutableCSSVariables.fieldNameClass }>Ответственный сотрудник:</p>
                        <select ref={ controllerRef } defaultValue={ currentRequest?.controller_id } onChange={ changeControllerHandler } >
                            {   employeesData?.map(({ id, first_name, email, appointment }) => {
                                    return <option key={ id } value={ id }>{ `${first_name} ${email} ${appointment}` }</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                        <p className={ requestInfoMutableCSSVariables.fieldNameClass }>Исполнитель:</p>
                        <select ref={ executorRef } defaultValue={ currentRequest?.executor_id } onChange={ changeExecutorHandler } >
                            {   employeesData?.map(({ id, first_name, email, appointment }) => {
                                    return <option key={ id } value={ id }>{ `${first_name} ${email} ${appointment}` }</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            {   errorsVisible &&
                <Modal
                    title="Ошибка!"
                    errors={ errorsMessages && errorsMessages.map((msg) => { return { text: msg }; }) }
                    buttons={[
                        { text: 'Закрыть', onClick: () => { setErrorsVisible(prev => !prev) } }
                    ]} />
            }
        </>
    );
};

export default RequestInfoMutable;
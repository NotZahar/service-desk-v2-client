import { RequestPriority } from "@/helpers/request-priorities";
import { RequestStatus } from "@/helpers/request-statuses";
import { useTypedSelector } from "@/hooks/redux";
import useUUID from "@/hooks/useUUID";
import requestInfoMutableCSSVariables from "../styles/components/RequestInfoMutable.module.scss";

interface RequestInfoMutableSpecProps {

}

const RequestInfoMutableSpec: React.FC<RequestInfoMutableSpecProps> = () => {
    const { currentRequest } = useTypedSelector(state => state.currentRequestReducer);
    
    const dateString = new Date(typeof currentRequest?.date === 'string' ? currentRequest?.date : '').toLocaleString('ru-RU');
    const plannedDateString = new Date(typeof currentRequest?.planned_date === 'string' ? currentRequest?.planned_date : '').toLocaleString('ru-RU');

    const priorities = Object.entries(RequestPriority).map((elem) => { return { value: elem[0], title: elem[1] } });
    const statuses = Object.entries(RequestStatus).map((elem) => { return { value: elem[0], title: elem[1] } });

    const prioritiesKeys = useUUID(priorities.length);
    const statusesKeys = useUUID(statuses.length);

    return (
        <>
            <div id={ requestInfoMutableCSSVariables.mainLayoutId }>
                <div className={ requestInfoMutableCSSVariables.infoBlockClass }>
                    <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                        <select defaultValue={ currentRequest?.status_name } disabled >
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
                        <select defaultValue={ currentRequest?.priority_name } disabled >
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
                        <select defaultValue={ currentRequest?.controller_id } disabled >
                            <option value={ currentRequest?.controller_id }>{ `${currentRequest?.controller_name} ${currentRequest?.controller_email} ${currentRequest?.controller_appointment}` }</option>;
                        </select>
                    </div>
                    <div className={ requestInfoMutableCSSVariables.infoDataClass }>
                        <p className={ requestInfoMutableCSSVariables.fieldNameClass }>Исполнитель:</p>
                        <select defaultValue={ currentRequest?.executor_id } disabled >
                            <option value={ currentRequest?.executor_id }>{ `${currentRequest?.executor_name} ${currentRequest?.executor_email} ${currentRequest?.executor_appointment}` }</option>;
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestInfoMutableSpec;
import { baseServerPath } from "@/helpers/paths";
import { RequestPriority } from "@/helpers/request-priorities";
import { requestStatus, RequestStatus } from "@/helpers/request-statuses";
import { RequestType } from "@/helpers/request-types";
import { useTypedSelector } from "@/hooks/redux";
import useUUID from "@/hooks/useUUID";
import { ICustomer } from "@/types/models/customer";
import { IEmployee } from "@/types/models/employee";
import { RefObject, useEffect, useState } from "react";
import newRequestModalCSSVariables from "../styles/components/NewRequestModal.module.scss";

interface NewRequestModalProps {
    defaultStatus: requestStatus;
    themeInputRef: RefObject<HTMLInputElement>;
    prioritiesSelectRef: RefObject<HTMLSelectElement>;
    statusesSelectRef: RefObject<HTMLSelectElement>;
    typesSelectRef: RefObject<HTMLSelectElement>;
    customersInputRef: RefObject<HTMLInputElement>;
    contractsInputRef: RefObject<HTMLInputElement>;
    controllersInputRef: RefObject<HTMLInputElement>;
    executorsInputRef: RefObject<HTMLInputElement>;
    plannedDateInputRef: RefObject<HTMLInputElement>;
    descriptionInputRef: RefObject<HTMLTextAreaElement>;
}

const NewRequestModal: React.FC<NewRequestModalProps> = ({ 
        defaultStatus,
        themeInputRef,
        prioritiesSelectRef,
        statusesSelectRef,
        typesSelectRef,
        customersInputRef,
        contractsInputRef,
        controllersInputRef,
        executorsInputRef,
        plannedDateInputRef,
        descriptionInputRef
    }) => {
    const { token } = useTypedSelector(state => state.authReducer);

    const [customersData, setCustomersData] = useState<ICustomer[] | undefined>(undefined);
    const [employeesData, setEmployeesData] = useState<IEmployee[] | undefined>(undefined);
    const [contractsData, setContractsData] = useState<string[] | undefined>(undefined);
    const [fetchError, setFetchError] = useState<string | undefined>(undefined);

    const priorities = Object.entries(RequestPriority).map((elem) => { return { value: elem[0], title: elem[1] } });
    const statuses = Object.entries(RequestStatus).map((elem) => { return { value: elem[0], title: elem[1] } });
    const types = Object.entries(RequestType).map((elem) => { return { value: elem[0], title: elem[1] } });

    const prioritiesKeys = useUUID(priorities.length);
    const statusesKeys = useUUID(statuses.length);
    const typesKeys = useUUID(types.length);

    const datalistCustomersLinkId = 'customers';
    const datalistControllersLinkId = 'controllers';
    const datalistExecutorsLinkId = 'executors';
    const datalistContractsLinkId = 'contracts';

    const fetchData = (url: string, callbackSuccess: Function, callbackError: Function) => {
        fetch(url, { 
            headers: { 
                Authorization: token || ''
            } 
        })
        .then(res => res.json())
        .then(data => {
            callbackSuccess(data);
        })
        .catch(err => {
            callbackError(String(err));
        });
    };

    useEffect(() => {
        fetchData(`${baseServerPath}/customers`, setCustomersData, setFetchError);
        fetchData(`${baseServerPath}/employees`, setEmployeesData, setFetchError);
        fetchData(`${baseServerPath}/knowledge-base/contracts`, setContractsData, setFetchError);
    }, []);

    return (
        <>  
            <div id={ newRequestModalCSSVariables.newRequestId }>
                <div id={ newRequestModalCSSVariables.newRequestInputs }>
                    <div className={ newRequestModalCSSVariables.columnClass }>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Тема</p>
                            <input ref={ themeInputRef } type="text" />
                        </div>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Тип заявки</p>
                            <select ref={ typesSelectRef } >
                                {   types.map(({ title, value }, index) => {
                                        return <option key={ typesKeys[index] } value={ value }>{ title }</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Статус</p>
                            <select ref={ statusesSelectRef } defaultValue={ defaultStatus } disabled={ true }>
                                {   statuses.map(({ title, value }, index) => {
                                        return <option key={ statusesKeys[index] } value={ value }>{ title }</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Приоритет</p>
                            <select ref={ prioritiesSelectRef } >
                                {   priorities.map(({ title, value }, index) => {
                                        return <option key={ prioritiesKeys[index] } value={ value }>{ title }</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Клиент</p>
                            <input ref={ customersInputRef } list={ datalistCustomersLinkId } placeholder={ fetchError || '' } type="text" />
                            <datalist id={ datalistCustomersLinkId }>
                                {   customersData?.map(({ id, first_name, email }) => {
                                        return <option key={ id } value={ `${first_name} ${email}` }></option>
                                    })
                                }
                            </datalist>
                        </div>
                    </div>
                    <div className={ newRequestModalCSSVariables.columnClass }>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Договор</p>
                            <input ref={ contractsInputRef } list={ datalistContractsLinkId } placeholder={ fetchError || '' } type="text" />
                            <datalist id={ datalistContractsLinkId }>
                                {   contractsData?.map((contract, index) => {
                                        return <option key={ index } value={ contract }></option>
                                    })
                                }
                            </datalist>
                        </div>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Ответственный</p>
                            <input ref={ controllersInputRef } list={ datalistControllersLinkId } placeholder={ fetchError || '' } type="text" />
                            <datalist id={ datalistControllersLinkId }>
                                {   employeesData?.map(({ id, first_name, email, appointment }) => {
                                        return <option key={ id } value={ `${first_name} ${email} ${appointment}` }></option>
                                    })
                                }
                            </datalist>
                        </div>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Исполнитель</p>
                            <input ref={ executorsInputRef } list={ datalistExecutorsLinkId } placeholder={ fetchError || '' } type="text" />
                            <datalist id={ datalistExecutorsLinkId }>
                                {   employeesData?.map(({ id, first_name, email, appointment }) => {
                                        return <option key={ id } value={ `${first_name} ${email} ${appointment}` }></option>
                                    })
                                }
                            </datalist>
                        </div>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Файл</p>
                            <button type="button">Прикрепить</button>
                        </div>
                        <div className={ newRequestModalCSSVariables.inputDataClass }>
                            <p>Срок исполнения</p>
                            <input ref={ plannedDateInputRef } type="datetime-local"></input>
                        </div>
                    </div>
                </div>
                <div id={ newRequestModalCSSVariables.newRequestTextarea }>
                    <p>Описание заявки</p>
                    <textarea ref={ descriptionInputRef }></textarea>
                </div>
            </div>
        </>
    );
};

export default NewRequestModal;
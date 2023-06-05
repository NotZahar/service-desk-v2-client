import { IEmployee } from "@/types/models/employee";
import { RefObject } from "react";
import employeeInfoModalCSSVariables from "../styles/components/EmployeeInfoModal.module.scss";

interface EmployeeInfoModalProps {
    employeeInfo: IEmployee | undefined;
    emailInputRef: RefObject<HTMLInputElement>;
    passwordInputRef: RefObject<HTMLInputElement>;
    firstNameInputRef: RefObject<HTMLInputElement>;
    secondNameInputRef: RefObject<HTMLInputElement>;
    patronymicInputRef: RefObject<HTMLInputElement>;
    phoneNumberInputRef:RefObject<HTMLInputElement>;
    appointmentInputRef:RefObject<HTMLInputElement>;
    departmentInputRef:RefObject<HTMLInputElement>;
}

const EmployeeInfoModal: React.FC<EmployeeInfoModalProps> = ({ 
    employeeInfo,
    emailInputRef,
    passwordInputRef,
    firstNameInputRef,
    secondNameInputRef,
    patronymicInputRef,
    phoneNumberInputRef,
    appointmentInputRef,
    departmentInputRef
    }) => {

    return (
        <>  
            <div id={ employeeInfoModalCSSVariables.employeeInfoId }>
                <div className={ employeeInfoModalCSSVariables.inputDataClass }>
                    <p>Email</p>
                    <input ref={ emailInputRef } defaultValue={ employeeInfo?.email } type="text" />
                </div>
                <div className={ employeeInfoModalCSSVariables.inputDataClass }>
                    <p>Пароль</p>
                    <input ref={ passwordInputRef } type="password" />
                </div>
                <div className={ employeeInfoModalCSSVariables.inputDataClass }>
                    <p>Имя</p>
                    <input ref={ firstNameInputRef } defaultValue={ employeeInfo?.first_name } type="text" />
                </div>
                <div className={ employeeInfoModalCSSVariables.inputDataClass }>
                    <p>Фамилия</p>
                    <input ref={ secondNameInputRef } defaultValue={ employeeInfo?.second_name } type="text" />
                </div>
                <div className={ employeeInfoModalCSSVariables.inputDataClass }>
                    <p>Отчество</p>
                    <input ref={ patronymicInputRef } defaultValue={ employeeInfo?.patronymic || '' } type="text" />
                </div>
                <div className={ employeeInfoModalCSSVariables.inputDataClass }>
                    <p>Номер телефона</p>
                    <input ref={ phoneNumberInputRef } defaultValue={ employeeInfo?.phone_number || '' } type="text" />
                </div>
                <div className={ employeeInfoModalCSSVariables.inputDataClass }>
                    <p>Должность</p>
                    <input ref={ appointmentInputRef } defaultValue={ employeeInfo?.appointment } type="text" />
                </div>
                <div className={ employeeInfoModalCSSVariables.inputDataClass }>
                    <p>Отдел</p>
                    <input ref={ departmentInputRef } defaultValue={ employeeInfo?.department } type="text" />
                </div>
                <div className={ employeeInfoModalCSSVariables.inputDataClass }>
                    <p>Роль</p>
                    <input defaultValue={ employeeInfo?.role_name } type="text" readOnly={ true } />
                </div>
            </div>
        </>
    );
};

export default EmployeeInfoModal;
import { EmployeeRole } from "@/helpers/roles";
import useUUID from "@/hooks/useUUID";
import { RefObject } from "react";
import newEmployeeModalCSSVariables from "../styles/components/NewEmployeeModal.module.scss";

interface NewEmployeeModalProps {
    emailInputRef: RefObject<HTMLInputElement>;
    passwordInputRef: RefObject<HTMLInputElement>;
    firstNameInputRef: RefObject<HTMLInputElement>;
    secondNameInputRef: RefObject<HTMLInputElement>;
    patronymicInputRef: RefObject<HTMLInputElement>;
    phoneNumberInputRef: RefObject<HTMLInputElement>;
    departmentInputRef: RefObject<HTMLInputElement>;
    appointmentInputRef: RefObject<HTMLInputElement>;
    roleNameSelectRef: RefObject<HTMLSelectElement>;
}

const NewEmployeeModal: React.FC<NewEmployeeModalProps> = ({ 
    emailInputRef,
    passwordInputRef,
    firstNameInputRef,
    secondNameInputRef,
    patronymicInputRef,
    phoneNumberInputRef,
    departmentInputRef,
    appointmentInputRef,
    roleNameSelectRef
    }) => {

    const roles = Object.entries(EmployeeRole).map((elem) => { 
        return { value: elem[1] } 
    });

    const rolesKeys = useUUID(roles.length);

    return (
        <>  
            <div id={ newEmployeeModalCSSVariables.newEmployeeId }>
                <div id={ newEmployeeModalCSSVariables.newEmployeeInputs }>
                    <div className={ newEmployeeModalCSSVariables.inputDataClass }>
                        <p>Email</p>
                        <input ref={ emailInputRef } type="text" />
                    </div>
                    <div className={ newEmployeeModalCSSVariables.inputDataClass }>
                        <p>Пароль</p>
                        <input ref={ passwordInputRef } type="password" />
                    </div>
                    <div className={ newEmployeeModalCSSVariables.inputDataClass }>
                        <p>Имя</p>
                        <input ref={ firstNameInputRef } type="text" />
                    </div>
                    <div className={ newEmployeeModalCSSVariables.inputDataClass }>
                        <p>Фамилия</p>
                        <input ref={ secondNameInputRef } type="text" />
                    </div>
                    <div className={ newEmployeeModalCSSVariables.inputDataClass }>
                        <p>Отчество (необязательно)</p>
                        <input ref={ patronymicInputRef } type="text" />
                    </div>
                    <div className={ newEmployeeModalCSSVariables.inputDataClass }>
                        <p>Номер телефона (необязательно)</p>
                        <input ref={ phoneNumberInputRef } type="text" />
                    </div>
                    <div className={ newEmployeeModalCSSVariables.inputDataClass }>
                        <p>Отдел</p>
                        <input ref={ departmentInputRef } type="text" />
                    </div>
                    <div className={ newEmployeeModalCSSVariables.inputDataClass }>
                        <p>Должность</p>
                        <input ref={ appointmentInputRef } type="text" />
                    </div>
                    <div className={ newEmployeeModalCSSVariables.inputDataClass }>
                        <p>Роль</p>
                        <select ref={ roleNameSelectRef } >
                            {   roles.map(({ value }, index) => {
                                    return <option key={ rolesKeys[index] } value={ value }>{ value }</option>;
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewEmployeeModal;
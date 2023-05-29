import { ICustomer } from "@/types/models/customer";
import { RefObject } from "react";
import customerInfoModalCSSVariables from "../styles/components/CustomerInfoModal.module.scss";

interface CustomerInfoModalProps {
    customerInfo: ICustomer | undefined;
    emailInputRef: RefObject<HTMLInputElement>;
    passwordInputRef: RefObject<HTMLInputElement>;
    firstNameInputRef: RefObject<HTMLInputElement>;
    secondNameInputRef: RefObject<HTMLInputElement>;
    patronymicInputRef: RefObject<HTMLInputElement>;
    phoneNumberInputRef:RefObject<HTMLInputElement>;
    organizationInputRef:RefObject<HTMLInputElement>;
}

const CustomerInfoModal: React.FC<CustomerInfoModalProps> = ({ 
        customerInfo,
        emailInputRef,
        passwordInputRef,
        firstNameInputRef,
        secondNameInputRef,
        patronymicInputRef,
        phoneNumberInputRef,
        organizationInputRef
    }) => {
    return (
        <>  
            <div id={ customerInfoModalCSSVariables.customerInfoId }>
                <div className={ customerInfoModalCSSVariables.inputDataClass }>
                    <p>Email</p>
                    <input ref={ emailInputRef } defaultValue={ customerInfo?.email } type="text" />
                </div>
                <div className={ customerInfoModalCSSVariables.inputDataClass }>
                    <p>Пароль</p>
                    <input ref={ passwordInputRef } type="password" />
                </div>
                <div className={ customerInfoModalCSSVariables.inputDataClass }>
                    <p>Имя</p>
                    <input ref={ firstNameInputRef } defaultValue={ customerInfo?.first_name } type="text" />
                </div>
                <div className={ customerInfoModalCSSVariables.inputDataClass }>
                    <p>Фамилия</p>
                    <input ref={ secondNameInputRef } defaultValue={ customerInfo?.second_name } type="text" />
                </div>
                <div className={ customerInfoModalCSSVariables.inputDataClass }>
                    <p>Отчество</p>
                    <input ref={ patronymicInputRef } defaultValue={ customerInfo?.patronymic || '' } type="text" />
                </div>
                <div className={ customerInfoModalCSSVariables.inputDataClass }>
                    <p>Номер телефона</p>
                    <input ref={ phoneNumberInputRef } defaultValue={ customerInfo?.phone_number || '' } type="text" />
                </div>
                <div className={ customerInfoModalCSSVariables.inputDataClass }>
                    <p>Организация</p>
                    <input ref={ organizationInputRef } defaultValue={ customerInfo?.organization || '' } type="text" />
                </div>
            </div>
        </>
    );
};

export default CustomerInfoModal;
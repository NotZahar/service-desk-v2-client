import { RefObject } from "react";
import newCustomerModalCSSVariables from "../styles/components/NewCustomerModal.module.scss";

interface NewCustomerModalProps {
    emailInputRef: RefObject<HTMLInputElement>;
    passwordInputRef: RefObject<HTMLInputElement>;
    firstNameInputRef: RefObject<HTMLInputElement>;
    secondNameInputRef: RefObject<HTMLInputElement>;
    patronymicInputRef: RefObject<HTMLInputElement>;
    phoneNumberInputRef: RefObject<HTMLInputElement>;
    organizationInputRef: RefObject<HTMLInputElement>;
}

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({ 
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
            <div id={ newCustomerModalCSSVariables.newCustomerId }>
                <div id={ newCustomerModalCSSVariables.newCustomerInputs }>
                    <div className={ newCustomerModalCSSVariables.inputDataClass }>
                        <p>Email</p>
                        <input ref={ emailInputRef } type="text" />
                    </div>
                    <div className={ newCustomerModalCSSVariables.inputDataClass }>
                        <p>Пароль</p>
                        <input ref={ passwordInputRef } type="password" />
                    </div>
                    <div className={ newCustomerModalCSSVariables.inputDataClass }>
                        <p>Имя</p>
                        <input ref={ firstNameInputRef } type="text" />
                    </div>
                    <div className={ newCustomerModalCSSVariables.inputDataClass }>
                        <p>Фамилия</p>
                        <input ref={ secondNameInputRef } type="text" />
                    </div>
                    <div className={ newCustomerModalCSSVariables.inputDataClass }>
                        <p>Отчество</p>
                        <input ref={ patronymicInputRef } type="text" />
                    </div>
                    <div className={ newCustomerModalCSSVariables.inputDataClass }>
                        <p>Номер телефона</p>
                        <input ref={ phoneNumberInputRef } type="text" />
                    </div>
                    <div className={ newCustomerModalCSSVariables.inputDataClass }>
                        <p>Организация</p>
                        <input ref={ organizationInputRef } type="text" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewCustomerModal;
import Modal from "@/components/Modal";
import { ifEmptyToNull, toStringArray } from "@/helpers/transform";
import { useActions } from "@/hooks/useActions";
import AuthLayout from "@/layouts/AuthLayout";
import { basePath } from "@/server-config";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import customerRegistrationCSSVariables from "../../styles/pages/customer-registration.module.scss";

const CustomerRegistration = () => {
    const router = useRouter();
    const { setUserChoice } = useActions();
    const [errorsVisible, setErrorsVisible] = useState<boolean>(false);
    const [successVisible, setSuccessVisible] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>();
    
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const secondNameInputRef = useRef<HTMLInputElement>(null);
    const patronymicInputRef = useRef<HTMLInputElement>(null);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const organizationInputRef = useRef<HTMLInputElement>(null);

    const registerCustomer = async () => {
        try {
            await axios.post(`${basePath}/auth/registration-customer`, {
                email: ifEmptyToNull(emailInputRef.current?.value),
                password: ifEmptyToNull(passwordInputRef.current?.value),
                first_name: ifEmptyToNull(firstNameInputRef.current?.value),
                second_name: ifEmptyToNull(secondNameInputRef.current?.value),
                patronymic: ifEmptyToNull(patronymicInputRef.current?.value),
                phone_number: ifEmptyToNull(phoneNumberInputRef.current?.value),
                organization: ifEmptyToNull(organizationInputRef.current?.value)
            });

            setSuccessVisible((prev) => !prev);
        } catch (err) {
            setErrorMessages(err instanceof AxiosError 
                ? (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible((prev) => !prev);
        }
    };

    const cancelRegistration = () => {
        setUserChoice('none');
        router.push('/auth/choice');
    };

    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Регистрация"
                    inputs={[ 
                        { label: 'email (обязательное поле)', ref: emailInputRef },
                        { label: 'пароль (обязательное поле)', ref: passwordInputRef },
                        { label: 'имя (обязательное поле)', ref: firstNameInputRef },
                        { label: 'фамилия (обязательное поле)', ref: secondNameInputRef },
                        { label: 'отчество', ref: patronymicInputRef },
                        { label: 'номер телефона', ref: phoneNumberInputRef },
                        { label: 'организация', ref: organizationInputRef }
                    ]}
                    buttons={[
                        { id: customerRegistrationCSSVariables.registerButtonId, text: 'Зарегистрироваться', onClick: registerCustomer },
                        { id: customerRegistrationCSSVariables.cancelButtonId, text: 'Отмена', onClick: cancelRegistration }
                    ]}>
                </Modal>
                
                {   errorsVisible && 
                    <Modal 
                        title="Ошибка!"
                        buttons={[
                            { text: 'Закрыть', onClick: () => setErrorsVisible((prev) => !prev) }
                        ]}
                        errors={ errorMessages && errorMessages.map((msg) => { return { text: msg }; }) } />
                }   

                {   successVisible && 
                    <Modal 
                        title="Регистрация прошла успешно!"
                        buttons={[ {   text: 'Закрыть', onClick: () => { router.push('/auth'); } } ]}
                        widthFitContent={ true } />
                }  
            </AuthLayout>
        </>
    );
};

export default CustomerRegistration;
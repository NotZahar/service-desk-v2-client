import Modal from "@/components/Modal";
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
            const response = await axios.post(`${basePath}/auth/registration-customer`, {
                email: emailInputRef.current?.value,
                password: passwordInputRef.current?.value,
                first_name: firstNameInputRef.current?.value,
                second_name: secondNameInputRef.current?.value,
                patronymic: patronymicInputRef.current?.value,
                phone_number: phoneNumberInputRef.current?.value,
                organization: organizationInputRef.current?.value
            });
            console.log(response);
            // router.push('/auth'); // TODO: here
        } catch (err) {
            setErrorMessages(err instanceof AxiosError 
                ? (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible((prev) => !prev);
        }
    };

    const toStringArray = (data: any) => {
        if (Array.isArray(data) && data.every((v) => { return typeof v === 'string' })) {
            return data;
        } else if ('message' in data) {
            return [ data.message ]
        }

        return [ '' ];
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
                        { label: 'email', ref: emailInputRef },
                        { label: 'пароль', ref: passwordInputRef },
                        { label: 'имя', ref: firstNameInputRef },
                        { label: 'фамилия', ref: secondNameInputRef },
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
            </AuthLayout>
        </>
    );
};

export default CustomerRegistration;
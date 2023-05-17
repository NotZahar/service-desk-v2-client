import Modal from "@/components/Modal";
import { AuthErrorMessage } from "@/errors/auth-errors";
import { ifEmptyToNull, toStringArray } from "@/helpers/transform";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import AuthLayout from "@/layouts/AuthLayout";
import { basePath, storageAuthTokenName } from "@/server-config";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import authCSSVariables from "../../styles/pages/auth.module.scss";

const Index = () => {
    const router = useRouter();
    const { setUserChoice } = useActions();
    const { userChoice } = useTypedSelector(state => state.authReducer);
    const [errorMessages, setErrorMessages] = useState<string[]>();
    const [errorsVisible, setErrorsVisible] = useState<boolean>(false);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const enter = async () => {
        try {
            switch (userChoice) {
                case 'customer':
                    const response = await axios.post(`${basePath}/auth/login-customer`, {
                        email: ifEmptyToNull(emailInputRef.current?.value),
                        password: ifEmptyToNull(passwordInputRef.current?.value)
                    });
        
                    localStorage.setItem(storageAuthTokenName, response.data);
                    router.push('/customer-portal');
                    break;
                case 'employee': 
                    // TODO:
                    
                    break;
                case 'none':
                    setErrorMessages([ AuthErrorMessage.NoRole ]);
                    setErrorsVisible((prev) => !prev);
                    break;
            }
        } catch (err) {
            setErrorMessages(err instanceof AxiosError 
                ? (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible((prev) => !prev);
        }
    };

    const back = () => {
        setUserChoice('none');
        router.push('/auth/choice');
    };

    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Вход"
                    inputs={ [ 
                        { label: 'email', ref: emailInputRef }, 
                        { label: 'пароль', ref: passwordInputRef } 
                    ] } 
                    buttons={ [ 
                        { id: authCSSVariables.enterButtonId, text: 'Войти', onClick: enter }, 
                        { id: authCSSVariables.backButtonId, text: 'Назад', onClick: back } 
                    ] } />
                
                {   errorsVisible && 
                    <Modal 
                        title="Ошибка!"
                        errors={ errorMessages && errorMessages.map((msg) => { return { text: msg }; }) }
                        buttons={[
                            { text: 'Закрыть', onClick: () => setErrorsVisible((prev) => !prev) }
                        ]} />
                }
            </AuthLayout>
        </>
    );
};

export default Index;
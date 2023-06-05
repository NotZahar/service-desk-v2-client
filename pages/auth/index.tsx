import Modal from "@/components/Modal";
import { AuthErrorMessage } from "@/errors/auth-errors";
import { baseServerPath } from "@/helpers/paths";
import { ifEmptyToNull, toStringArray } from "@/helpers/transform";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import AuthLayout from "@/layouts/AuthLayout";
import { authSlice } from "@/store/reducers/AuthSlice";
import { userSlice } from "@/store/reducers/UserSlice";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import authCSSVariables from "../../styles/pages/auth.module.scss";

const Index = () => {
    const router = useRouter();
    
    const { setToken, authReset } = authSlice.actions;
    const { setUser } = userSlice.actions;
    const { userChoice } = useTypedSelector(state => state.authReducer);
    const dispatch = useTypedDispatch();

    const [errorMessages, setErrorMessages] = useState<string[]>();
    const [errorsVisible, setErrorsVisible] = useState<boolean>(false);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const enter = async () => {
        try {
            switch (userChoice) {
            case 'customer': {
                const response = await axios.post(`${baseServerPath}/auth/login-customer`, {
                    email: ifEmptyToNull(emailInputRef.current?.value),
                    password: ifEmptyToNull(passwordInputRef.current?.value)
                });
    
                dispatch(setToken(response.data.token));
                dispatch(setUser({ 
                    id: response.data.id, 
                    name: response.data.name,
                    role: response.data.role,
                    email: response.data.email
                }));
                router.push('/customer');
                break;
            } case 'employee': {
                const response = await axios.post(`${baseServerPath}/auth/login-employee`, {
                    email: ifEmptyToNull(emailInputRef.current?.value),
                    password: ifEmptyToNull(passwordInputRef.current?.value)
                });
    
                dispatch(setToken(response.data.token));
                dispatch(setUser({ 
                    id: response.data.id, 
                    name: response.data.name,
                    role: response.data.role,
                    email: response.data.email
                }));
                router.push(`/${response.data.role}`);
                break;
            } case 'none': {
                setErrorMessages([ AuthErrorMessage.NoRole ]);
                setErrorsVisible((prev) => !prev);
                break;
            }
            }
        } catch (err) {
            setErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible((prev) => !prev);
        }
    };

    const back = () => {
        dispatch(authReset());
        router.push('/auth/choice');
    };

    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Вход"
                    inputs={ [ 
                        { label: 'email', type: 'text', ref: emailInputRef }, 
                        { label: 'пароль', type: 'password', ref: passwordInputRef } 
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
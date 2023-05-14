import Modal from "@/components/Modal";
import AuthLayout from "@/layouts/AuthLayout";
import customerRegistrationCSSVariables from "../../styles/pages/customer-registration.module.scss";

const CustomerRegistration = () => {
    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Регистрация"
                    inputs={[
                        { 
                            id: '',
                            className: '',
                            label: 'email' 
                        },
                        {
                            id: '',
                            className: '',
                            label: 'пароль'
                        },
                        {
                            id: '',
                            className: '',
                            label: 'имя'
                        },
                        {
                            id: '',
                            className: '',
                            label: 'фамилия'
                        },
                        {
                            id: '',
                            className: '',
                            label: 'отчество'
                        },
                        {
                            id: '',
                            className: '',
                            label: 'номер телефона'
                        },
                        {
                            id: '',
                            className: '',
                            label: 'организация'
                        }
                    ]}
                    buttons={[
                        {
                            id: customerRegistrationCSSVariables.registerButtonId,
                            className: '',
                            text: 'Зарегистрироваться'
                        },
                        {
                            id: customerRegistrationCSSVariables.cancelButtonId,
                            className: '',
                            text: 'Отмена'
                        }
                    ]}
                    show={ true } />   
            </AuthLayout>
        </>
    );
};

export default CustomerRegistration;
import Modal from "@/components/Modal";
import AuthLayout from "@/layouts/AuthLayout";
// import CSSVariables from "../../styles/pages/Auth.module.scss";

const Index = () => {
    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Вход"
                    inputs={ [
                        { 
                            id: '1',
                            className: 'modal-input',
                            label: 'email' 
                        }, 
                        {
                            id: '2',
                            className: 'modal-input',
                            label: 'пароль' 
                        }
                    ] } 
                    buttons={ [
                        { 
                            id: '3',
                            className: '4',
                            text: 'Войти' 
                        }
                    ] }
                    show={ true } />
            </AuthLayout>
        </>
    );
};

export default Index;
import Modal from "@/components/Modal";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/router";
import customerChoiceCSSVariables from "../../styles/pages/customer-choice.module.scss";

const CustomerChoice = () => {
    const router = useRouter();

    const yes = () => { router.push('/auth'); };
    const no = () => { router.push('/auth/customer-registration'); };

    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Вы зарегистрированы?"
                    buttons={ [
                        { id: customerChoiceCSSVariables.yesButtonId, className: customerChoiceCSSVariables.choiceButtons, text: 'Да', onClick: yes },
                        { id: customerChoiceCSSVariables.noButtonId, className: customerChoiceCSSVariables.choiceButtons, text: 'Нет', onClick: no }
                    ] } 
                    widthFitContent={ true } />   
            </AuthLayout>
        </>
    );
};

export default CustomerChoice;
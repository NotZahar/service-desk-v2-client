import Modal from "@/components/Modal";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import customerChoiceCSSVariables from "../../styles/pages/customer-choice.module.scss";
import modalCSSVariables from "../../styles/components/Modal.module.scss";

const CustomerChoice = () => {
    const router = useRouter();

    const yes = () => { router.push('/auth'); };
    const no = () => { router.push('/auth/customer-registration'); };

    useEffect(() => {
        document.getElementById(modalCSSVariables.modalContentId)!.style.width = 'fit-content';
    });

    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Вы зарегистрированы?"
                    buttons={ [
                        { id: customerChoiceCSSVariables.yesButtonId, className: customerChoiceCSSVariables.choiceButtons, text: 'Да', onClick: yes },
                        { id: customerChoiceCSSVariables.noButtonId, className: customerChoiceCSSVariables.choiceButtons, text: 'Нет', onClick: no }
                    ] } />   
            </AuthLayout>
        </>
    );
};

export default CustomerChoice;
import Modal from "@/components/Modal";
import AuthLayout from "@/layouts/AuthLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import customerChoiceCSSVariables from "../../styles/pages/customer-choice.module.scss";
import modalCSSVariables from "../../styles/components/Modal.module.scss";

const CustomerChoice = () => {
    const router = useRouter();

    useEffect(() => {
        document.getElementById(modalCSSVariables.modalContentId)!.style.width = 'fit-content';
        document.getElementById(customerChoiceCSSVariables.yesButtonId)!.onclick = () => { router.push('/auth'); };
        document.getElementById(customerChoiceCSSVariables.noButtonId)!.onclick = () => { router.push('/auth/customer-registration'); };
    });

    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Вы зарегистрированы?"
                    buttons={ [
                        { 
                            id: customerChoiceCSSVariables.yesButtonId,
                            className: customerChoiceCSSVariables.choiceButtons,
                            text: 'Да' 
                        },
                        {
                            id: customerChoiceCSSVariables.noButtonId,
                            className: customerChoiceCSSVariables.choiceButtons,
                            text: 'Нет'
                        }
                    ] }
                    show={ true } />   
            </AuthLayout>
        </>
    );
};

export default CustomerChoice;
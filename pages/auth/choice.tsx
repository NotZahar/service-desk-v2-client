import Modal from "@/components/Modal";
import { useActions } from "@/hooks/useActions";
import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import choiceCSSVariables from "../../styles/pages/choice.module.scss";

const Choice = () => {
    const router = useRouter();
    const { setUserChoice } = useActions();

    const employeeSelected = () => {
        setUserChoice('employee');
        router.push('/auth');
    };

    const customerSelected = () => {
        setUserChoice('customer');
        router.push('/auth/customer-choice');
    };

    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Вы...">
                    <div id={ choiceCSSVariables.choiceId }>
                        <div id={ choiceCSSVariables.employeeId } className={ choiceCSSVariables.choiceClass } onClick={ employeeSelected }>
                            <Image src="/employeeIcon.png" alt="Employee" />
                            <p>сотрудник</p>
                        </div>
                        <div id={ choiceCSSVariables.customerId } className={ choiceCSSVariables.choiceClass } onClick={ customerSelected }>
                            <Image src="/customerIcon.png" alt="Customer" />
                            <p>клиент</p>
                        </div>
                    </div>
                </Modal>
            </AuthLayout>
        </>
    );
};

export default Choice;
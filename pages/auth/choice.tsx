import Modal from "@/components/Modal";
import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import CSSVariables from "../../styles/pages/Choice.module.scss";

const Choice = () => {
    const router = useRouter();

    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Вы..."
                    show={ true }>
                    <div id={ CSSVariables.choiceId }>
                        <div id={ CSSVariables.employeeId } className={ CSSVariables.choiceClass } onClick={ () => router.push('/auth') }>
                            <Image
                                src="/employeeIcon.png"
                                alt="Employee" />
                            <p>сотрудник</p>
                        </div>
                        <div id={ CSSVariables.customerId } className={ CSSVariables.choiceClass }>
                            <Image
                                src="/customerIcon.png"
                                alt="Customer" />
                            <p>клиент</p>
                        </div>
                    </div>
                </Modal>
            </AuthLayout>
        </>
    );
};

export default Choice;
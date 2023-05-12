import Modal from "@/components/Modal";
import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";
import CSSVariables from "../../styles/pages/Choice.module.scss";

const Choice = () => {
    return (
        <>
            <AuthLayout>
                <Modal 
                    title="Вы..."
                    show={ true }>
                    <div id={ CSSVariables.choiceId }>
                        <div id={ CSSVariables.employeeId } className={ CSSVariables.choiceClass }>
                            <Image
                                src="/employee.png"
                                alt="Employee" />
                            <p>сотрудник</p>
                        </div>
                        <div id={ CSSVariables.customerId } className={ CSSVariables.choiceClass }>
                            <Image
                                src="/customer.png"
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
import CustomerInfoModal from "@/components/CustomerInfoModal";
import Modal from "@/components/Modal";
import NewCustomerModal from "@/components/NewCustomerModal";
import WorkWithCustomers from "@/components/WorkWithCustomers";
import { baseServerPath } from "@/helpers/paths";
import { ifEmptyToNull, toStringArray } from "@/helpers/transform";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import { currentCustomerSlice } from "@/store/reducers/CurrentCustomerSlice";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import customersCSSVariables from "../../styles/pages/dispatcher-customers.module.scss";

const Customers = () => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { currentCustomer } = useTypedSelector(state => state.currentCustomerReducer);

    const { resetCustomer } = currentCustomerSlice.actions;

    const [customerOpened, setCustomerOpened] = useState(false);
    const [newCustomerOpened, setNewCustomerOpened] = useState(false);
    const [newCustomerErrorsVisible, setNewCustomerErrorsVisible] = useState(false);
    const [customerErrorsVisible, setCustomerErrorsVisible] = useState(false);
    const [customerErrorMessages, setCustomerErrorMessages] = useState<string[]>();
    const [newCustomerErrorMessages, setNewCustomerErrorMessages] = useState<string[]>();
    const [refreshCustomersTrigger, setRefreshCustomersTrigger] = useState(false);

    const dispatch = useTypedDispatch();

    const newEmailInputRef = useRef<HTMLInputElement>(null);
    const newPasswordInputRef = useRef<HTMLInputElement>(null);
    const newFirstNameInputRef = useRef<HTMLInputElement>(null);
    const newSecondNameInputRef = useRef<HTMLInputElement>(null);
    const newPatronymicInputRef = useRef<HTMLInputElement>(null);
    const newPhoneNumberInputRef = useRef<HTMLInputElement>(null);
    const newOrganizationInputRef = useRef<HTMLInputElement>(null);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const secondNameInputRef = useRef<HTMLInputElement>(null);
    const patronymicInputRef = useRef<HTMLInputElement>(null);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const organizationInputRef = useRef<HTMLInputElement>(null);


    const createNewCustomerWindow = () => {
        setNewCustomerOpened(prev => !prev);
    };

    const createNewCustomer = async () => {
        try {
            await axios.post(`${baseServerPath}/auth/registration-customer`, {
                email: ifEmptyToNull(newEmailInputRef.current?.value),
                password: ifEmptyToNull(newPasswordInputRef.current?.value),
                first_name: ifEmptyToNull(newFirstNameInputRef.current?.value),
                second_name: ifEmptyToNull(newSecondNameInputRef.current?.value),
                patronymic: ifEmptyToNull(newPatronymicInputRef.current?.value),
                phone_number: ifEmptyToNull(newPhoneNumberInputRef.current?.value),
                organization: ifEmptyToNull(newOrganizationInputRef.current?.value)
            }, {
                headers: {
                    Authorization: token
                }
            });
            
            setRefreshCustomersTrigger(prev => !prev);
            setNewCustomerOpened(prev => !prev);
        } catch (err) {
            setNewCustomerErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setNewCustomerErrorsVisible(prev => !prev);
        }
    }

    const cancelNewCustomer = () => {
        setNewCustomerOpened(prev => !prev);
    };

    const openCustomerInfo = () => {
        setCustomerOpened(prev => !prev);
    };

    const cancelCustomer = () => {
        dispatch(resetCustomer());
        setCustomerOpened(prev => !prev);
    };

    const changeCustomer = async () => {
        try {
            await axios.put(`${baseServerPath}/customers`, {
                id: currentCustomer?.id,
                email: ifEmptyToNull(emailInputRef.current?.value),
                password: ifEmptyToNull(passwordInputRef.current?.value),
                first_name: ifEmptyToNull(firstNameInputRef.current?.value),
                second_name: ifEmptyToNull(secondNameInputRef.current?.value),
                patronymic: ifEmptyToNull(patronymicInputRef.current?.value),
                phone_number: ifEmptyToNull(phoneNumberInputRef.current?.value),
                organization: ifEmptyToNull(organizationInputRef.current?.value)
            }, {
                headers: {
                    Authorization: token
                }
            });

            dispatch(resetCustomer());
            setCustomerOpened(prev => !prev);
            setRefreshCustomersTrigger(prev => !prev);
        } catch (err) {
            setCustomerErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setCustomerErrorsVisible(true);
        }
    };

    return (
        <>
            <DispatcherLayout>
                <div id={ customersCSSVariables.mainContentId }>
                    <div id={ customersCSSVariables.topPanelId }>
                        <div id={ customersCSSVariables.newCustomerBtnId } onClick={ createNewCustomerWindow } >
                            <p>Новый клиент</p>
                        </div>
                        {   newCustomerOpened &&
                            <Modal
                                buttons={[
                                    { text: 'Создать', onClick: createNewCustomer },
                                    { text: 'Отмена', id: customersCSSVariables.cancelBtnId, onClick: cancelNewCustomer }
                                ]}
                                widthFitContent={ true } >
                                <NewCustomerModal 
                                    emailInputRef={ newEmailInputRef }
                                    passwordInputRef={ newPasswordInputRef }
                                    firstNameInputRef={ newFirstNameInputRef }
                                    secondNameInputRef={ newSecondNameInputRef }
                                    patronymicInputRef={ newPatronymicInputRef }
                                    phoneNumberInputRef={ newPhoneNumberInputRef }
                                    organizationInputRef={ newOrganizationInputRef } />
                            </Modal>
                        }
                        {   newCustomerErrorsVisible &&
                                <Modal
                                    title="Ошибка!"
                                    errors={ newCustomerErrorMessages && newCustomerErrorMessages.map((msg) => { return { text: msg }; }) }
                                    buttons={[
                                        { text: 'Закрыть', onClick: () => { setNewCustomerErrorsVisible(prev => !prev) } }
                                    ]} />
                        }
                    </div>
                    <div id={ customersCSSVariables.customersId }>
                        <WorkWithCustomers 
                            leftClickAppealHandler={ openCustomerInfo }
                            refreshCustomersTrigger={ refreshCustomersTrigger } />
                        {   customerOpened &&
                            <Modal
                                buttons={[ 
                                    { text: 'Закрыть', onClick: cancelCustomer },
                                    { text: 'Изменить данные', id: customersCSSVariables.changeBtnId, onClick: changeCustomer }
                                ]}
                                widthFitContent={ true } >
                                <CustomerInfoModal
                                    customerInfo={ currentCustomer }
                                    emailInputRef={ emailInputRef }
                                    passwordInputRef={ passwordInputRef }
                                    firstNameInputRef={ firstNameInputRef }
                                    secondNameInputRef={ secondNameInputRef }
                                    patronymicInputRef={ patronymicInputRef }
                                    phoneNumberInputRef={ phoneNumberInputRef }
                                    organizationInputRef={ organizationInputRef } />
                            </Modal>
                        }
                        {   customerErrorsVisible &&
                            <Modal
                                title="Ошибка!"
                                errors={ customerErrorMessages && customerErrorMessages.map((msg) => { return { text: msg }; }) }
                                buttons={[
                                    { text: 'Закрыть', onClick: () => { setCustomerErrorsVisible(prev => !prev) } }
                                ]} />
                        }
                    </div>
                </div>
            </DispatcherLayout>
        </>
    );
};

export default Customers;
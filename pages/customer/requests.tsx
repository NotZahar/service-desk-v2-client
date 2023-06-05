import AppealInfoModal from "@/components/AppealInfoModal";
import Modal from "@/components/Modal";
import { ifEmptyToNull } from "@/helpers/transform";
import { baseServerPath } from "@/helpers/paths";
import { toStringArray } from "@/helpers/transform";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { currentAppealSlice } from "@/store/reducers/CurrentAppealSlice";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import requestsCSSVariables from "../../styles/pages/dispatcher-requests.module.scss";
import { useRouter } from "next/router";
import { userCustomerMessagesSlice } from "@/store/reducers/UserCustomerMessagesSlice";
import CustomerLayout from "@/layouts/CustomerLayout";
import NewAppealModal from "@/components/NewAppealModal";
import WorkWithAppealsCustomer from "@/components/WorkWithAppealsCustomer";
import WorkWithRequestsCustomer from "@/components/WorkWithRequestsCustomer";
import CustomerInfo from "@/components/CustomerInfo";

const Requests = () => {
    const router = useRouter();
    
    const { resetAppeal } = currentAppealSlice.actions;
    const { resetUserCustomerMessages } = userCustomerMessagesSlice.actions;
    const { user } = useTypedSelector(state => state.userReducer);
    const { currentAppeal } = useTypedSelector(state => state.currentAppealReducer);
    const { token } = useTypedSelector(state => state.authReducer);
    const dispatch = useTypedDispatch();

    const themeInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

    const [appealOpened, setAppealOpened] = useState(false);
    const [newAppealOpened, setNewAppealOpened] = useState(false);
    const [newAppealErrorsVisible, setNewAppealErrorsVisible] = useState(false);
    const [newAppealErrorMessages, setNewAppealErrorMessages] = useState<string[]>();
    const [refreshAppealsTrigger, setRefreshAppealsTrigger] = useState(false);

    const openAppeal = () => {
        setAppealOpened(prev => !prev);
    };

    const cancelAppeal = () => {
        dispatch(resetAppeal());
        setAppealOpened(prev => !prev);
    };

    const openRequest = () => {
        dispatch(resetUserCustomerMessages());
        router.push('/customer/request-view');
    };

    const createNewAppealWindow = () => {
        setNewAppealOpened(prev => !prev);
    };

    const createNewAppeal = async () => {
        try {
            await axios.post(`${baseServerPath}/appeals`, {
                theme: ifEmptyToNull(themeInputRef.current?.value),
                text: ifEmptyToNull(descriptionInputRef.current?.value),
                file: null,
                customer_id: user?.id
            }, {
                headers: {
                    Authorization: token
                }
            });
            
            setRefreshAppealsTrigger(prev => !prev);
            setNewAppealOpened(prev => !prev);
        } catch (err) {
            setNewAppealErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setNewAppealErrorsVisible(true);
        }
    }

    const cancelNewAppeal = () => {
        setNewAppealOpened(prev => !prev);
    };

    return (
        <>
            <CustomerLayout>
                <div id={ requestsCSSVariables.mainContentId }>
                    <div id={ requestsCSSVariables.topPanelId }>
                        <div id={ requestsCSSVariables.newRequestBtnId } onClick={ createNewAppealWindow } >
                            <p>Новое обращение</p>
                        </div>
                        <CustomerInfo />
                        {   newAppealOpened &&
                            <Modal
                                buttons={[
                                    { text: 'Создать', onClick: createNewAppeal },
                                    { text: 'Отмена', id: requestsCSSVariables.cancelBtnId, onClick: cancelNewAppeal }
                                ]}
                                widthFitContent={ true } >
                                <NewAppealModal 
                                    themeInputRef={ themeInputRef }
                                    descriptionInputRef={ descriptionInputRef } />
                            </Modal>
                        }
                        {   newAppealErrorsVisible &&
                                <Modal
                                    title="Ошибка!"
                                    errors={ newAppealErrorMessages && newAppealErrorMessages.map((msg) => { return { text: msg }; }) }
                                    buttons={[
                                        { text: 'Закрыть', onClick: () => { setNewAppealErrorsVisible(prev => !prev) } }
                                    ]} />
                        }
                    </div>
                    <div id={ requestsCSSVariables.appealsAndRequestsId }>
                        <div id={ requestsCSSVariables.appealsId }>
                            <WorkWithAppealsCustomer 
                                leftClickAppealHandler={ openAppeal }
                                refreshAppealsTrigger={ refreshAppealsTrigger } />
                            {   appealOpened &&
                                <Modal
                                    buttons={[ 
                                        { text: 'Закрыть', onClick: cancelAppeal }
                                    ]}
                                    widthFitContent={ true } >
                                    <AppealInfoModal appealInfo={ currentAppeal } />
                                </Modal>
                            }
                        </div>
                        <div id={ requestsCSSVariables.requestsId }>
                            <WorkWithRequestsCustomer
                                leftClickAppealHandler={ openRequest } />
                        </div>
                    </div>
                </div>
            </CustomerLayout>
        </>
    );
};

export default Requests;
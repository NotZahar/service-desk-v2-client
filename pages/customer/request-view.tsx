import Chat from "@/components/Chat";
import Modal from "@/components/Modal";
import RequestInfoImmutable from "@/components/RequestInfoImmutable";
import { CustomerErrorMessage } from "@/errors/customer-errors";
import { baseServerPath } from "@/helpers/paths";
import { RequestStatus } from "@/helpers/request-statuses";
import { toStringArray } from "@/helpers/transform";
import { updateChatIntervalTime } from "@/helpers/update-data";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import CustomerLayout from "@/layouts/CustomerLayout";
import { userCustomerMessagesSlice } from "@/store/reducers/UserCustomerMessagesSlice";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import requestViewCSSVariables from "../../styles/pages/customer-request-view.module.scss";

const RequestView = () => {
    const router = useRouter();

    const { setUserCustomerMessagesSuccess, setUserCustomerMessagesError, resetUserCustomerMessages } = userCustomerMessagesSlice.actions;
    const { currentRequest } = useTypedSelector(state => state.currentRequestReducer);
    const { token } = useTypedSelector(state => state.authReducer);
    const { user } = useTypedSelector(state => state.userReducer);
    const dispatch = useTypedDispatch();

    const [errorsVisible, setErrorsVisible] = useState(false);
    const [errorsMessages, setErrorsMessages] = useState<string[]>();
    const [updateMessages, setUpdateMessages] = useState<boolean>(false);

    const textfieldCustomerRef = useRef<HTMLTextAreaElement>(null);

    const back = () => {
        dispatch(resetUserCustomerMessages());
        router.push('/customer/requests');
    }

    const fetchCustomerMessages = () => {
        fetch(`${baseServerPath}/user-customer-messages/${currentRequest?.id}`, {
            headers: { Authorization: token || '' }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setUserCustomerMessagesSuccess(data));
            setUpdateMessages(prev => !prev);
        })
        .catch(err => {
            dispatch(setUserCustomerMessagesError(String(err)));
        });
    };

    const sendCustomerHandler = async () => {
        if (currentRequest?.status_name !== RequestStatus.AT_WORK) {
            setErrorsMessages([ CustomerErrorMessage.CantSendMessageForNotAtWorkRequest ]);
            setErrorsVisible(prev => !prev);
            return;
        }
        
        try {
            await axios.post(`${baseServerPath}/user-customer-messages`, {
                file: null,
                text: textfieldCustomerRef.current?.value,
                employee_id: null,
                customer_id: user?.id,
                request_id: currentRequest?.id
            }, {
                headers: {
                    Authorization: token
                }
            });

            fetchCustomerMessages();
            if (textfieldCustomerRef.current) textfieldCustomerRef.current.value = '';
        } catch (err) {
            setErrorsMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible(prev => !prev);
        }
    };

    useEffect(() => {
        fetchCustomerMessages();

        const interval = setInterval(() => { 
            fetchCustomerMessages();
        }, updateChatIntervalTime);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <CustomerLayout>
                <div id={ requestViewCSSVariables.mainContentId }>
                    <div id={ requestViewCSSVariables.mainColumnId }>
                        <div id={ requestViewCSSVariables.backPanelId } onClick={ back }>
                            <p>&#129144;</p>
                        </div>
                        <div id={ requestViewCSSVariables.requestInfoId }>
                            <RequestInfoImmutable isNotForCustomer={ false } />
                        </div>
                        <div id={ requestViewCSSVariables.chatsId }>
                            <div className={ requestViewCSSVariables.chatClass } >
                                <Chat 
                                    type={ 'customer' } 
                                    textfieldRef={ textfieldCustomerRef } 
                                    chatName={ 'Чат с диспетчером' } 
                                    sendHandler={ sendCustomerHandler }
                                    updateMessages={ updateMessages } />
                            </div>
                        </div>
                    </div>
                </div>
                {   errorsVisible &&
                    <Modal
                        title="Ошибка!"
                        errors={ errorsMessages && errorsMessages.map((msg) => { return { text: msg }; }) }
                        buttons={[
                            { text: 'Закрыть', onClick: () => { setErrorsVisible(prev => !prev) } }
                        ]} />
                }
            </CustomerLayout>
        </>
    );
};

export default RequestView;
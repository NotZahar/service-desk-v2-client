import Chat from "@/components/Chat";
import Modal from "@/components/Modal";
import RequestInfoImmutable from "@/components/RequestInfoImmutable";
import RequestInfoMutable from "@/components/RequestInfoMutable";
import { baseServerPath } from "@/helpers/paths";
import { toStringArray } from "@/helpers/transform";
import { updateChatIntervalTime } from "@/helpers/update-data";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import { userCustomerMessagesSlice } from "@/store/reducers/UserCustomerMessagesSlice";
import { userInnerMessagesSlice } from "@/store/reducers/UserInnerMessagesSlice";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import requestViewCSSVariables from "../../styles/pages/dispatcher-request-view.module.scss";

interface RequestViewProps {

}

const RequestView: React.FC<RequestViewProps> = () => {
    const { setUserCustomerMessagesSuccess, setUserCustomerMessagesError } = userCustomerMessagesSlice.actions;
    const { setUserInnerMessagesSuccess, setUserInnerMessagesError } = userInnerMessagesSlice.actions;
    const { currentRequest } = useTypedSelector(state => state.currentRequestReducer);
    const { token } = useTypedSelector(state => state.authReducer);
    const { user } = useTypedSelector(state => state.userReducer);
    const dispatch = useTypedDispatch();

    const [errorsVisible, setErrorsVisible] = useState(false);
    const [errorsMessages, setErrorsMessages] = useState<string[]>();

    const textfieldCustomerRef = useRef<HTMLTextAreaElement>(null); 
    const textfieldInnerRef = useRef<HTMLTextAreaElement>(null); 

    const sendCustomerHandler = async () => {
        try {
            await axios.post(`${baseServerPath}/user-customer-messages`, {                
                file: null,
                text: textfieldCustomerRef.current?.value,
                employee_id: user?.id,
                customer_id: null,
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

    const sendInnerHandler = async () => {
        try {
            await axios.post(`${baseServerPath}/user-inner-messages`, {                
                file: null,
                text: textfieldInnerRef.current?.value,
                employee_id: user?.id,
                request_id: currentRequest?.id
            }, {
                headers: {
                    Authorization: token
                }
            });

            fetchInnerMessages();
            if (textfieldInnerRef.current) textfieldInnerRef.current.value = '';
        } catch (err) {
            setErrorsMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setErrorsVisible(prev => !prev);
        }
    };

    const fetchCustomerMessages = () => {
        fetch(`${baseServerPath}/user-customer-messages/${currentRequest?.id}`, {
            headers: { Authorization: token || '' }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setUserCustomerMessagesSuccess(data));
        })
        .catch(err => {
            dispatch(setUserCustomerMessagesError(String(err)));
        });
    };

    const fetchInnerMessages = () => {
        fetch(`${baseServerPath}/user-inner-messages/${currentRequest?.id}`, {
            headers: { Authorization: token || '' }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setUserInnerMessagesSuccess(data));
        })
        .catch(err => {
            dispatch(setUserInnerMessagesError(String(err)));
        });
    };
    
    useEffect(() => {
        fetchCustomerMessages();
        fetchInnerMessages();

        const interval = setInterval(() => { 
            fetchCustomerMessages();
            fetchInnerMessages();
        }, updateChatIntervalTime);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <DispatcherLayout>
                <div id={ requestViewCSSVariables.mainContentId }>
                    <div id={ requestViewCSSVariables.mainColumnId }>
                        <div id={ requestViewCSSVariables.requestInfoId }>
                            <RequestInfoImmutable />
                        </div>
                        <div id={ requestViewCSSVariables.chatsId }>
                            <div className={ requestViewCSSVariables.chatClass } >
                               <Chat type={ 'customer' } textfieldRef={ textfieldCustomerRef } chatName={ 'Внешний чат' } sendHandler={ sendCustomerHandler } />
                            </div>
                            <div className={ requestViewCSSVariables.chatClass }>
                                <Chat type={ 'inner' } textfieldRef={ textfieldInnerRef } chatName={ 'Внутренний чат' } sendHandler={ sendInnerHandler } />
                            </div>
                        </div>
                    </div>
                    <div id={ requestViewCSSVariables.additionalColumnId }>
                        <RequestInfoMutable />
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
            </DispatcherLayout>
        </>
    );
};

export default RequestView;
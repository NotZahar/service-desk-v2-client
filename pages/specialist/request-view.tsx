import Chat from "@/components/Chat";
import Modal from "@/components/Modal";
import RequestInfoImmutable from "@/components/RequestInfoImmutable";
import RequestInfoMutableSpec from "@/components/RequestInfoMutableSpec";
import { baseServerPath } from "@/helpers/paths";
import { RequestStatus } from "@/helpers/request-statuses";
import { toStringArray } from "@/helpers/transform";
import { updateChatIntervalTime } from "@/helpers/update-data";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import SpecialistLayout from "@/layouts/SpecialistLayout";
import { currentRequestSlice } from "@/store/reducers/CurrentRequestSlice";
import { userInnerMessagesSlice } from "@/store/reducers/UserInnerMessagesSlice";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import requestViewCSSVariables from "../../styles/pages/dispatcher-request-view.module.scss";

interface RequestViewProps {

}

const RequestView: React.FC<RequestViewProps> = () => {
    const router = useRouter();
    
    const { setRequest } = currentRequestSlice.actions;
    const { setUserInnerMessagesSuccess, setUserInnerMessagesError } = userInnerMessagesSlice.actions;
    const { currentRequest } = useTypedSelector(state => state.currentRequestReducer);
    const { token } = useTypedSelector(state => state.authReducer);
    const { user } = useTypedSelector(state => state.userReducer);
    const dispatch = useTypedDispatch();

    const [errorsVisible, setErrorsVisible] = useState(false);
    const [errorsMessages, setErrorsMessages] = useState<string[]>();
    const [updateInnerMessages, setUpdateInnerMessages] = useState<boolean>(false);

    const textfieldInnerRef = useRef<HTMLTextAreaElement>(null);


    const sendInnerHandler = async () => {
        if (currentRequest?.status_name !== RequestStatus.AT_WORK) return;
        if (!textfieldInnerRef.current?.value) return;

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

    const fetchRequestData = () => {
        fetch(`${baseServerPath}/requests/specialist/one?spec_id=${user?.id}&req_id=${currentRequest?.id}`, {
            headers: { Authorization: token || '' }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data) && data.length === 0) { router.push('/specialist/requests'); return; }
            dispatch(setRequest(data[0]));
        })
        .catch(err => {
            setErrorsMessages([ String(err) ]);
            setErrorsVisible(prev => !prev);
        });
    };

    const fetchInnerMessages = () => {
        fetch(`${baseServerPath}/user-inner-messages/${currentRequest?.id}`, {
            headers: { Authorization: token || '' }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setUserInnerMessagesSuccess(data));
            setUpdateInnerMessages(prev => !prev);
        })
        .catch(err => {
            dispatch(setUserInnerMessagesError(String(err)));
        });
    };

    useEffect(() => {
        fetchRequestData();
        fetchInnerMessages();

        const interval = setInterval(() => {
            fetchRequestData();
            fetchInnerMessages();
        }, updateChatIntervalTime);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <SpecialistLayout>
                <div id={ requestViewCSSVariables.mainContentId }>
                    <div id={ requestViewCSSVariables.mainColumnId }>
                        <div id={ requestViewCSSVariables.requestInfoId }>
                            <RequestInfoImmutable />
                        </div>
                        <div id={ requestViewCSSVariables.chatsId }>
                            <div className={ requestViewCSSVariables.chatClassWide }>
                                <Chat 
                                    type={ 'inner' }
                                    textfieldRef={ textfieldInnerRef } 
                                    chatName={ 'Внутренний чат' } 
                                    sendHandler={ sendInnerHandler }
                                    updateMessages={ updateInnerMessages } />
                            </div>
                        </div>
                    </div>
                    <div id={ requestViewCSSVariables.additionalColumnId }>
                        <RequestInfoMutableSpec />
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
            </SpecialistLayout>
        </>
    );
};

export default RequestView;
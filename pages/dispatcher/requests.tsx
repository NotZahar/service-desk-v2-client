import AppealInfoModal from "@/components/AppealInfoModal";
import Modal from "@/components/Modal";
import NewRequestModal from "@/components/NewRequestModal";
import WorkWithAppeals from "@/components/WorkWithAppeals";
import { ifEmptyToNull } from "@/helpers/transform";
import { AppealErrorMessage } from "@/errors/appeal-errors";
import { AppealStatus } from "@/helpers/appeal-statuses";
import { baseServerPath } from "@/helpers/paths";
import { requestStatus } from "@/helpers/request-statuses";
import { toStringArray } from "@/helpers/transform";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import { currentAppealSlice } from "@/store/reducers/CurrentAppealSlice";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import requestsCSSVariables from "../../styles/pages/dispatcher-requests.module.scss";

const Requests = () => {
    const { resetAppeal } = currentAppealSlice.actions;
    const { currentAppeal } = useTypedSelector(state => state.currentAppealReducer);
    const { token } = useTypedSelector(state => state.authReducer);
    const { selectedAppealId } = useTypedSelector(state => state.appealSelectionReducer);
    const dispatch = useTypedDispatch();

    const defaultStatus: requestStatus = 'AT_WORK';

    const selectedAppealIdRef = useRef<string | undefined>(undefined);
    const themeInputRef = useRef<HTMLInputElement>(null);
    const prioritiesSelectRef = useRef<HTMLSelectElement>(null);
    const statusesSelectRef = useRef<HTMLSelectElement>(null);
    const typesSelectRef = useRef<HTMLSelectElement>(null);
    const customersInputRef = useRef<HTMLInputElement>(null);
    const contractsInputRef = useRef<HTMLInputElement>(null);
    const controllersInputRef = useRef<HTMLInputElement>(null);
    const executorsInputRef = useRef<HTMLInputElement>(null);
    const plannedDateInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

    const [appealOpened, setAppealOpened] = useState(false);
    const [newRequestOpened, setNewRequestOpened] = useState(false);
    const [appealErrorsVisible, setAppealErrorsVisible] = useState(false);
    const [appealErrorMessages, setAppealErrorMessages] = useState<string[]>();
    const [newRequestErrorsVisible, setNewRequestErrorsVisible] = useState(false);
    const [newRequestErrorMessages, setnewRequestErrorMessages] = useState<string[]>();
    const [refreshAppealsTrigger, setRefreshAppealsTrigger] = useState(false);

    const openAppeal = () => {
        setAppealOpened(prev => !prev);
    };

    const cancelAppeal = () => {
        dispatch(resetAppeal());
        setAppealOpened(prev => !prev);
    };

    const denyAppeal = async () => {
        if (currentAppeal?.status_name != AppealStatus.OPEN) {
            setAppealErrorMessages([ AppealErrorMessage.OnlyOpenedOnesCanBeRejected ]);
            setAppealErrorsVisible(prev => !prev);
            return;
        }

        try {
            await axios.put(`${baseServerPath}/appeals/change-status`, {
                id: currentAppeal?.id,
                status_name: AppealStatus.REJECTED
            }, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(resetAppeal());
            setAppealOpened(prev => !prev);
            setRefreshAppealsTrigger(prev => !prev);
        } catch (err) {
            setAppealErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setAppealErrorsVisible(true);
        }
    };

    const createNewRequestWindow = () => {
        selectedAppealIdRef.current = selectedAppealId;
        setNewRequestOpened(prev => !prev);
    };

    const createNewRequest = async () => {
        try {
            await axios.post(`${baseServerPath}/requests`, {
                controller: ifEmptyToNull(controllersInputRef.current?.value),
                executor: ifEmptyToNull(executorsInputRef.current?.value),
                priority: ifEmptyToNull(prioritiesSelectRef.current?.value),
                description: ifEmptyToNull(descriptionInputRef.current?.value),
                file: null,
                agreement: ifEmptyToNull(contractsInputRef.current?.value),
                appeal_id: ifEmptyToNull(selectedAppealIdRef.current),
                theme: ifEmptyToNull(themeInputRef.current?.value),
                type: ifEmptyToNull(typesSelectRef.current?.value),
                planned_date: ifEmptyToNull(plannedDateInputRef.current?.value),
                status: ifEmptyToNull(statusesSelectRef.current?.value),
                customer: ifEmptyToNull(customersInputRef.current?.value)
            }, {
                headers: {
                    Authorization: token
                }
            });
            
            setRefreshAppealsTrigger(prev => !prev);
            selectedAppealIdRef.current = undefined;
            setNewRequestOpened(prev => !prev);
        } catch (err) {
            setnewRequestErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setNewRequestErrorsVisible(true);
        }
    }

    const cancelNewRequest = () => {
        selectedAppealIdRef.current = undefined;
        setNewRequestOpened(prev => !prev);
    };

    return (
        <>
            <DispatcherLayout>
                <div id={ requestsCSSVariables.mainContentId }>
                    <div id={ requestsCSSVariables.topPanelId }>
                        <div id={ requestsCSSVariables.newRequestBtnId } onClick={ createNewRequestWindow } >
                            <p>Новая заявка</p>
                        </div>
                        {   newRequestOpened &&
                            <Modal
                                buttons={[
                                    { text: 'Создать', onClick: createNewRequest },
                                    { text: 'Отмена', id: requestsCSSVariables.cancelBtnId, onClick: cancelNewRequest }
                                ]}
                                widthFitContent={ true } >
                                <NewRequestModal 
                                    defaultStatus={ defaultStatus }
                                    themeInputRef={ themeInputRef }
                                    prioritiesSelectRef={ prioritiesSelectRef }
                                    statusesSelectRef={ statusesSelectRef }
                                    typesSelectRef={ typesSelectRef }
                                    customersInputRef={ customersInputRef }
                                    contractsInputRef={ contractsInputRef }
                                    controllersInputRef={ controllersInputRef }
                                    executorsInputRef={ executorsInputRef }
                                    plannedDateInputRef={ plannedDateInputRef }
                                    descriptionInputRef={ descriptionInputRef } />
                            </Modal>
                        }
                        {   newRequestErrorsVisible &&
                                <Modal
                                    title="Ошибка!"
                                    errors={ newRequestErrorMessages && newRequestErrorMessages.map((msg) => { return { text: msg }; }) }
                                    buttons={[
                                        { text: 'Закрыть', onClick: () => { setNewRequestErrorsVisible(prev => !prev) } }
                                    ]} />
                        }
                    </div>
                    <div id={ requestsCSSVariables.appealsAndRequestsId }>
                        <div id={ requestsCSSVariables.appealsId }>
                            <WorkWithAppeals 
                                leftClickAppealHandler={ openAppeal }
                                refreshAppealsTrigger={ refreshAppealsTrigger } />
                            {   appealOpened &&
                                <Modal
                                    buttons={[ 
                                        { text: 'Закрыть', onClick: cancelAppeal },
                                        { text: 'Отклонить', id: requestsCSSVariables.denyBtnId, onClick: denyAppeal }
                                    ]}
                                    widthFitContent={ true } >
                                    <AppealInfoModal appealInfo={ currentAppeal } />
                                </Modal>
                            }
                            {   appealErrorsVisible &&
                                <Modal
                                    title="Ошибка!"
                                    errors={ appealErrorMessages && appealErrorMessages.map((msg) => { return { text: msg }; }) }
                                    buttons={[
                                        { text: 'Закрыть', onClick: () => { setAppealErrorsVisible(prev => !prev) } }
                                    ]} />
                            }
                        </div>
                        <div id={ requestsCSSVariables.requestsId }>
                            {/* <WorkWithRequests
                                leftClickAppealHandler={ openAppeal }
                                refreshAppealsTrigger={ refreshAppealsTrigger } />
                            {   requestOpened &&
                                <Modal
                                    buttons={[ 
                                        { text: 'Закрыть', onClick: cancelAppeal },
                                        { text: 'Отклонить', id: requestsCSSVariables.denyBtnId, onClick: denyAppeal }
                                    ]}
                                    widthFitContent={ true } >
                                    <AppealInfoModal appealInfo={ currentAppeal } />
                                </Modal>
                            }
                            {   appealErrorsVisible &&
                                <Modal
                                    title="Ошибка!"
                                    errors={ appealErrorMessages && appealErrorMessages.map((msg) => { return { text: msg }; }) }
                                    buttons={[
                                        { text: 'Закрыть', onClick: () => { setAppealErrorsVisible(prev => !prev) } }
                                    ]} />
                            } */}
                        </div>
                    </div>
                </div>
            </DispatcherLayout>
        </>
    );
};

export default Requests;
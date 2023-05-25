import AppealInfoModal from "@/components/AppealInfoModal";
import Modal from "@/components/Modal";
import WorkWithAppeals from "@/components/WorkWithAppeals";
import { AppealErrorMessage } from "@/errors/appeal-errors";
import { AppealStatus } from "@/helpers/appeal-statuses";
import { baseServerPath } from "@/helpers/paths";
import { toStringArray } from "@/helpers/transform";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import { currentAppealSlice } from "@/store/reducers/CurrentAppealSlice";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import requestsCSSVariables from "../../styles/pages/dispatcher-requests.module.scss";

const Requests = () => {
    const { resetAppeal } = currentAppealSlice.actions;
    const { currentAppeal } = useTypedSelector(state => state.currentAppealReducer);
    const { token } = useTypedSelector(state => state.authReducer);
    const dispatch = useTypedDispatch();

    const [appealOpened, setAppealOpened] = useState(false);
    const [appealErrorsVisible, setAppealErrorsVisible] = useState(false);
    const [appealErrorMessages, setAppealErrorMessages] = useState<string[]>();
    const [denyAppealTrigger, setDenyAppealTrigger] = useState(false);

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
            setDenyAppealTrigger(prev => !prev);
        } catch (err) {
            setAppealErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setAppealErrorsVisible(true);
        }
    };

    return (
        <>
            <DispatcherLayout>
                <div id={ requestsCSSVariables.mainContentId }>
                    <div id={ requestsCSSVariables.topPanelId }>
                        <div id={ requestsCSSVariables.newRequestBtnId }>Новая заявка</div>
                    </div>
                    <div id={ requestsCSSVariables.appealsAndRequestsId }>
                        <div id={ requestsCSSVariables.appealsId }>
                            <WorkWithAppeals 
                                leftClickAppealHandler={ openAppeal }
                                denyAppealTrigger={ denyAppealTrigger } />
                            {   appealOpened &&
                                <Modal
                                    buttons={[ 
                                        { text: 'Закрыть', onClick: cancelAppeal },
                                        { text: 'Отклонить', id: requestsCSSVariables.cancelBtnId, onClick: denyAppeal }
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
                            {/* <RequestsList /> */}
                        </div>
                    </div>
                </div>
            </DispatcherLayout>
        </>
    );
};

export default Requests;
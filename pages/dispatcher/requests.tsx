import Modal from "@/components/Modal";
import WorkWithAppeals from "@/components/WorkWithAppeals";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import { currentAppealSlice } from "@/store/reducers/CurrentAppealSlice";
import { useState } from "react";
import requestsCSSVariables from "../../styles/pages/dispatcher-requests.module.scss";

const Requests = () => {
    const { resetAppeal } = currentAppealSlice.actions;
    const { currentAppeal } = useTypedSelector(state => state.currentAppealReducer);
    const dispatch = useTypedDispatch();
    const [appealOpened, setAppealOpened] = useState(false);

    const openAppeal = () => {
        setAppealOpened(prev => !prev);
    };

    const cancelAppeal = () => {
        dispatch(resetAppeal());
        setAppealOpened(prev => !prev);
    };

    const denyAppeal = () => {
        setAppealOpened(prev => !prev);
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
                            <WorkWithAppeals parentHandlerAppeal={ openAppeal } />
                            {   appealOpened &&
                                <Modal
                                    title={ currentAppeal?.theme }
                                    buttons={[ 
                                        { text: 'Закрыть', onClick: cancelAppeal },
                                        { text: 'Отклонить', id: requestsCSSVariables.cancelBtnId, onClick: denyAppeal }
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
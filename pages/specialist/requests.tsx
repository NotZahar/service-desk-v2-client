import { useTypedDispatch } from "@/hooks/redux";
import { useState } from "react";
import requestsCSSVariables from "../../styles/pages/dispatcher-requests.module.scss";
import WorkWithRequests from "@/components/WorkWithRequests";
import { useRouter } from "next/router";
import { userInnerMessagesSlice } from "@/store/reducers/UserInnerMessagesSlice";
import SpecialistLayout from "@/layouts/SpecialistLayout";

const Requests = () => {
    const router = useRouter();
    
    const { resetUserInnerMessages } = userInnerMessagesSlice.actions;
    const dispatch = useTypedDispatch();

    const [refreshRequestsTrigger, setRefreshRequestsTrigger] = useState(false);

    const openRequest = () => {
        dispatch(resetUserInnerMessages());
        router.push('/specialist/request-view');
    };

    return (
        <>
            <SpecialistLayout>
                <div id={ requestsCSSVariables.mainContentId }>
                    <div id={ requestsCSSVariables.appealsAndRequestsId }>
                        <div id={ requestsCSSVariables.requestsId }>
                            <WorkWithRequests
                                leftClickAppealHandler={ openRequest }
                                refreshRequestsTrigger={ refreshRequestsTrigger } />
                        </div>
                    </div>
                </div>
            </SpecialistLayout>
        </>
    );
};

export default Requests;
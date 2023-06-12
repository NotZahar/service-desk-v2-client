import { useTypedDispatch } from "@/hooks/redux";
import requestsCSSVariables from "../../styles/pages/specialist-requests.module.scss";
import { useRouter } from "next/router";
import { userInnerMessagesSlice } from "@/store/reducers/UserInnerMessagesSlice";
import SpecialistLayout from "@/layouts/SpecialistLayout";
import WorkWithRequestsSpec from "@/components/WorkWithRequestsSpec";

const Requests = () => {
    const router = useRouter();
    
    const { resetUserInnerMessages } = userInnerMessagesSlice.actions;
    const dispatch = useTypedDispatch();

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
                            <WorkWithRequestsSpec
                                leftClickAppealHandler={ openRequest } />
                        </div>
                    </div>
                </div>
            </SpecialistLayout>
        </>
    );
};

export default Requests;
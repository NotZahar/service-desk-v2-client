import WorkWithAppeals from "@/components/WorkWithAppeals";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import requestsCSSVariables from "../../styles/pages/dispatcher-requests.module.scss";

const Requests = () => {
    return (
        <>
            <DispatcherLayout>
                <div id={ requestsCSSVariables.mainContentId }>
                    <div id={ requestsCSSVariables.topPanelId }>
                        <div id={ requestsCSSVariables.newRequestBtnId }>Новая заявка</div>
                    </div>
                    <div id={ requestsCSSVariables.appealsAndRequestsId }>
                        <div id={ requestsCSSVariables.appealsId }>
                            <WorkWithAppeals />
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
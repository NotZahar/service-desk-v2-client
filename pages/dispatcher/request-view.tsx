import RequestInfoImmutable from "@/components/RequestInfoImmutable";
import RequestInfoMutable from "@/components/RequestInfoMutable";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import requestViewCSSVariables from "../../styles/pages/dispatcher-request-view.module.scss";

interface RequestViewProps {

}

const RequestView: React.FC<RequestViewProps> = () => {
    return (
        <>
            <DispatcherLayout>
                <div id={ requestViewCSSVariables.mainContentId }>
                    <div id={ requestViewCSSVariables.mainColumnId }>
                        <div id={ requestViewCSSVariables.requestInfoId }>
                            <RequestInfoImmutable />
                        </div>
                        <div id={ requestViewCSSVariables.chatsId }>

                        </div>
                    </div>
                    <div id={ requestViewCSSVariables.additionalColumnId }>
                        <RequestInfoMutable />
                    </div>
                </div>
            </DispatcherLayout>
        </>
    );
};

export default RequestView;
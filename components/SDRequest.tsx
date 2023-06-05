import { RequestStatus } from "@/helpers/request-statuses";
import { useTypedDispatch } from "@/hooks/redux";
import { currentRequestSlice } from "@/store/reducers/CurrentRequestSlice";
import { IRequest } from "@/types/models/request";
import requestCSSVariables from "../styles/components/Request.module.scss";

const statusTypeToCSS = (statusName: string): string => {
    switch (statusName) {
        case RequestStatus.AT_WORK:
            return requestCSSVariables.requestAtWork;
        case RequestStatus.FAILED:
            return requestCSSVariables.requestFailed;
        case RequestStatus.SUCCESSFULLY_CLOSED:
            return requestCSSVariables.requestClosed;
        default: 
            return '';
    }
};

interface SDRequestProps {
    request: IRequest;
    leftClickHandler: Function;
    notForCustomer?: boolean;
}

const SDRequest: React.FC<SDRequestProps> = ({ request, leftClickHandler, notForCustomer }) => {
    const { setRequest } = currentRequestSlice.actions;
    const dispatch = useTypedDispatch();
    
    const defaultClassName = `${requestCSSVariables.requestClass} ${statusTypeToCSS(request.status_name)}`; 

    const dateString = new Date(request.date).toLocaleString('ru-RU');
    const plannedDateString = new Date(request.planned_date).toLocaleString('ru-RU');

    const onLeftClickHandler = () => {
        dispatch(setRequest(request));
        leftClickHandler();
    };

    return (
        <>  
            <div id={ request.id } className={ defaultClassName } onClick={ onLeftClickHandler } >
                <p className={ requestCSSVariables.requestTheme } title={ request.theme } >{ request.theme }</p>
                { notForCustomer && <p className={ requestCSSVariables.requestPriority } title={ request.priority_name } >{ request.priority_name }</p> }
                { notForCustomer && <p className={ requestCSSVariables.requestPlannedDate } title={ plannedDateString } >{ plannedDateString }</p> }
                <p className={ requestCSSVariables.requestDate } title={ dateString } >{ dateString }</p>
                <p className={ requestCSSVariables.requestStatus } title={ request.status_name } >{ request.status_name }</p>
            </div>  
        </>
    );
};

export default SDRequest;

import { RequestStatus } from "@/helpers/request-statuses";
import { useTypedSelector } from "@/hooks/redux";
import { IRequest } from "@/types/models/request";
import requestsListCSSVariables from "../styles/components/RequestsList.module.scss";
import SDRequest from "./SDRequest";

interface RequestsListProps {
    leftClickAppealHandler: Function;
    notForCustomer?: boolean; 
}

const RequestsList: React.FC<RequestsListProps> = ({ leftClickAppealHandler, notForCustomer = true }) => {
    const { requests } = useTypedSelector(state => state.requestsReducer);

    let atWorkRequests: IRequest[] = [];
    let closedRequests: IRequest[] = [];
    let failedRequests: IRequest[] = [];

    if (Array.isArray(requests)) {
        requests.forEach((request) => {
            switch (request.status_name) {
                case RequestStatus.AT_WORK: {
                    atWorkRequests.push(request);
                    break;
                } case RequestStatus.SUCCESSFULLY_CLOSED: {
                    closedRequests.push(request);
                    break;
                } case RequestStatus.FAILED: {
                    failedRequests.push(request);
                    break;
                }
            }
        });
    }

    return (
        <>  
            <div id={ requestsListCSSVariables.columnNamesId }>
                <p className={ requestsListCSSVariables.themeColumn } >Тема</p>
                { notForCustomer && <p className={ requestsListCSSVariables.priorityColumn } >Приоритет</p> }
                { notForCustomer && <p className={ requestsListCSSVariables.plannedDateColumn } >Запланированная дата</p> }     
                <p className={ requestsListCSSVariables.dateColumn } >Дата регистрации</p>     
                <p className={ requestsListCSSVariables.statusColumn } >Статус</p>     
            </div>

            <div id={ requestsListCSSVariables.requestsId }>
                {   atWorkRequests.map((elem) => {
                        return <SDRequest 
                            request={ elem } 
                            leftClickHandler={ leftClickAppealHandler }
                            key={ elem.id }
                            notForCustomer={ notForCustomer } />;
                    }) 
                }

                {   closedRequests.map((elem) => {
                        return <SDRequest 
                            request={ elem } 
                            leftClickHandler={ leftClickAppealHandler } 
                            key={ elem.id }
                            notForCustomer={ notForCustomer } />;
                    }) 
                }

                {   failedRequests.map((elem) => {
                        return <SDRequest 
                            request={ elem } 
                            leftClickHandler={ leftClickAppealHandler } 
                            key={ elem.id }
                            notForCustomer={ notForCustomer } />;
                    }) 
                }
            </div>
        </>
    );
};

export default RequestsList;

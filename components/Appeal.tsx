import { AppealStatus, appealStatusType } from "@/helpers/appeal-statuses";
import { IAppealStatus } from "@/types/models/appeal-status";
import appealCSSVariables from "../styles/components/Appeal.module.scss";

interface AppealProps {
    id: string;
    theme: string;
    text: string;
    file: string | null;
    customer_id: string;
    date: Date;
    status: IAppealStatus;
}

const Appeal: React.FC<AppealProps> = ({ id, theme, date, status }) => {
    const statusTypeToCSS = (type: appealStatusType): string => {
        switch (type) {
            case 'AT_WORK':
                return appealCSSVariables.appealAtWork;
            case 'OPEN':
                return appealCSSVariables.appealOpen;
            case 'CLOSED':
                return appealCSSVariables.appealClosed;
            case 'REJECTED':
                return appealCSSVariables.appealRejected;
        }
    };

    const dateString = new Date(date).toLocaleString('ru-RU');
    const statusName = AppealStatus[status.name as appealStatusType];

    return (
        <>  
            <div id={ id } className={ `${appealCSSVariables.appealClass} ${statusTypeToCSS(status.name as appealStatusType)}` }>
                <p className={ appealCSSVariables.appealTheme } title={ theme } >{ theme }</p>
                <p className={ appealCSSVariables.appealDate } title={ dateString } >{ dateString }</p>
                <p className={ appealCSSVariables.appealStatus } title={ statusName } >{ statusName }</p>
            </div>  

            {/* {   errorsVisible && 
                <Modal 
                    title="Ошибка!"
                    errors={ errorMessages && errorMessages.map((msg) => { return { text: msg }; }) }
                    buttons={[
                        { text: 'Закрыть', onClick: () => setErrorsVisible((prev) => !prev) }
                    ]} />
            } */}
        </>
    );
};

export default Appeal;

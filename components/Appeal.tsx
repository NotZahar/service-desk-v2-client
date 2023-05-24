import { AppealStatus } from "@/helpers/appeal-statuses";
import { useTypedDispatch } from "@/hooks/redux";
import { currentAppealSlice } from "@/store/reducers/CurrentAppealSlice";
import { IAppeal } from "@/types/models/appeal";
import appealCSSVariables from "../styles/components/Appeal.module.scss";

const statusTypeToCSS = (statusName: string): string => {
    switch (statusName) {
        case AppealStatus.AT_WORK:
            return appealCSSVariables.appealAtWork;
        case AppealStatus.OPEN:
            return appealCSSVariables.appealOpen;
        case AppealStatus.CLOSED:
            return appealCSSVariables.appealClosed;
        case AppealStatus.REJECTED:
            return appealCSSVariables.appealRejected;
        default: 
            return '';
    }
};

interface AppealProps {
    appeal: IAppeal;
    parentHandler: Function;
}

const Appeal: React.FC<AppealProps> = ({ appeal, parentHandler }) => {
    const { setAppeal } = currentAppealSlice.actions;
    const dispatch = useTypedDispatch();

    const dateString = new Date(appeal.date).toLocaleString('ru-RU');

    const onClickHandler = () => {
        dispatch(setAppeal(appeal));
        parentHandler();
    };

    return (
        <>  
            <div id={ appeal.id } className={ `${appealCSSVariables.appealClass} ${statusTypeToCSS(appeal.status_name)}` } onClick={ onClickHandler }>
                <p className={ appealCSSVariables.appealTheme } title={ appeal.theme } >{ appeal.theme }</p>
                <p className={ appealCSSVariables.appealDate } title={ dateString } >{ dateString }</p>
                <p className={ appealCSSVariables.appealStatus } title={ appeal.status_name } >{ appeal.status_name }</p>
            </div>  
        </>
    );
};

export default Appeal;

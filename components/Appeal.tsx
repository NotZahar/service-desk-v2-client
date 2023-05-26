import { AppealStatus } from "@/helpers/appeal-statuses";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { appealSelectionSlice } from "@/store/reducers/AppealSelectionSlice";
import { currentAppealSlice } from "@/store/reducers/CurrentAppealSlice";
import { IAppeal } from "@/types/models/appeal";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
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
    leftClickHandler: Function;
}

const Appeal: React.FC<AppealProps> = ({ appeal, leftClickHandler }) => {
    const { selectedAppealId } = useTypedSelector(state => state.appealSelectionReducer);
    const { setAppeal } = currentAppealSlice.actions;
    const { setSelectedAppealId } = appealSelectionSlice.actions;
    const dispatch = useTypedDispatch();

    const [appealClassName, setAppealClassName] = useState('');
    const appealSelected = useRef(false);

    const defaultClassName = `${appealCSSVariables.appealClass} ${statusTypeToCSS(appeal.status_name)}`; 
    const selectedClassName = `${defaultClassName} ${appealCSSVariables.appealSelected}`;

    useEffect(() => {
        setAppealClassName(defaultClassName);
        
        if (!appealSelected.current && selectedAppealId === appeal.id) {
            setAppealClassName(selectedClassName);
            appealSelected.current = true;
        } else {
            setAppealClassName(defaultClassName);
            appealSelected.current = false;
        }
    }, [selectedAppealId]);

    const dateString = new Date(appeal.date).toLocaleString('ru-RU');

    const onLeftClickHandler = () => {
        dispatch(setAppeal(appeal));
        leftClickHandler();
    };

    const onRightClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        
        if (appeal.status_name !== AppealStatus.OPEN) return;
        
        if (appealSelected.current && selectedAppealId === appeal.id) {
            dispatch(setSelectedAppealId(undefined));
            return;
        }

        dispatch(setSelectedAppealId(appeal.id));
    };

    return (
        <>  
            <div id={ appeal.id } className={ appealClassName } onClick={ onLeftClickHandler } onContextMenu={ onRightClickHandler } >
                <p className={ appealCSSVariables.appealTheme } title={ appeal.theme } >{ appeal.theme }</p>
                <p className={ appealCSSVariables.appealDate } title={ dateString } >{ dateString }</p>
                <p className={ appealCSSVariables.appealStatus } title={ appeal.status_name } >{ appeal.status_name }</p>
            </div>  
        </>
    );
};

export default Appeal;

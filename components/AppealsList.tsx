import { AppealStatus } from "@/helpers/appeal-statuses";
import { useTypedSelector } from "@/hooks/redux";
import { IAppeal } from "@/types/models/appeal";
import appealsListCSSVariables from "../styles/components/AppealsList.module.scss";
import Appeal from "./Appeal";

interface AppealsListProps {
    parentAppealHandler: Function;
}

const AppealsList: React.FC<AppealsListProps> = ({ parentAppealHandler }) => {
    const { appeals } = useTypedSelector(state => state.appealsReducer);

    let openAppeals: IAppeal[] = [];
    let closedAppeals: IAppeal[] = [];
    let atWorkAppeals: IAppeal[] = [];
    let rejectedAppeals: IAppeal[] = [];

    if (Array.isArray(appeals)) {
        appeals.forEach((appeal) => {
            switch (appeal.status_name) {
                case AppealStatus.AT_WORK: {
                    atWorkAppeals.push(appeal);
                    break;
                } case AppealStatus.CLOSED: {
                    closedAppeals.push(appeal);
                    break;
                } case AppealStatus.OPEN: {
                    openAppeals.push(appeal);
                    break;
                } case AppealStatus.REJECTED: {
                    rejectedAppeals.push(appeal);
                    break;
                }
            }
        });
    }

    return (
        <>  
            <div id={ appealsListCSSVariables.columnNamesId }>
                <p className={ appealsListCSSVariables.themeColumn } >Тема</p>
                <p className={ appealsListCSSVariables.dateColumn } >Дата регистрации</p>
                <p className={ appealsListCSSVariables.statusColumn } >Статус</p>     
            </div>

            <div id={ appealsListCSSVariables.appealsId }>
                {   openAppeals.map(({ id, theme, text, file, customer_id, date, status_id, status_name }) => {
                        return <Appeal appeal={ { id, theme, text, file, customer_id, date, status_id, status_name } } parentHandler={ parentAppealHandler } key={ id } />;
                    }) 
                }

                {   atWorkAppeals.map(({ id, theme, text, file, customer_id, date, status_id, status_name }) => {
                        return <Appeal appeal={ { id, theme, text, file, customer_id, date, status_id, status_name } } parentHandler={ parentAppealHandler } key={ id } />;
                    }) 
                }

                {   closedAppeals.map(({ id, theme, text, file, customer_id, date, status_id, status_name }) => {
                        return <Appeal appeal={ { id, theme, text, file, customer_id, date, status_id, status_name } } parentHandler={ parentAppealHandler } key={ id } />;
                    }) 
                }

                {   rejectedAppeals.map(({ id, theme, text, file, customer_id, date, status_id, status_name }) => {
                        return <Appeal appeal={ { id, theme, text, file, customer_id, date, status_id, status_name } } parentHandler={ parentAppealHandler } key={ id } />;
                    }) 
                }
            </div>
        </>
    );
};

export default AppealsList;

import { appealStatusType } from "@/helpers/appeal-statuses";
import { useTypedSelector } from "@/hooks/redux";
import { IAppeal } from "@/types/models/appeal";
import appealsListCSSVariables from "../styles/components/AppealsList.module.scss";
import Appeal from "./Appeal";

interface AppealsListProps {

}

const AppealsList: React.FC<AppealsListProps> = () => {
    const { appeals } = useTypedSelector(state => state.appealsReducer);

    let openAppeals: IAppeal[] = [];
    let closedAppeals: IAppeal[] = [];
    let atWorkAppeals: IAppeal[] = [];
    let rejectedAppeals: IAppeal[] = [];
    appeals.forEach((appeal) => {
        switch (appeal.status.name as appealStatusType) {
            case 'AT_WORK': {
                atWorkAppeals.push(appeal);
                break;
            } case 'CLOSED': {
                closedAppeals.push(appeal);
                break;
            } case 'OPEN': {
                openAppeals.push(appeal);
                break;
            } case 'REJECTED': {
                rejectedAppeals.push(appeal);
                break;
            }
        }
    });

    return (
        <>  
            <div id={ appealsListCSSVariables.columnNamesId }>
                <p className={ appealsListCSSVariables.themeColumn } >Тема</p>
                <p className={ appealsListCSSVariables.dateColumn } >Дата регистрации</p>
                <p className={ appealsListCSSVariables.statusColumn } >Статус</p>     
            </div>

            <div id={ appealsListCSSVariables.appealsId }>
                {   openAppeals.map(({ id, theme, text, file, customer_id, date, status }) => {
                        return <Appeal id={ id } key={ id } theme={ theme } text={ text } file={ file } customer_id={ customer_id } date={ date } status={ status } />;
                    }) 
                }

                {   atWorkAppeals.map(({ id, theme, text, file, customer_id, date, status }) => {
                        return <Appeal id={ id } key={ id } theme={ theme } text={ text } file={ file } customer_id={ customer_id } date={ date } status={ status } />;
                    }) 
                }

                {   closedAppeals.map(({ id, theme, text, file, customer_id, date, status }) => {
                        return <Appeal id={ id } key={ id } theme={ theme } text={ text } file={ file } customer_id={ customer_id } date={ date } status={ status } />;
                    }) 
                }

                {   rejectedAppeals.map(({ id, theme, text, file, customer_id, date, status }) => {
                        return <Appeal id={ id } key={ id } theme={ theme } text={ text } file={ file } customer_id={ customer_id } date={ date } status={ status } />;
                    }) 
                }
            </div>
        </>
    );
};

export default AppealsList;

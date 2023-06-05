import { useTypedSelector } from "@/hooks/redux";
import employeesListCSSVariables from "../styles/components/EmployeesList.module.scss";
import Employee from "./Employee";

interface EmployeesListProps {
    leftClickAppealHandler: Function;
}

const EmployeesList: React.FC<EmployeesListProps> = ({ leftClickAppealHandler }) => {
    const { employees } = useTypedSelector(state => state.employeesReducer);

    return (
        <>  
            <div id={ employeesListCSSVariables.columnNamesId }>
                <p className={ employeesListCSSVariables.nameColumn } >Имя</p>
                <p className={ employeesListCSSVariables.emailColumn } >Email</p>
                <p className={ employeesListCSSVariables.appointmentColumn } >Должность</p>     
                <p className={ employeesListCSSVariables.departmentColumn } >Отдел</p>
            </div>

            <div id={ employeesListCSSVariables.employeesId }>
                {   Array.isArray(employees) &&
                    employees.map((elem) => {
                        return <Employee 
                            employee={ elem } 
                            leftClickHandler={ leftClickAppealHandler }
                            key={ elem.id } />;
                    }) 
                }
            </div>
        </>
    );
};

export default EmployeesList;

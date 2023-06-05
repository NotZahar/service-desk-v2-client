import { useTypedDispatch } from "@/hooks/redux";
import { currentEmployeeSlice } from "@/store/reducers/CurrentEmployeeSlice";
import { IEmployee } from "@/types/models/employee";
import employeeCSSVariables from "../styles/components/Employee.module.scss";

interface EmployeeProps {
    employee: IEmployee;
    leftClickHandler: Function;
}

const Employee: React.FC<EmployeeProps> = ({ employee, leftClickHandler }) => {
    const { setEmployee } = currentEmployeeSlice.actions;
    const dispatch = useTypedDispatch();

    const onLeftClickHandler = () => {
        dispatch(setEmployee(employee));
        leftClickHandler();
    };

    return (
        <>  
            <div id={ employee.id } className={ employeeCSSVariables.employeeClass } onClick={ onLeftClickHandler } >
                <p className={ employeeCSSVariables.employeeName } title={ employee.first_name } >{ employee.first_name }</p>
                <p className={ employeeCSSVariables.employeeEmail } title={ employee.email } >{ employee.email }</p>
                <p className={ employeeCSSVariables.employeeAppointment } title={ employee.appointment } >{ employee.appointment }</p>
                <p className={ employeeCSSVariables.employeeDepartment } title={ employee.department } >{ employee.department }</p>
            </div>  
        </>
    );
};

export default Employee;

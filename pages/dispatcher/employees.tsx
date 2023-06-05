import EmployeeInfoModal from "@/components/EmployeeInfoModal";
import Modal from "@/components/Modal";
import NewEmployeeModal from "@/components/NewEmployeeModal";
import WorkWithEmployees from "@/components/WorkWithEmployees";
import { baseServerPath } from "@/helpers/paths";
import { ifEmptyToNull, toStringArray } from "@/helpers/transform";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import DispatcherLayout from "@/layouts/DispatcherLayout";
import { currentEmployeeSlice } from "@/store/reducers/CurrentEmployeeSlice";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import employeesCSSVariables from "../../styles/pages/dispatcher-employees.module.scss";

const Employees = () => {
    const { token } = useTypedSelector(state => state.authReducer);
    const { currentEmployee } = useTypedSelector(state => state.currentEmployeeReducer);

    const { resetEmployee } = currentEmployeeSlice.actions;

    const [employeeOpened, setEmployeeOpened] = useState(false);
    const [newEmployeeOpened, setNewEmployeeOpened] = useState(false);
    const [newEmployeeErrorsVisible, setNewEmployeeErrorsVisible] = useState(false);
    const [employeeErrorsVisible, setEmployeeErrorsVisible] = useState(false);
    const [employeeErrorMessages, setEmployeeErrorMessages] = useState<string[]>();
    const [newEmployeeErrorMessages, setNewEmployeeErrorMessages] = useState<string[]>();
    const [refreshEmployeesTrigger, setRefreshEmployeesTrigger] = useState(false);

    const dispatch = useTypedDispatch();

    const newEmailInputRef = useRef<HTMLInputElement>(null);
    const newPasswordInputRef = useRef<HTMLInputElement>(null);
    const newFirstNameInputRef = useRef<HTMLInputElement>(null);
    const newSecondNameInputRef = useRef<HTMLInputElement>(null);
    const newPatronymicInputRef = useRef<HTMLInputElement>(null);
    const newPhoneNumberInputRef = useRef<HTMLInputElement>(null);
    const newDepartmentInputRef = useRef<HTMLInputElement>(null);
    const newAppointmentInputRef = useRef<HTMLInputElement>(null);
    const newRoleSelectRef = useRef<HTMLSelectElement>(null);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const secondNameInputRef = useRef<HTMLInputElement>(null);
    const patronymicInputRef = useRef<HTMLInputElement>(null);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const departmentInputRef = useRef<HTMLInputElement>(null);
    const appointmentInputRef = useRef<HTMLInputElement>(null);

    const createNewEmployeeWindow = () => {
        setNewEmployeeOpened(prev => !prev);
    };

    const createNewEmployee = async () => {
        try {
            await axios.post(`${baseServerPath}/auth/registration-employee`, {
                email: ifEmptyToNull(newEmailInputRef.current?.value),
                password: ifEmptyToNull(newPasswordInputRef.current?.value),
                first_name: ifEmptyToNull(newFirstNameInputRef.current?.value),
                second_name: ifEmptyToNull(newSecondNameInputRef.current?.value),
                patronymic: ifEmptyToNull(newPatronymicInputRef.current?.value),
                phone_number: ifEmptyToNull(newPhoneNumberInputRef.current?.value),
                department: ifEmptyToNull(newDepartmentInputRef.current?.value),
                appointment: ifEmptyToNull(newAppointmentInputRef.current?.value),
                role_name: ifEmptyToNull(newRoleSelectRef.current?.value)
            }, {
                headers: {
                    Authorization: token
                }
            });
            
            setRefreshEmployeesTrigger(prev => !prev);
            setNewEmployeeOpened(prev => !prev);
        } catch (err) {
            setNewEmployeeErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setNewEmployeeErrorsVisible(prev => !prev);
        }
    }

    const cancelNewEmployee = () => {
        setNewEmployeeOpened(prev => !prev);
    };

    const openEmployeeInfo = () => {
        setEmployeeOpened(prev => !prev);
    };

    const cancelEmployee = () => {
        dispatch(resetEmployee());
        setEmployeeOpened(prev => !prev);
    };

    const changeEmployee = async () => {
        try {
            await axios.put(`${baseServerPath}/employees`, {
                id: currentEmployee?.id,
                email: ifEmptyToNull(emailInputRef.current?.value),
                password: ifEmptyToNull(passwordInputRef.current?.value),
                first_name: ifEmptyToNull(firstNameInputRef.current?.value),
                second_name: ifEmptyToNull(secondNameInputRef.current?.value),
                patronymic: ifEmptyToNull(patronymicInputRef.current?.value),
                phone_number: ifEmptyToNull(phoneNumberInputRef.current?.value),
                department: ifEmptyToNull(departmentInputRef.current?.value),
                appointment: ifEmptyToNull(appointmentInputRef.current?.value)
            }, {
                headers: {
                    Authorization: token
                }
            });

            dispatch(resetEmployee());
            setEmployeeOpened(prev => !prev);
            setRefreshEmployeesTrigger(prev => !prev);
        } catch (err) {
            setEmployeeErrorMessages(err instanceof AxiosError ? 
                (err.response ? toStringArray(err.response.data) : [ err.message ]) 
                : undefined);
            setEmployeeErrorsVisible(true);
        }
    };

    return (
        <>
            <DispatcherLayout>
                <div id={ employeesCSSVariables.mainContentId }>
                    <div id={ employeesCSSVariables.topPanelId }>
                        <div id={ employeesCSSVariables.newEmployeeBtnId } onClick={ createNewEmployeeWindow } >
                            <p>Новый сотрудник</p>
                        </div>
                        {   newEmployeeOpened &&
                            <Modal
                                buttons={[
                                    { text: 'Создать', onClick: createNewEmployee },
                                    { text: 'Отмена', id: employeesCSSVariables.cancelBtnId, onClick: cancelNewEmployee }
                                ]}
                                widthFitContent={ true } >
                                <NewEmployeeModal 
                                    emailInputRef={ newEmailInputRef }
                                    passwordInputRef={ newPasswordInputRef }
                                    firstNameInputRef={ newFirstNameInputRef }
                                    secondNameInputRef={ newSecondNameInputRef }
                                    patronymicInputRef={ newPatronymicInputRef }
                                    phoneNumberInputRef={ newPhoneNumberInputRef }
                                    departmentInputRef={ newDepartmentInputRef }
                                    appointmentInputRef={ newAppointmentInputRef }
                                    roleNameSelectRef={ newRoleSelectRef } />
                            </Modal>
                        }
                        {   newEmployeeErrorsVisible &&
                                <Modal
                                    title="Ошибка!"
                                    errors={ newEmployeeErrorMessages && newEmployeeErrorMessages.map((msg) => { return { text: msg }; }) }
                                    buttons={[
                                        { text: 'Закрыть', onClick: () => { setNewEmployeeErrorsVisible(prev => !prev) } }
                                    ]} />
                        }
                    </div>
                    <div id={ employeesCSSVariables.employeesId }>
                        <WorkWithEmployees 
                            leftClickAppealHandler={ openEmployeeInfo }
                            refreshEmployeesTrigger={ refreshEmployeesTrigger } />
                        {   employeeOpened &&
                            <Modal
                                buttons={[ 
                                    { text: 'Закрыть', onClick: cancelEmployee },
                                    { text: 'Изменить данные', id: employeesCSSVariables.changeBtnId, onClick: changeEmployee }
                                ]}
                                widthFitContent={ true } >
                                <EmployeeInfoModal
                                    employeeInfo={ currentEmployee }
                                    emailInputRef={ emailInputRef }
                                    passwordInputRef={ passwordInputRef }
                                    firstNameInputRef={ firstNameInputRef }
                                    secondNameInputRef={ secondNameInputRef }
                                    patronymicInputRef={ patronymicInputRef }
                                    phoneNumberInputRef={ phoneNumberInputRef }
                                    appointmentInputRef={ appointmentInputRef }
                                    departmentInputRef={ departmentInputRef } />
                            </Modal>
                        }
                        {   employeeErrorsVisible &&
                            <Modal
                                title="Ошибка!"
                                errors={ employeeErrorMessages && employeeErrorMessages.map((msg) => { return { text: msg }; }) }
                                buttons={[
                                    { text: 'Закрыть', onClick: () => { setEmployeeErrorsVisible(prev => !prev) } }
                                ]} />
                        }
                    </div>
                </div>
            </DispatcherLayout>
        </>
    );
};

export default Employees;
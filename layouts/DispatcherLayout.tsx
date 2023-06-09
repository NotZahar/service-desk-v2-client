import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import { useTypedDispatch } from "@/hooks/redux";
import { appealSelectionSlice } from "@/store/reducers/AppealSelectionSlice";
import { appealsSlice } from "@/store/reducers/AppealsSlice";
import { authSlice } from "@/store/reducers/AuthSlice";
import { currentAppealSlice } from "@/store/reducers/CurrentAppealSlice";
import { currentCustomerSlice } from "@/store/reducers/CurrentCustomerSlice";
import { currentEmployeeSlice } from "@/store/reducers/CurrentEmployeeSlice";
import { currentRequestSlice } from "@/store/reducers/CurrentRequestSlice";
import { customersSlice } from "@/store/reducers/CustomersSlice";
import { employeesSlice } from "@/store/reducers/EmployeesSlice";
import { requestsSlice } from "@/store/reducers/RequestsSlice";
import { userCustomerMessagesSlice } from "@/store/reducers/UserCustomerMessagesSlice";
import { userInnerMessagesSlice } from "@/store/reducers/UserInnerMessagesSlice";
import { userSlice } from "@/store/reducers/UserSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import employeeLayoutCSSVariables from "../styles/layouts/employee-layout.module.scss";

interface DispatcherLayoutProps {
    children: React.ReactNode;
}

const DispatcherLayout: React.FC<DispatcherLayoutProps> = ({ children }) => {
    const router = useRouter();
    const dispatch = useTypedDispatch();

    const { authReset } = authSlice.actions;
    const { resetUser } = userSlice.actions;
    const { setSelectedAppealId } = appealSelectionSlice.actions;
    const { resetAppeals } = appealsSlice.actions;
    const { resetAppeal } = currentAppealSlice.actions;
    const { resetCustomer } = currentCustomerSlice.actions;
    const { resetEmployee } = currentEmployeeSlice.actions;
    const { resetRequest } = currentRequestSlice.actions;
    const { resetCustomers } = customersSlice.actions;
    const { resetEmployees } = employeesSlice.actions;
    const { resetRequests } = requestsSlice.actions;
    const { resetUserCustomerMessages } = userCustomerMessagesSlice.actions;
    const { resetUserInnerMessages } = userInnerMessagesSlice.actions;

    const toRequests = () => { 
        router.push('/dispatcher/requests'); 
    };
    const toCustomers = () => { router.push('/dispatcher/customers'); };
    const toEmployees = () => { router.push('/dispatcher/employees'); };
    const toKnowledgeBase = () => { router.push('/dispatcher/knowledge-base'); };

    const logout = () => {
        dispatch(authReset());
        dispatch(resetUser());
        
        dispatch(setSelectedAppealId(undefined));
        dispatch(resetAppeals());
        dispatch(resetAppeal());
        dispatch(resetCustomer());
        dispatch(resetEmployee());
        dispatch(resetRequest());
        dispatch(resetCustomers());
        dispatch(resetEmployees());
        dispatch(resetRequests());
        dispatch(resetUserCustomerMessages());
        dispatch(resetUserInnerMessages());
        
        router.push('/auth/choice');
    };

    return (
        <>
            <Head>
                <title>{ 'Service Desk' }</title>
            </Head>
            <div id={ employeeLayoutCSSVariables.mainLayoutId }>
                <div id={ employeeLayoutCSSVariables.navbarId }>
                    <UserInfo logoutFunction={ logout } />
                    <Navbar tabs={[
                        { tab: 'Заявки', path: 'requests', onClick: toRequests },
                        { tab: 'Клиенты', path: 'customers', onClick: toCustomers },
                        { tab: 'Сотрудники', path: 'employees', onClick: toEmployees },
                        { tab: 'База знаний', path: 'knowledge-base', onClick: toKnowledgeBase }
                    ]} />
                </div>
                <div id={ employeeLayoutCSSVariables.pageContentId }>
                    { children }
                </div>
            </div>
        </>
    );
};

export default DispatcherLayout;
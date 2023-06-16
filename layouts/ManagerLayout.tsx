import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import { useTypedDispatch } from "@/hooks/redux";
import { authSlice } from "@/store/reducers/AuthSlice";
import { userSlice } from "@/store/reducers/UserSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import employeeLayoutCSSVariables from "../styles/layouts/employee-layout.module.scss";

interface ManagerLayoutProps {
    children: React.ReactNode;
}

const ManagerLayout: React.FC<ManagerLayoutProps> = ({ children }) => {
    const router = useRouter();
    const dispatch = useTypedDispatch();

    const { authReset } = authSlice.actions;
    const { resetUser } = userSlice.actions;

    const toRequests = () => {  };
    const toCustomers = () => {  };
    const toEmployees = () => {  };
    const toKnowledgeBase = () => {  };
    const toStats = () => { router.push('/manager/stats'); };

    const logout = () => {
        dispatch(authReset());
        dispatch(resetUser());
        
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
                        { tab: 'База знаний', path: 'knowledge-base', onClick: toKnowledgeBase },
                        { tab: 'Статистика', path: 'stats', onClick: toStats }
                    ]} />
                </div>
                <div id={ employeeLayoutCSSVariables.pageContentId }>
                    { children }
                </div>
            </div>
        </>
    );
};

export default ManagerLayout;
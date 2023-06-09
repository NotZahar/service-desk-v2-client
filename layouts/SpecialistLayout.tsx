import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import { useTypedDispatch } from "@/hooks/redux";
import { authSlice } from "@/store/reducers/AuthSlice";
import { requestsSlice } from "@/store/reducers/RequestsSlice";
import { userInnerMessagesSlice } from "@/store/reducers/UserInnerMessagesSlice";
import { userSlice } from "@/store/reducers/UserSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import employeeLayoutCSSVariables from "../styles/layouts/employee-layout.module.scss";

interface SpecialistLayoutProps {
    children: React.ReactNode;
}

const SpecialistLayout: React.FC<SpecialistLayoutProps> = ({ children }) => {
    const router = useRouter();
    const dispatch = useTypedDispatch();

    const { authReset } = authSlice.actions;
    const { resetUser } = userSlice.actions;
    const { resetRequests } = requestsSlice.actions;
    const { resetUserInnerMessages } = userInnerMessagesSlice.actions;

    const toRequests = () => { 
        router.push('/specialist/requests'); 
    };
    const toEmployees = () => { router.push('/specialist/employees'); };
    const toKnowledgeBase = () => { router.push('/specialist/knowledge-base'); };

    const logout = () => {
        dispatch(authReset());
        dispatch(resetUser());
        
        dispatch(resetRequests());
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

export default SpecialistLayout;
import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import Head from "next/head";
import { useRouter } from "next/router";
import employeeLayoutCSSVariables from "../styles/layouts/employee-layout.module.scss";

interface DispatcherLayoutProps {
    children: React.ReactNode;
}

const DispatcherLayout: React.FC<DispatcherLayoutProps> = ({ children }) => {
    const router = useRouter();

    const toRequests = () => { 
        router.push('/dispatcher/requests'); 
    };
    const toCustomers = () => { router.push('/dispatcher/customers'); };
    const toEmployees = () => { router.push('/dispatcher/employees'); };
    const toKnowledgeBase = () => { router.push('/dispatcher/knowledge-base'); };

    return (
        <>
            <Head>
                <title>{ 'Service Desk' }</title>
            </Head>
            <div id={ employeeLayoutCSSVariables.mainLayoutId }>
                <div id={ employeeLayoutCSSVariables.navbarId }>
                    <UserInfo />
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
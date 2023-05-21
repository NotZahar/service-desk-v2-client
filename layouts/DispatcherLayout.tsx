import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import Head from "next/head";
import employeeLayoutCSSVariables from "../styles/layouts/employee-layout.module.scss";

interface DispatcherLayoutProps {
    children: React.ReactNode;
}

const DispatcherLayout: React.FC<DispatcherLayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>{ 'Service Desk' }</title>
            </Head>
            <div id={ employeeLayoutCSSVariables.mainLayoutId }>
                <div id={ employeeLayoutCSSVariables.navbarId }>
                    <UserInfo />
                    <Navbar tabs={[
                        { tab: 'Заявки', path: 'requests' },
                        { tab: 'Клиенты', path: 'customers' },
                        { tab: 'Сотрудники', path: 'employees' },
                        { tab: 'База знаний', path: 'knowledge-base' }
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
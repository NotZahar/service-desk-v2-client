import Head from "next/head";
import employeeLayoutCSSVariables from "../styles/layouts/employee-layout.module.scss";

interface CustomerLayoutProps {
    children: React.ReactNode;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>{ 'Service Desk' }</title>
            </Head>
            <div id={ employeeLayoutCSSVariables.mainLayoutId }>
                <div id={ employeeLayoutCSSVariables.pageContentId }>
                    { children }
                </div>
            </div>
        </>
    );
};

export default CustomerLayout;
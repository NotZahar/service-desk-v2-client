import Head from "next/head";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>{ 'Service Desk' }</title>
            </Head>
            { children }
        </>
    );
};

export default AuthLayout;
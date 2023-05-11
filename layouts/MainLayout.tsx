import Navbar from "@/components/Navbar";
import Head from "next/head";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>{ 'Service Desk' }</title>
            </Head>
            <Navbar />
            { children }
        </>
    );
};

export default MainLayout;
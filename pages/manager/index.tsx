import ManagerLayout from "@/layouts/ManagerLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
    const router = useRouter();
    
    useEffect(() => {
        router.push('/manager/stats');
    }, []);

    return (
        <>
            <ManagerLayout>
                
            </ManagerLayout>
        </>
    );
};

export default Index;
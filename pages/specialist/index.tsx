import DispatcherLayout from "@/layouts/DispatcherLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
    const router = useRouter();
    
    useEffect(() => {
        router.push('/specialist/requests');
    }, []);

    return (
        <>
            <DispatcherLayout>
                
            </DispatcherLayout>
        </>
    );
};

export default Index;
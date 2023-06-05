import CustomerLayout from "@/layouts/CustomerLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
    const router = useRouter();
    
    useEffect(() => {
        router.push('/customer/requests');
    }, []);

    return (
        <>
            <CustomerLayout>
                
            </CustomerLayout>
        </>
    );
};

export default Index;
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { appealsSlice } from "@/store/reducers/AppealsSlice";
import { authSlice } from "@/store/reducers/AuthSlice";
import { currentAppealSlice } from "@/store/reducers/CurrentAppealSlice";
import { currentRequestSlice } from "@/store/reducers/CurrentRequestSlice";
import { requestsSlice } from "@/store/reducers/RequestsSlice";
import { userCustomerMessagesSlice } from "@/store/reducers/UserCustomerMessagesSlice";
import { userSlice } from "@/store/reducers/UserSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import customerInfoCSSVariables from "../styles/components/CustomerInfo.module.scss";
import Modal from "./Modal";

interface CustomerInfoProps {
    logoutFunction?: MouseEventHandler<HTMLDivElement>;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ logoutFunction }) => {
    const router = useRouter();

    const { authReset } = authSlice.actions;
    const { resetUser } = userSlice.actions;
    const { resetAppeals } = appealsSlice.actions;
    const { resetAppeal } = currentAppealSlice.actions;
    const { resetRequest } = currentRequestSlice.actions;
    const { resetRequests } = requestsSlice.actions;
    const { resetUserCustomerMessages } = userCustomerMessagesSlice.actions;

    const { user } = useTypedSelector(state => state.userReducer);
    const dispatch = useTypedDispatch();

    const [logoutWarningVisible, setLogoutWarningVisible] = useState<boolean>(false);

    const defaultLogoutFunction = () => {
        setLogoutWarningVisible((prev) => !prev);  
    };

    const logout = () => {
        dispatch(authReset());
        dispatch(resetUser());
        
        dispatch(resetRequests());
        dispatch(resetAppeals());
        dispatch(resetAppeal());
        dispatch(resetRequest());
        dispatch(resetUserCustomerMessages());
        
        router.push('/auth/choice');
    };

    const cancelWarning = () => {
        setLogoutWarningVisible((prev) => !prev);  
    };
    
    return (
        <>
            <div id={ customerInfoCSSVariables.userInfoId }>
                <div id={ customerInfoCSSVariables.infoId } title={ `${user?.name} ${user?.email}` }>
                    <Image 
                        src={ '/user.png' } 
                        alt={ 'User' }
                        width={ +customerInfoCSSVariables.userLogoImgWidth }
                        height={ +customerInfoCSSVariables.userLogoImgHeight } />
                    <p>{ `${user?.name} ${user?.email}` }</p>
                </div>
                <div id={ customerInfoCSSVariables.logoutId } onClick={ logoutFunction || defaultLogoutFunction }>
                    <p>Выйти</p>
                </div>
            </div>

            {   logoutWarningVisible && 
                <Modal 
                    title="Вы точно хотите выйти?"
                    buttons={[
                        { className: `${customerInfoCSSVariables.logoutWarningBtns} ${customerInfoCSSVariables.logoutWarningCancel}`, text: 'Отмена', onClick: cancelWarning },
                        { className: customerInfoCSSVariables.logoutWarningBtns, text: 'Выйти', onClick: logout }
                    ]}
                    widthFitContent={ true } />
            }
        </>
    );
};

export default CustomerInfo;
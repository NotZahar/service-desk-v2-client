import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { authSlice } from "@/store/reducers/AuthSlice";
import { userSlice } from "@/store/reducers/UserSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import userInfoCSSVariables from "../styles/components/UserInfo.module.scss";
import Modal from "./Modal";

interface UserInfoProps {
    logoutFunction?: MouseEventHandler<HTMLDivElement>;
}

const UserInfo: React.FC<UserInfoProps> = ({ logoutFunction }) => {
    const router = useRouter();

    const { authReset } = authSlice.actions;
    const { resetUser } = userSlice.actions;
    const { user } = useTypedSelector(state => state.userReducer);
    const dispatch = useTypedDispatch();

    const [logoutWarningVisible, setLogoutWarningVisible] = useState<boolean>(false);

    const defaultLogoutFunction = () => {
        setLogoutWarningVisible((prev) => !prev);  
    };

    const logout = () => {
        dispatch(authReset());
        dispatch(resetUser());
        router.push('/auth/choice');
    };

    const cancelWarning = () => {
        setLogoutWarningVisible((prev) => !prev);  
    };
    
    return (
        <>
            <div id={ userInfoCSSVariables.userInfoId }>
                <div id={ userInfoCSSVariables.infoId } title={ `${user?.name} ${user?.email}` }>
                    <Image 
                        src={ '/user.png' } 
                        alt={ 'User' }
                        width={ +userInfoCSSVariables.userLogoImgWidth }
                        height={ +userInfoCSSVariables.userLogoImgHeight } />
                    <p>{ user?.name }</p>
                </div>
                <div id={ userInfoCSSVariables.logoutId } onClick={ logoutFunction || defaultLogoutFunction }>
                    <p>Выйти</p>
                </div>
            </div>

            {   logoutWarningVisible && 
                <Modal 
                    title="Вы точно хотите выйти?"
                    buttons={[
                        { className: `${userInfoCSSVariables.logoutWarningBtns} ${userInfoCSSVariables.logoutWarningCancel}`, text: 'Отмена', onClick: cancelWarning },
                        { className: userInfoCSSVariables.logoutWarningBtns, text: 'Выйти', onClick: logout }
                    ]}
                    widthFitContent={ true } />
            }
        </>
    );
};

export default UserInfo;
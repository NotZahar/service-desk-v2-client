import { useTypedSelector } from "@/hooks/redux";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import userInfoCSSVariables from "../styles/components/UserInfo.module.scss";
import Modal from "./Modal";

interface UserInfoProps {
    logoutFunction: MouseEventHandler<HTMLButtonElement>;
}

const UserInfo: React.FC<UserInfoProps> = ({ logoutFunction }) => {
    const { user } = useTypedSelector(state => state.userReducer);

    const [logoutWarningVisible, setLogoutWarningVisible] = useState<boolean>(false);

    const askLogoutFunction = () => {
        setLogoutWarningVisible((prev) => !prev);  
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
                <div id={ userInfoCSSVariables.logoutId } onClick={ askLogoutFunction }>
                    <p>Выйти</p>
                </div>
            </div>

            {   logoutWarningVisible && 
                <Modal 
                    title="Вы точно хотите выйти?"
                    buttons={[
                        { className: `${userInfoCSSVariables.logoutWarningBtns} ${userInfoCSSVariables.logoutWarningCancel}`, text: 'Отмена', onClick: cancelWarning },
                        { className: userInfoCSSVariables.logoutWarningBtns, text: 'Выйти', onClick: logoutFunction }
                    ]}
                    widthFitContent={ true } />
            }
        </>
    );
};

export default UserInfo;
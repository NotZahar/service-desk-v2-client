import { storageAuthToken } from "@/helpers/storage-keys";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import userInfoCSSVariables from "../styles/components/UserInfo.module.scss";

interface UserInfoProps {
    logoutFunction?: MouseEventHandler<HTMLDivElement>;
}

const UserInfo: React.FC<UserInfoProps> = ({ logoutFunction }) => {
    const router = useRouter();

    const { resetEmployeeUser } = useActions();

    const { user } = useTypedSelector(state => state.employeeUserReducer);

    const defaultLogoutFunction = () => {
        localStorage.removeItem(storageAuthToken);
        resetEmployeeUser();
        router.push('/auth/choice');
    };
    
    return (
        <>
            <div id={ userInfoCSSVariables.userInfoId }>
                <div id={ userInfoCSSVariables.infoId }>
                    <Image src={ '/user.png' } alt={ 'User' }/>
                    <p title={ user.name }>{ user.name }</p>
                </div>
                <div id={ userInfoCSSVariables.logoutId } onClick={ logoutFunction || defaultLogoutFunction }>
                    <p>Выйти</p>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
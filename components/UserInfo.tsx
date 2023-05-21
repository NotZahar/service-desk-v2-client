import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { authSlice } from "@/store/reducers/AuthSlice";
import { userSlice } from "@/store/reducers/UserSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import userInfoCSSVariables from "../styles/components/UserInfo.module.scss";

interface UserInfoProps {
    logoutFunction?: MouseEventHandler<HTMLDivElement>;
}

const UserInfo: React.FC<UserInfoProps> = ({ logoutFunction }) => {
    const router = useRouter();

    const { authReset } = authSlice.actions;
    const { resetUser } = userSlice.actions;
    const { user } = useTypedSelector(state => state.userReducer);
    const dispatch = useTypedDispatch();

    const defaultLogoutFunction = () => {
        dispatch(authReset());
        dispatch(resetUser());
        router.push('/auth/choice');
    };
    
    return (
        <>
            <div id={ userInfoCSSVariables.userInfoId }>
                <div id={ userInfoCSSVariables.infoId }>
                    <Image src={ '/user.png' } alt={ 'User' }/>
                    <p title={ user?.name }>{ user?.name }</p>
                </div>
                <div id={ userInfoCSSVariables.logoutId } onClick={ logoutFunction || defaultLogoutFunction }>
                    <p>Выйти</p>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
import React, { FC } from "react";
import { AppProps } from "next/app";
import "../styles/global.scss";
import { wrapper } from "@/store";
import { Provider } from "react-redux";

const WrappedApp: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;
    
    return (
        <Provider store={ store }>
            <Component { ...pageProps } />
        </Provider>
    );
};

export default WrappedApp;
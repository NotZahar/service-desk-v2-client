import React, { FC } from "react";
import { AppProps } from "next/app";
import "../styles/global.scss";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";

const store = setupStore();

const WrappedApp: FC<AppProps> = ({ Component, ...pageProps }) => {    
    return (
        <Provider store={ store }>
            <Component { ...pageProps } />
        </Provider>
    );
};

export default WrappedApp;
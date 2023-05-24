import React, { FC } from "react";
import { AppProps } from "next/app";
import "../styles/global.scss";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store } from "@/store/store";

const persistor = persistStore(store);

const WrappedApp: FC<AppProps> = ({ Component, ...pageProps }) => {
    return (
        <Provider store={ store }>
            <PersistGate persistor={ persistor }>
                <Component { ...pageProps } />
            </PersistGate>
        </Provider>
    );
};

export default WrappedApp;
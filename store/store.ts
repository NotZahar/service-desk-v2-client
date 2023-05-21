import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice"; 
import authReducer from "./reducers/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: [] 
}

const rootReducer = combineReducers({
    userReducer,
    authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
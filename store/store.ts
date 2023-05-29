import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice"; 
import authReducer from "./reducers/AuthSlice";
import appealsReducer from "./reducers/AppealsSlice";
import requestsReducer from "./reducers/RequestsSlice";
import customersReducer from "./reducers/CustomersSlice";
import currentAppealReducer from "./reducers/CurrentAppealSlice";
import currentRequestReducer from "./reducers/CurrentRequestSlice";
import currentCustomerReducer from "./reducers/CurrentCustomerSlice";
import appealSelectionReducer from "./reducers/AppealSelectionSlice";
import userCustomerMessagesReducer from "./reducers/UserCustomerMessagesSlice";
import userInnerMessagesReducer from "./reducers/UserInnerMessagesSlice";
import { persistReducer } from "redux-persist";
import createwebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
        return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
        return Promise.resolve(value);
    },
    removeItem(_key: string) {
        return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createwebStorage('local') : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: [
        'appealsReducer', 
        'currentAppealReducer', 
        'appealSelectionReducer',
        'requestsReducer',
        'currentRequestReducer',
        'userCustomerMessagesReducer',
        'userInnerMessagesReducer',
        'customersReducer',
        'currentCustomerReducer'
    ] 
}

const rootReducer = combineReducers({
    userReducer,
    authReducer,
    appealsReducer,
    currentAppealReducer,
    appealSelectionReducer,
    requestsReducer,
    currentRequestReducer,
    userCustomerMessagesReducer,
    userInnerMessagesReducer,
    customersReducer,
    currentCustomerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
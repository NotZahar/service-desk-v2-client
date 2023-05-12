import { Context } from "next-redux-wrapper";
import { legacy_createStore } from "redux";

const makeStore = (context: Context) => legacy_createStore(reducer); // TODO: 

export const wrapper = createWrapper<Store<State>>(makeStore, {debug: true});
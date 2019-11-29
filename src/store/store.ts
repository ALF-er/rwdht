import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import rootReducer, { AppState } from "./rootReducer";

const store = configureStore({
	reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type AppCommand = ThunkAction<void, AppState, null, Action<string>>;

export default store;

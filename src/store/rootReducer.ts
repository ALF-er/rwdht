import { combineReducers } from "@reduxjs/toolkit";

import walletReducer from "~features/wallet/walletSlice";
import exchangeReducer from "~features/exchange/exchangeSlice";

const rootReducer = combineReducers({
	wallet: walletReducer,
	exchange: exchangeReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency, Pockets } from "~types";

export interface WalletState {
	pockets: Pockets;
}

interface ExchangeTransaction {
	currencyFrom: Currency;
	amountFrom: number;
	currencyTo: Currency;
	amountTo: number;
}

const walletInitialState: WalletState = {
	pockets: {
		GBP: {
			currency: Currency.GBP,
			displayName: "British Pound",
			amount: 100
		},
		EUR: {
			currency: Currency.EUR,
			displayName: "Euro",
			amount: 100
		},
		USD: {
			currency: Currency.USD,
			displayName: "American Dollar",
			amount: 100
		}
	}
};

const walletSlice = createSlice({
	name: "wallet",
	initialState: walletInitialState,
	reducers: {
		exchangeTransaction(state, action: PayloadAction<ExchangeTransaction>) {
			const { currencyFrom, amountFrom, currencyTo, amountTo } = action.payload;

			state.pockets[currencyFrom].amount -= amountFrom;
			state.pockets[currencyTo].amount += amountTo;
		}
	}
});

export const { exchangeTransaction } = walletSlice.actions;

export default walletSlice.reducer;

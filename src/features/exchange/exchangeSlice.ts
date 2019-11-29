import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Rates, Currency } from "~types";

export interface ExchangeState {
	rates: Rates;
	base: Currency;
	isLoading: boolean;
	isLoadingFirstTime: boolean;
	error: string | null;
}

interface RatesLoaded {
	rates: Rates;
	base: Currency;
}

const exchangeInitialState: ExchangeState = {
	rates: {
		GBP: 1,
		EUR: 1,
		USD: 1
	},
	base: Currency.USD,
	isLoading: true,
	isLoadingFirstTime: true,
	error: null
};

const exchangeSlice = createSlice({
	name: "exchange",
	initialState: exchangeInitialState,
	reducers: {
		getExchangeRatesStart(state) {
			state.isLoading = true;
			state.error = null;
		},

		getExchangeRatesSuccess(state, action: PayloadAction<RatesLoaded>) {
			const { rates } = action.payload;
			state.rates = rates;

			state.isLoading = false;
			state.isLoadingFirstTime = false;
			state.error = null;
		},

		getExchangeRatesFailure(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.isLoadingFirstTime = false;
			state.error = action.payload;
		}
	}
});

export const {
	getExchangeRatesStart,
	getExchangeRatesSuccess,
	getExchangeRatesFailure
} = exchangeSlice.actions;

export default exchangeSlice.reducer;

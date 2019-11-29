import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "~store/rootReducer";
import { Currency } from "~types";

export const selectFrom = (_: any, from: Currency) => from;
export const selectTo = (_: any, __: Currency, to: Currency) => to;

export const selectExchange = ({ exchange }: AppState) => exchange;

export const selectRates = createSelector(selectExchange, ({ rates }) => rates);
export const selectRatesBase = createSelector(selectExchange, ({ base }) => base);
export const selectRatesIsLoading = createSelector(selectExchange, ({ isLoading }) => isLoading);
export const selectRatesIsLoadingFirstTime = createSelector(
	selectExchange,
	({ isLoadingFirstTime }) => isLoadingFirstTime
);
export const selectRatesError = createSelector(selectExchange, ({ error }) => error);
export const selectRateByCurrencies = createSelector(
	selectRates,
	selectRatesBase,
	selectFrom,
	selectTo,
	(rates, base, from, to) => {
		if (base === from) {
			return rates[to];
		}

		if (base === to) {
			return 1 / rates[from];
		}

		return rates[to] * (1 / rates[from]);
	}
);
export const createRateByCurrenciesSelector = () => selectRateByCurrencies;

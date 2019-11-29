import { useMemo } from "react";
import { useSelector } from "react-redux";

import { Currency } from "~types";
import { createRateByCurrenciesSelector } from "~features/exchange/exchangeSelectors";
import { AppState } from "~store/rootReducer";

export const useRate = (from: Currency, to: Currency) => {
	const selectRateByCurrencies = useMemo(createRateByCurrenciesSelector, []);
	const rate = useSelector((state: AppState) => selectRateByCurrencies(state, from, to));

	return rate;
};

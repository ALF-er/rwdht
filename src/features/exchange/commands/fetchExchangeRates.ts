import { AppCommand } from "~store/store";
import { getExchangeRates } from "~api/ecbAPI";
import {
	getExchangeRatesStart,
	getExchangeRatesSuccess,
	getExchangeRatesFailure
} from "../exchangeSlice";

export const fetchExchangeRates = (): AppCommand => async dispatch => {
	try {
		dispatch(getExchangeRatesStart());

		const { rates, base } = await getExchangeRates();

		const exchangeRates = {
			...rates,
			[base]: 1
		};

		dispatch(getExchangeRatesSuccess({ rates: exchangeRates, base }));
	} catch (err) {
		dispatch(getExchangeRatesFailure(err.toString()));
	}
};

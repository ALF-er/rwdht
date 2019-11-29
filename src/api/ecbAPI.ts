import axios from "axios";
import { Rates, Currency } from "~types";

const API_ENDPOINT = "https://openexchangerates.org/api/latest.json";

export type ExchangeRatesInfo = {
	disclaimer: string;
	license: string;
	timestamp: number;
	base: Currency;
	rates: Rates;
};

export async function getExchangeRates(): Promise<ExchangeRatesInfo> {
	try {
		const response = await axios.get<ExchangeRatesInfo>(API_ENDPOINT, {
			params: {
				app_id: "3819e56486004978a9246200d42284e4",
				base: "USD",
				symbols: "GBP,EUR",
				prettyprint: false
			}
		});

		return response.data;
	} catch (err) {
		throw err;
	}
}

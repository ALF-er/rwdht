import { Currency } from "~types";
import { useRate } from "./useRate";

export const useFormatedRate = (from: Currency, to: Currency) => {
	const rate = useRate(from, to);

	const formatedFrom = new Intl.NumberFormat(navigator.language, {
		style: "currency",
		currency: from
	}).format(1);
	const formatedRate = new Intl.NumberFormat(navigator.language, {
		style: "currency",
		currency: to,
		maximumFractionDigits: 4
	}).format(rate);

	return `${formatedFrom} = ${formatedRate}`;
};

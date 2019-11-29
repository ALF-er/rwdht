import React, { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Currency } from "~types";
import { AppState } from "~store/rootReducer";
import { createPocketByCurrencySelector } from "~features/wallet/walletSelectors";
import { useFormatedRate } from "~utils/useFormatedRate";
import { Wrapper, Title, Tip, Info, Amount } from "../common/common";

interface ToProps {
	amount: number;
}

export const To: FC<ToProps> = ({ amount }) => {
	const { from, to } = useParams() as { from: Currency; to: Currency };

	const currencies = Object.keys(Currency);
	const nextCurrencyExchangeTo = currencies[(currencies.indexOf(to) + 1) % currencies.length];

	const selectPocketByCurrency = useMemo(createPocketByCurrencySelector, []);
	const { amount: maxAmount, displayName } = useSelector((state: AppState) =>
		selectPocketByCurrency(state, to)
	);

	const formatedAmount = new Intl.NumberFormat(navigator.language, {
		style: "currency",
		currency: to
	}).format(maxAmount);

	const amountValue = amount > 0 ? `+${amount}` : "";

	const formatedRate = useFormatedRate(to, from);

	return (
		<Wrapper>
			<Title to={`/${from}/${nextCurrencyExchangeTo}`}>
				{to} &ndash; {displayName}
				<Tip>(Click to change)</Tip>
			</Title>

			<Amount data-testid="TO_AMOUNT">{amountValue}</Amount>

			<Info>
				You have {formatedAmount} | {formatedRate}
			</Info>
		</Wrapper>
	);
};

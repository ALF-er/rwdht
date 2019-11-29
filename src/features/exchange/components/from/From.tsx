import React, { FC, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Currency } from "~types";
import { AppState } from "~store/rootReducer";
import { createPocketByCurrencySelector } from "~features/wallet/walletSelectors";
import { Wrapper, Title, Tip, Info, AmountInput, ErrorInfo } from "../common/common";

interface FromProps {
	amount: number;
	onChange: (amount: number) => void;
}

export const From: FC<FromProps> = ({ amount, onChange }) => {
	const { from, to } = useParams() as { from: Currency; to: Currency };

	const currencies = Object.keys(Currency);
	const nextCurrencyExchangeFrom = currencies[(currencies.indexOf(from) + 1) % currencies.length];

	const selectPocketByCurrency = useMemo(createPocketByCurrencySelector, []);
	const { amount: maxAmount, displayName } = useSelector((state: AppState) =>
		selectPocketByCurrency(state, from)
	);

	const formatedAmount = new Intl.NumberFormat(navigator.language, {
		style: "currency",
		currency: from
	}).format(maxAmount);

	const amountInputValue = amount > 0 ? `-${amount}` : "";
	const onAmountChange = useCallback(
		({ target }) => {
			const value = Math.abs(parseFloat(target.value));

			onChange(value > 0 ? (value < maxAmount ? value : maxAmount) : 0);
		},
		[onChange]
	);

	return (
		<Wrapper>
			<Title to={`/${nextCurrencyExchangeFrom}/${to}`}>
				{from} &ndash; {displayName}
				<Tip>(Click to change)</Tip>
			</Title>

			{maxAmount > 0 ? (
				<AmountInput
					type="number"
					min={-maxAmount}
					max={0}
					step={0.01}
					value={amountInputValue}
					data-testid="FROM_AMOUNT_INPUT"
					onChange={onAmountChange}
				/>
			) : (
				<ErrorInfo data-testid="INSUFFICIENT_FUNDS">Insufficient funds</ErrorInfo>
			)}

			<Info>You have {formatedAmount}</Info>
		</Wrapper>
	);
};

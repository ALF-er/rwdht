import React, { FC, useState, useCallback, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import { Currency } from "~types";

import { useFormatedRate } from "~utils/useFormatedRate";
import { useRate } from "~utils/useRate";
import { roundNumberToPlaces } from "~utils/roundNumberToPlaces";

import { AppLink } from "~components/appLink/AppLink";
import { From } from "../from/From";
import { To } from "../to/To";
import { ExchangeButton } from "../common/common";
import { useDispatch, useSelector } from "react-redux";
import { exchangeTransaction } from "~features/wallet/walletSlice";
import { selectRatesIsLoadingFirstTime } from "~features/exchange/exchangeSelectors";

const Wrapper = styled.form`
	border-top: 2px solid white;
`;

const Title = styled.h2`
	color: white;
	padding: 0 2rem;
	margin: 0.83rem 0 0;
`;

const Rate = styled.h4`
	color: white;
	padding: 0 2rem;
	margin: 0.83rem 0 0;
`;

const Parts = styled.article`
	height: 200px;
	display: flex;
	font-size: 4rem;
	align-items: center;
	color: white;
`;

export const Exchange: FC = () => {
	const { from, to } = useParams() as { from: Currency; to: Currency };

	const formatedRate = useFormatedRate(from, to);
	const rate = useRate(from, to);
	const isLoadingFirstTime = useSelector(selectRatesIsLoadingFirstTime);

	const [fromAmount, setFromAmount] = useState(0);
	const [toAmount, setToAmount] = useState(0);

	const onFromChange = useCallback(
		amount => {
			setFromAmount(amount);
			setToAmount(roundNumberToPlaces(amount * rate, 2));
		},
		[setFromAmount, setToAmount, rate]
	);

	useEffect(() => setToAmount(roundNumberToPlaces(fromAmount * rate, 2)), [rate]);

	const dispatch = useDispatch();
	const history = useHistory();
	const onExchangeSubmit = useCallback(
		evt => {
			evt.preventDefault();

			if (isLoadingFirstTime === false && fromAmount > 0) {
				dispatch(
					exchangeTransaction({
						currencyFrom: from,
						amountFrom: fromAmount,
						currencyTo: to,
						amountTo: toAmount
					})
				);

				history.push(`/${from}`);
			}
		},
		[dispatch, history, isLoadingFirstTime, from, to, fromAmount, toAmount]
	);

	const rateText = isLoadingFirstTime ? "Loading rates..." : `Rate ${formatedRate}`;

	return (
		<Wrapper onSubmit={onExchangeSubmit} data-testid="EXCHANGE">
			<Title>Exchange</Title>
			<Rate data-testid="RATE">{rateText}</Rate>

			{!isLoadingFirstTime && (
				<Parts>
					<From amount={fromAmount} onChange={onFromChange} />
					&gt;
					<To amount={toAmount} />
				</Parts>
			)}

			<AppLink icon="←" to={`/${from}`}>
				Wallet
			</AppLink>

			<ExchangeButton
				icon="✓"
				type="submit"
				disabled={fromAmount === 0}
				data-testid="SUBMIT_BUTTON"
			>
				Exchange
			</ExchangeButton>
		</Wrapper>
	);
};

import React, { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Currency } from "~types";
import { AppState } from "~store/rootReducer";
import { createPocketByCurrencySelector } from "~features/wallet/walletSelectors";

interface PocketProps {
	currency: Currency;
}

const Wrapper = styled(NavLink)`
	display: flex;
	height: 90%;
	margin: 0 10px;
	text-decoration: none;
	color: white;
	opacity: 0.6;
	outline: none;
	border-bottom: 1px solid white;

	flex: 1 1 0%;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;

	transition: height 500ms, flex-basis 500ms, opacity 500ms;

	&.active {
		height: 100%;
		flex-basis: 20%;
		opacity: 1;
	}

	&:hover,
	&:focus {
		opacity: 1;
	}
`;

const Title = styled.h3`
	margin: 0;
`;

const Amount = styled.p`
	font-size: 3em;
	margin: 0;
`;

export const Pocket: FC<PocketProps> = ({ currency }) => {
	const selectPocketByCurrency = useMemo(createPocketByCurrencySelector, []);
	const { amount, displayName } = useSelector((state: AppState) =>
		selectPocketByCurrency(state, currency)
	);

	const formatedAmount = new Intl.NumberFormat(navigator.language, {
		style: "currency",
		currency
	}).format(amount);

	return (
		<Wrapper to={currency} data-testid={`POCKET_${currency}`}>
			<Title data-testid="TITLE">
				{currency} &ndash; {displayName}
			</Title>

			<Amount data-testid="AMOUNT">{formatedAmount}</Amount>
		</Wrapper>
	);
};

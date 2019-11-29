import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Currency } from "~types";
import { selectPocketsList } from "~features/wallet/walletSelectors";

import { AppLink } from "~components/appLink/AppLink";
import { Pocket } from "../pocket/Pocket";

const Wrapper = styled.article`
	border-top: 2px solid white;
`;

const Title = styled.h2`
	color: white;
	padding: 0 2rem;
`;

const Pockets = styled.article`
	width: 100%;
	height: 200px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
`;

export const Wallet: FC = () => {
	const pockets = useSelector(selectPocketsList);
	const { currentCurrency = "" } = useParams();

	const currencies = Object.keys(Currency);
	const currencyExchangeTo =
		currencies[(currencies.indexOf(currentCurrency) + 1) % currencies.length];

	return (
		<Wrapper data-testid="WALLET">
			<Title>Wallet</Title>

			<Pockets>
				{pockets.map(({ currency }) => (
					<Pocket key={currency} currency={currency} />
				))}
			</Pockets>

			<AppLink icon="⇄" to={`/${currentCurrency}/${currencyExchangeTo}`}>
				Exchange
			</AppLink>
		</Wrapper>
	);
};

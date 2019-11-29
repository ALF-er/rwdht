import React from "react";
import { Switch, Route, BrowserRouter, Redirect, RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInterval from "@use-it/interval";

import { Currency } from "~types";

import { Wallet } from "~features/wallet/components/wallet/Wallet";
import { Exchange } from "~features/exchange/components/exchange/Exchange";
import { fetchExchangeRates } from "~features/exchange/commands/fetchExchangeRates";

// Check is Wallet gets correct params
const renderWallet = ({
	match: {
		params: { currentCurrency = "" }
	}
}: RouteComponentProps<{ currentCurrency: string }>) => {
	const currencies = Object.keys(Currency);

	if (!currencies.includes(currentCurrency)) {
		return <Redirect to={Currency.GBP} />;
	}

	return <Wallet />;
};

// Check is Exchange gets correct params
const renderExchange = ({
	match: {
		params: { from = "", to = "" }
	},
	location: { pathname }
}: RouteComponentProps<{ from: string; to: string }>) => {
	let currencies = Object.keys(Currency);

	if (!currencies.includes(from)) {
		currencies.reverse();

		from = currencies.includes(to)
			? currencies[(currencies.indexOf(to) + 1) % currencies.length]
			: Currency.GBP;
	}

	if (!currencies.includes(to) || from === to) {
		currencies = Object.keys(Currency);

		to = currencies.includes(from)
			? currencies[(currencies.indexOf(from) + 1) % currencies.length]
			: Currency.EUR;
	}

	if (`/${from}/${to}` !== pathname) {
		return <Redirect to={`/${from}/${to}`} />;
	}

	return <Exchange />;
};

export const Root = () => {
	const dispatch = useDispatch();

	useInterval(() => dispatch(fetchExchangeRates()), 10000);
	dispatch(fetchExchangeRates());

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/:currentCurrency" render={renderWallet} />
				<Route exact path="/:from/:to" render={renderExchange} />
				<Redirect to={`/${Currency.GBP}`} />
			</Switch>
		</BrowserRouter>
	);
};

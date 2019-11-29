import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "~store/rootReducer";
import { Currency } from "~types";

export const selectCurrency = (_: any, currency: Currency) => currency;

export const selectWallet = ({ wallet }: AppState) => wallet;

export const selectPockets = createSelector(selectWallet, ({ pockets }) => pockets);
export const selectPocketsList = createSelector(selectPockets, pockets => Object.values(pockets));
export const selectPocketByCurrency = createSelector(
	selectPockets,
	selectCurrency,
	(pockets, currency) => pockets[currency]
);
export const createPocketByCurrencySelector = () => selectPocketByCurrency;

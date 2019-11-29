import React from "react";
import { Route } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

import { renderWithReduxAndRouter } from "~utils/renderWithReduxAndRouter";

import { Exchange } from "./Exchange";

const preloadedState = {
	exchange: {
		rates: {
			GBP: 1,
			EUR: 2,
			USD: 3
		},
		base: "USD",
		isLoading: false,
		isLoadingFirstTime: false,
		error: null
	},
	wallet: {
		pockets: {
			GBP: {
				currency: "GBP",
				displayName: "British Pound",
				amount: 100
			},
			EUR: {
				currency: "EUR",
				displayName: "Euro",
				amount: 100
			},
			USD: {
				currency: "USD",
				displayName: "American Dollar",
				amount: 0
			}
		}
	}
};

test("can render with defaults", () => {
	const { getByTestId } = renderWithReduxAndRouter(
		<Route exact path="/:from/:to">
			<Exchange />
		</Route>,
		{ route: "/GBP/EUR" }
	);

	expect(getByTestId("RATE")).toHaveTextContent("Loading rates...");
});

test("can render with loaded rates", () => {
	const { getByTestId } = renderWithReduxAndRouter(
		<Route exact path="/:from/:to">
			<Exchange />
		</Route>,
		{ route: "/GBP/EUR", preloadedState }
	);

	expect(getByTestId("RATE")).toHaveTextContent("Rate £1.00 = €2.00");
	expect(getByTestId("SUBMIT_BUTTON")).toHaveAttribute("disabled");
});

test("propperly calculate amount of exchange", () => {
	const { getByTestId } = renderWithReduxAndRouter(
		<Route exact path="/:from/:to">
			<Exchange />
		</Route>,
		{ route: "/GBP/EUR", preloadedState }
	);

	const fromInput = getByTestId("FROM_AMOUNT_INPUT") as HTMLInputElement;
	const toValue = getByTestId("TO_AMOUNT");

	expect(fromInput.value).toMatch("");
	expect(toValue).toHaveTextContent("");

	fireEvent.change(fromInput, { target: { value: "10" } });

	expect(fromInput.value).toMatch("-10");
	expect(toValue).toHaveTextContent("+20");
});

test("show alert if you have insufficient funds", () => {
	const { getByTestId } = renderWithReduxAndRouter(
		<Route exact path="/:from/:to">
			<Exchange />
		</Route>,
		{ route: "/USD/EUR", preloadedState }
	);

	expect(getByTestId("INSUFFICIENT_FUNDS")).toBeInTheDocument();
});

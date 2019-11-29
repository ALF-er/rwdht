import React from "react";

import { renderWithReduxAndRouter } from "~utils/renderWithReduxAndRouter";

import { Wallet } from "./Wallet";

test("can render with defaults", () => {
	const { getAllByTestId } = renderWithReduxAndRouter(<Wallet />);

	expect(getAllByTestId(/POCKET_/i)).toHaveLength(3);
});

test("should generate proper link for Exchange button", () => {
	const { getByText } = renderWithReduxAndRouter(<Wallet />);

	// double slash because :from part provided by router
	expect(getByText("Exchange")).toHaveAttribute("href", "//GBP");
});

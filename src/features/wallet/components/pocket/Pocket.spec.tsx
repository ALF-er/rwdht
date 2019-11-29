import React from "react";

import { Currency } from "~types";
import { renderWithReduxAndRouter } from "~utils/renderWithReduxAndRouter";

import { Pocket } from "./Pocket";

test("can render with defaults", () => {
	const { getByTestId } = renderWithReduxAndRouter(<Pocket currency={Currency.GBP} />);

	expect(getByTestId("TITLE")).toHaveTextContent("GBP – British Pound");
	expect(getByTestId("AMOUNT")).toHaveTextContent("£100.00");
});

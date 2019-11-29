import React from "react";
import axios, { AxiosStatic } from "axios";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import { App } from "./App";

const mockedAxios = (axios as unknown) as jest.Mocked<AxiosStatic>;

beforeAll(() => {
	mockedAxios.get.mockResolvedValue({
		data: {
			disclaimer: "",
			license: "",
			timestamp: 1,
			base: "USD",
			rates: {
				USD: 1,
				GBP: 2,
				EUR: 3
			}
		}
	});
});

test("can render with defaults", () => {
	const { getByTestId } = render(<App />);

	expect(getByTestId("WALLET")).toBeInTheDocument();
	expect(mockedAxios.get).toHaveBeenCalledTimes(1);
});

test("can switch to Exchange", () => {
	const { getByText, getByTestId } = render(<App />);

	fireEvent.click(getByText("Exchange"));

	expect(getByTestId("EXCHANGE")).toBeInTheDocument();
});

test("can switch from Exchange", () => {
	const { getByText, getByTestId } = render(<App />);

	fireEvent.click(getByText("Exchange"));
	fireEvent.click(getByText("Wallet"));

	expect(getByTestId("WALLET")).toBeInTheDocument();
});

test("can exchange some money", async () => {
	const { getByText, getByTestId } = render(<App />);

	fireEvent.click(getByText("Exchange"));

	const fromInput = await waitForElement(
		() => getByTestId("FROM_AMOUNT_INPUT") as HTMLInputElement
	);
	fireEvent.change(fromInput, { target: { value: "10" } });

	fireEvent.click(getByTestId("SUBMIT_BUTTON"));

	expect(getByTestId("POCKET_GBP")).toHaveTextContent("GBP – British Pound£90.00");
	expect(getByTestId("POCKET_EUR")).toHaveTextContent("EUR – Euro€115.00");
});

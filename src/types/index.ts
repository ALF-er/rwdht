export enum Currency {
	GBP = "GBP",
	EUR = "EUR",
	USD = "USD"
}

export interface Pocket {
	currency: Currency;
	displayName: string;
	amount: number;
}

export type Pockets = Record<Currency, Pocket>;

export type Rates = Record<Currency, number>;

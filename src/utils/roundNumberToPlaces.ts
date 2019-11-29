export const roundNumberToPlaces = (num: number, places: number) =>
	Number(Math.round(Number(num + "e+" + places)) + "e-" + places);

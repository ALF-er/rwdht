import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import rootReducer from "~store/rootReducer";

export const renderWithReduxAndRouter = (
	ui: ReactNode,
	{
		preloadedState,
		store = configureStore({
			reducer: rootReducer,
			preloadedState
		}),
		route = "/",
		history = createMemoryHistory({ initialEntries: [route] })
	}: { preloadedState?: any; store?: any; route?: string; history?: any } = {}
) => ({
	...render(
		<Provider store={store}>
			<Router history={history}>{ui}</Router>
		</Provider>
	),
	history,
	store
});

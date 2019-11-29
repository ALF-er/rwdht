import React from "react";
import { Provider } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";

import store from "~store/store";

import { Root } from "../root/Root";

const GlobalStyle = createGlobalStyle`
	html {
		width: 100%;
		height: 100%;
	}

	body {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

		background: rgb(7, 0, 130);
		background: linear-gradient(
			18deg,
			rgb(30, 22, 156) 0%,
			rgb(70, 70, 204) 35%,
			rgb(185, 56, 175) 100%
		);
	}

	body * {
		box-sizing: border-box;
	}
`;

const Title = styled.h1`
	color: white;
	padding: 0 2rem;
`;

export const App = () => (
	<>
		<GlobalStyle />

		<Provider store={store}>
			<Title>Revolut. Web Development Home Task</Title>

			<Root />
		</Provider>
	</>
);

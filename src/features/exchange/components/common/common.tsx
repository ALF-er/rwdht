import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.section`
	display: flex;
	height: 100%;
	text-decoration: none;
	color: white;
	opacity: 0.6;
	outline: none;
	border-bottom: 1px solid white;
	font-size: 1rem;

	flex: 1 1 0%;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;

	transition: opacity 500ms;

	&:first-of-type {
		margin: 0 0 0 10px;
	}
	&:last-of-type {
		margin: 0 10px 0 0;
	}

	&:hover {
		opacity: 1;
	}
`;

export const Title = styled(Link)`
	margin: 0;
	text-decoration: none;
	color: white;
	outline: none;
	font-weight: bold;
`;

export const Tip = styled.span`
	margin: 0 0 0 0.8em;
	font-weight: normal;
	font-size: 0.7em;
`;

export const Info = styled.p`
	font-size: 0.7rem;
	margin: 0;
`;

export const AmountInput = styled.input`
	font-size: 3em;
	width: 80%;
	height: 1.15em;
	text-align: center;
	background: transparent;
	border: none;
	color: white;
	outline: none;
	padding: 0;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const Amount = styled.p`
	font-size: 3em;
	width: 80%;
	height: 1.15em;
	text-align: center;
	color: white;
	outline: none;
	margin: 0;
	line-height: 1em;
`;

export const ErrorInfo = styled.p`
	font-size: 2.5em;
	width: 80%;
	height: 1.15em;
	text-align: center;
	color: deeppink;
	outline: none;
	margin: 0;
	line-height: 1em;
`;

export const ExchangeButton = styled.button<{ icon: string }>`
	display: inline-block;
	text-decoration: none;
	margin: 2rem;
	padding: 0.5rem;
	color: white;
	outline: none;
	border: 1px solid transparent;
	background: transparent;
	cursor: pointer;
	font-size: 1rem;

	&::before {
		content: "${props => props.icon}";
		margin-right: 0.5em;
	}

	&:disabled {
		pointer-events: none;
		opacity: 0.6;
	}

	&:hover,
	&:focus {
		border-color: white;
	}
`;

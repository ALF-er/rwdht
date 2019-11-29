import styled from "styled-components";
import { Link } from "react-router-dom";

export const AppLink = styled(Link)<{ icon: string }>`
	display: inline-block;
	text-decoration: none;
	margin: 2rem;
	padding: 0.5rem;
	color: white;
	outline: none;
	border: 1px solid transparent;
	font-size: 1rem;

	&::before {
		content: "${props => props.icon}";
		margin-right: 0.5em;
	}

	&:hover,
	&:focus {
		border-color: white;
	}
`;

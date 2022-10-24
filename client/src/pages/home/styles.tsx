import styled from 'styled-components';
import { theme } from '../../constants';

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

export const Header = styled.header`
	background-color: ${theme.secondary};
	color: ${theme.light};
	padding: 1rem;

	display: flex;
	justify-content: space-between;
	gap: 2rem;
	grid-area: header;

	i, h1 {
		font-size: 1.5rem;
		align-self: center;
	}

	h1 > span {
		font-size: 1rem;
	}
`;

export const Content = styled.main`
	grid-area: main;
	display: grid;
	grid-template-areas: "dash dash" "create pending";
	grid-template-columns: 1fr 1.5fr;
	column-gap: 1rem;
`;

export const DashSection = styled.section`
	min-height: 40vh;
	width: 100%;
	background-image: linear-gradient(to right, #5BBFBA, #5F6CAF);
	color: white;
	padding: 15px;
	border-radius: 10px;
	display: grid;
	grid-template-areas: "text values";
	grid-template-columns: 1fr 1fr;
	gap: 70px;
	grid-area: dash;
`;

export const TextDash = styled.div``;

export const ValuesDashWarper = styled.div`
	display: flex;
	align-items: end;
	justify-content: space-around;

	input::-webkit-outer-spin-button, input-::-webkit-inner-spin-button {
		--webkit-appearance: none;
	}
	input[type=number] {
		-moz-appearance: textfield;
	}
`;

export const ValuesDash = styled.p`
	color: ${theme.thertiary};
	font-size: 4rem;
	display: flex;
	align-items: center;
`;

export const ValuesDashLegend = styled.span`
	color: #FFF;
	font-size: 1rem;
`;

export const CreateQuoteFormWarper = styled.section`
	grid-area: create;
`;

export const PendingQuotes = styled.section`
	grid-area: pending;
`;

import { createGlobalStyle } from 'styled-components';

import { theme } from '../constants';

export const GlobalStyle = createGlobalStyle`
	html, body {
		padding: 0;
		margin: 0;
		font-family: Roboto, Oxygen, Segoe UI, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		background-color: ${theme.light};
		color: ${theme.dark};
	}

	main {
		padding-inline: 1rem;
		padding-block: 2rem;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	* {
		box-sizing: border-box;
	}
`;

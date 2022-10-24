import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';

import { GlobalStyle } from '../styles/global';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Wet Bat</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />

				<link rel='icon' href='/favicon.ico' />
			</Head>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;

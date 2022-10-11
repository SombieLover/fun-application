import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Appbar } from '../components/appbar/appbar';

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Welcome to frontend!</title>
			</Head>
			<main className="container-fluid">
				<Appbar />
				<Component {...pageProps} />
			</main>
		</>
	);
}

export default CustomApp;

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { captureException as SentryCaptureException } from '@sentry/browser';

process.on('unhandledRejection', err => SentryCaptureException(err));
process.on('uncaughtException', err =>  SentryCaptureException(err));

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}
	render() {
		return (
			<Html className='infocasas-theme' id='bodyTag'>
				<Head>
					<script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' async></script>
					<script src='https://accounts.google.com/gsi/client' async defer></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

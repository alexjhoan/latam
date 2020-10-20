import { AuthModal } from "../shared-components/Components/User/AuthModal/web";
import React from "react";
import { OneTapSignIn } from "../shared-components/Components/User/OneTapSignIn/web";

export function withAuth(PageComponent) {
	const withAuth = ({ ...pageProps }) => {
		return (
			<>
				<AuthModal />
				<OneTapSignIn />
				<PageComponent {...pageProps} />
			</>
		);
	};

	if (PageComponent.getInitialProps) {
		withAuth.getInitialProps = async ctx => {
			let pageProps = {};
			if (PageComponent.getInitialProps) {
				pageProps = await PageComponent.getInitialProps(ctx);
			}

			return {
				...pageProps,
			};
		};
	}

	return withAuth;
}

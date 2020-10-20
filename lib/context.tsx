import React from 'react';
import { DummyContextProvider } from '../shared-components/Contexts/Dummy/context';
import { FiltersContextProvider } from '../shared-components/Contexts/Filters/context';
import { ConfigurationsProvider } from '../shared-components/Contexts/Configurations/context';
import { ThemeProvider } from '../shared-components/Contexts/Theme/context';

export function withContext(
	PageComponent,
	{
		withDummyContext = false,
		withThemeContext = true,
		withConfigContext = true,
		withFiltersContext = true,
	}: {
		withDummyContext?: boolean;
		withThemeContext?: boolean;
		withConfigContext?: boolean;
		withFiltersContext?: boolean;
	}
) {
	const withContext = ({ ...pageProps }) => {
		return (
			<DummyContextProvider
				active={withDummyContext}
				initialState={pageProps?.DummyContextInitialState}>
				<ThemeProvider active={withThemeContext}>
					<ConfigurationsProvider
						active={withConfigContext}
						initialState={pageProps?.ConfigContextInitialState}>
						<FiltersContextProvider
							active={withFiltersContext}
							initialState={pageProps?.FiltersContextInitialState}>
							<PageComponent {...pageProps} />
						</FiltersContextProvider>
					</ConfigurationsProvider>
				</ThemeProvider>
			</DummyContextProvider>
		);
	};

	if (PageComponent.getInitialProps) {
		withContext.getInitialProps = async ctx => {
			let pageProps = {};
			if (PageComponent.getInitialProps) {
				pageProps = await PageComponent.getInitialProps(ctx);
			}

			return {
				...pageProps,
				//add other props if desired hola3:"q onda",
			};
		};
	}

	return withContext;
}

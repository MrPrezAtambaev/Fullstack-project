import { AppProps } from "next/app";
import Head from "next/head";
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from "@mantine/core";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalsProvider } from "@mantine/modals";
import { modals } from "@/components/modals";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";

declare module "@mantine/modals" {
	export interface MantineModalsOverride {
		modals: typeof modals;
	}
}

export default function App(props: AppProps) {
	const {
		Component,
		pageProps: { session, ...pageProps },
	} = props;

	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
	return (
		<>
			<Head>
				<title>Todo List</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link
					rel="shortcut icon"
					href="https://www.sketchappsources.com/resources/source-image/sketch-3-todo-list-app-icon-template.png"
					type="image/x-icon"
				/>
			</Head>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ColorSchemeProvider
						colorScheme={colorScheme}
						toggleColorScheme={toggleColorScheme}
					>
						<MantineProvider
							withGlobalStyles
							withNormalizeCSS
							theme={{
								primaryColor: "violet",
								colorScheme,
								loader: "bars",
							}}
						>
							<ModalsProvider modals={modals}>
								<SessionProvider session={session}>
									<Notifications />
									<Component {...pageProps} />
								</SessionProvider>
							</ModalsProvider>
						</MantineProvider>
					</ColorSchemeProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</Provider>
		</>
	);
}

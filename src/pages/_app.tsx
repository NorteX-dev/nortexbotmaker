import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/util/theme";
import BlueprintProvider from "@/providers/BlueprintProvider";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<BlueprintProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</BlueprintProvider>
		</ChakraProvider>
	);
}

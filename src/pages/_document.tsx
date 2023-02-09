import { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import theme from "@/util/theme";
import { ColorModeScript } from "@chakra-ui/react";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

import "@fontsource/poppins";
import "./globals.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider theme={{ colorScheme: "dark" }} withCSSVariables withGlobalStyles withNormalizeCSS>
			<App />
		</MantineProvider>
	</React.StrictMode>
);

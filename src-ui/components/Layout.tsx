import type { ReactNode } from "react";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<style jsx global>{`
				* {
					font-family: ${inter.style.fontFamily};
				}
			`}</style>
			{children}
		</>
	);
}

import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div style={{ display: "flex", overflowY: "hidden" }}>
			<Sidebar />
			<main style={{ overflowY: "auto", width: "100%", height: "100vh", position: "relative" }}>{children}</main>
		</div>
	);
}

import { ReactNode } from "react";
import ViewProvider from "@/providers/ViewProvider";

export default function Providers({ children }: { children: ReactNode }) {
	return <ViewProvider>{children}</ViewProvider>;
}

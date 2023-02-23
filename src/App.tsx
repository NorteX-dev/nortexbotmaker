import { useView } from "@/providers/ViewProvider";
import Layout from "@/components/Layout";
import Providers from "@/providers/Providers";

export default function App() {
	return (
		<Providers>
			<AppWithProviders />
		</Providers>
	);
}

function AppWithProviders() {
	const { view } = useView();

	return <Layout>{view}</Layout>;
}

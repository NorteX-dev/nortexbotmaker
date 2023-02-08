import BlueprintContainer from "@/components/BlueprintContainer";
import { useKeybind } from "@/hooks/useKeybind";
import ContextMenu from "@/components/ContextMenu";

const ctxMenu = [{ name: "Element", action: () => {} }];

export default function Home() {
	useKeybind("a", () => {}, { ctrl: true });

	return (
		<>
			<BlueprintContainer />
			<ContextMenu elements={ctxMenu}></ContextMenu>
			{/*<pre>{JSON.stringify(blueprint, null, 2)}</pre>*/}
		</>
	);
}

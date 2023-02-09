import BlueprintContainer from "@/components/BlueprintContainer";
import { useKeybind } from "@/hooks/useKeybind";
import React from "react";
import RightClickContextMenuHandler from "@/components/RightClickContextMenuHandler";

export default function Home() {
	useKeybind("a", () => {}, { ctrl: true });

	return (
		<>
			<BlueprintContainer />
			<RightClickContextMenuHandler />
			{/*<pre>{JSON.stringify(blueprint, null, 2)}</pre>*/}
		</>
	);
}

import BlueprintContainer from "@/components/BlueprintContainer";
import { useKeybind } from "@/hooks/useKeybind";
import React, { useEffect } from "react";
import RightClickContextMenuHandler from "@/components/RightClickContextMenuHandler";
import { createNode } from "@/handlers/createNode";
import { listen } from "@tauri-apps/api/event";
import { useProject } from "@/providers/ProjectProvider";

export default function Home() {
	// Ctrl + A
	useKeybind(
		"a",
		() => {
			createNode({ x: 0, y: 0 });
		},
		{ ctrl: true }
	);

	const { updateProject } = useProject();

	useEffect(() => {
		let unlisten: (() => void) | undefined;

		(async () => {
			unlisten = await listen("update-project", (event) => {
				console.log(event);
				updateProject();
			});
		})();

		return () => {
			if (unlisten) unlisten();
		};
	}, []);

	return (
		<>
			<BlueprintContainer />
			<RightClickContextMenuHandler />
			{/*<pre>{JSON.stringify(blueprint, null, 2)}</pre>*/}
		</>
	);
}

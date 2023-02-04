import { invoke } from "@tauri-apps/api/tauri";
import { save } from "@tauri-apps/api/dialog";
import { useBlueprint } from "@/providers/BlueprintProvider";
import BlueprintContainer from "@/components/BlueprintContainer";

export default function Home() {
	const blueprint = useBlueprint();

	// async function saveProject() {
	// 	const filePath = await save({
	// 		filters: [{ name: "NDBC Project", extensions: ["ndbc"] }],
	// 		title: "Save Project",
	// 	});
	// 	await invoke("save_project", { filePath }).then((res) => console.log("response", res));
	// }

	return (
		<>
			<BlueprintContainer />
			<pre>{JSON.stringify(blueprint, null, 2)}</pre>
		</>
	);
}

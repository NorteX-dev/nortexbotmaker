import { invoke } from "@tauri-apps/api/tauri";

export function createNode({ x, y }: { x: number; y: number }) {
	invoke("add_node", { name: "New Node", position: [x, y] }).then((r) => {
		console.log("Created node", r);
	});
}

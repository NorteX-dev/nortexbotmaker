import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export interface Blueprint {
	nodes: BpNode[];
}

export interface BpNode {
	id: number;
	name: string;
	color: string;
	connections: number[];
	position: number[];
}

export const BlueprintContext = createContext<any>(null);

export default function BlueprintProvider({ children }: { children: ReactNode }) {
	const [blueprint, setBlueprint] = useState<Blueprint | null>(null);

	async function getCurrentBlueprint() {
		await invoke<Blueprint>("get_blueprint").then((bp) => {
			setBlueprint(bp);
		});
	}

	async function saveBlueprint() {
		await invoke("save_blueprint", { blueprint });
	}

	useEffect(() => {
		getCurrentBlueprint();
		// Context menu remover:
		// const handleContextMenu = (e: MouseEvent) => {
		// 	e.preventDefault();
		// };
		// document.addEventListener("contextmenu", handleContextMenu);
		// return () => {
		// 	document.removeEventListener("contextmenu", handleContextMenu);
		// };
	}, []);

	return (
		<BlueprintContext.Provider value={{ blueprint, setBlueprint, saveBlueprint }}>
			{children}
		</BlueprintContext.Provider>
	);
}

export function useBlueprint() {
	return useContext(BlueprintContext);
}

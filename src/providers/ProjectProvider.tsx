import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { setIn } from "immutable";

export interface BpNode {
	id: number;
	name: string;
	color: string;
	connections: number[];
	position: number[];
}

export interface Blueprint {
	nodes: BpNode[];
}

export interface Project {
	blueprint: Blueprint;
}

export const ProjectContext = createContext<any>(null);

export default function ProjectProvider({ children }: { children: ReactNode }) {
	const [project, setProject] = useState<Project | null>(null);

	async function getProject() {
		await invoke<Project>("get_project").then((proj) => {
			setProject(proj);
		});
	}

	useEffect(() => {
		const i = setInterval(() => {
			console.log("Updating project");
			getProject();
		}, 3000);
		return () => {
			clearInterval(i);
		};
	}, []);

	return <ProjectContext.Provider value={{ project, setProject }}>{children}</ProjectContext.Provider>;
}

export function useProject() {
	return useContext(ProjectContext);
}

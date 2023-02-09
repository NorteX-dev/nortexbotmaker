import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

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

	async function updateProject() {
		await invoke<Project>("get_project").then((proj) => {
			setProject(proj);
		});
	}

	useEffect(() => {
		updateProject();
	}, []);

	return <ProjectContext.Provider value={{ project, setProject, updateProject }}>{children}</ProjectContext.Provider>;
}

export function useProject() {
	return useContext(ProjectContext);
}

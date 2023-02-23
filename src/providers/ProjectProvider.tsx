import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
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

interface ProjectContext {
	project: Project | null;
	setProject: Dispatch<SetStateAction<Project | null>>;
	refreshProject: () => void;
	setBlueprint: (cb: (blueprint: Blueprint) => Blueprint) => void;
}

export const ProjectContext = createContext<any>(null);

export default function ProjectProvider({ children }: { children: ReactNode }) {
	const [project, setProject] = useState<Project | null>(null);

	async function refreshProject() {
		await invoke<Project>("get_project").then((proj: Project) => {
			setProject(proj);
		});
	}

	function setBlueprint(cb: (blueprint: Blueprint) => Blueprint) {
		setProject((project: Project | null) => {
			if (!project) return null;
			return {
				...project,
				blueprint: cb(project.blueprint),
			};
		});
	}

	useEffect(() => {
		refreshProject();
	}, []);

	const contextValue: ProjectContext = { project, setProject, refreshProject, setBlueprint };

	return <ProjectContext.Provider value={contextValue}>{children}</ProjectContext.Provider>;
}

export function useProject() {
	return useContext(ProjectContext);
}

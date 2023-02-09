import React, { useEffect, useState } from "react";
import Node from "@/components/Node";
import classes from "../styles/Blueprint.module.scss";
import { BpNode, Project, useProject } from "@/providers/ProjectProvider";

export default function BlueprintContainer() {
	const [pressing, setPressing] = useState<boolean>(false);
	const [panning, setPanning] = useState<boolean>(true);
	const [canvasPosition, setCanvasPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	const { project, setProject } = useProject();

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.button !== 0) return;
		setPressing(true);
		setMousePosition({ x: event.clientX, y: event.clientY });
	};

	const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.button !== 0) return;
		setPressing(false);
		enablePanning();
	};

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (pressing && panning) {
			const deltaX = event.clientX - mousePosition.x;
			const deltaY = event.clientY - mousePosition.y;
			setCanvasPosition({ x: canvasPosition.x + deltaX, y: canvasPosition.y + deltaY });
			setMousePosition({ x: event.clientX, y: event.clientY });
			setProject((project: Project) => ({
				...project,
				blueprint: {
					...project.blueprint,
					nodes: project.blueprint.nodes.map((node: BpNode) => ({
						...node,
						position: [node.position[0] + deltaX, node.position[1] + deltaY],
					})),
				},
			}));
		}
	};

	const handleMouseOut = () => {
		setPressing(false);
		enablePanning();
	};

	const disablePanning = () => {
		setPanning(false);
	};

	const enablePanning = () => {
		setPanning(true);
	};

	useEffect(() => {
		document.addEventListener("mouseout", handleMouseOut);
		return () => {
			document.removeEventListener("mouseout", handleMouseOut);
		};
	}, []);

	if (!project) return null;
	return (
		<div
			className={classes.container}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			style={{ backgroundPosition: `${canvasPosition.x}px ${canvasPosition.y}px` }}
		>
			{project?.blueprint.nodes.map((node: BpNode, idx: number) => (
				<Node data={node} key={idx} disablePanning={disablePanning} enablePanning={enablePanning} index={idx} />
			))}
		</div>
	);
}

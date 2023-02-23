import React, { useEffect, useState } from "react";
import { Blueprint, BpNode, Project, useProject } from "@/providers/ProjectProvider";

export function useEditor() {
	const [pressing, setPressing] = useState<boolean>(false);
	const [panning, setPanning] = useState<boolean>(true);
	const [canvasPosition, setCanvasPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	const { project, setBlueprint } = useProject();

	const startPanning = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.button !== 0) return;
		setPressing(true);
		setMousePosition({ x: event.clientX, y: event.clientY });
	};

	const stopPanning = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.button !== 0) return;
		setPressing(false);
		enablePanning();
	};

	const pan = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (pressing && panning) {
			const deltaX = event.clientX - mousePosition.x;
			const deltaY = event.clientY - mousePosition.y;
			setCanvasPosition({ x: canvasPosition.x + deltaX, y: canvasPosition.y + deltaY });
			setMousePosition({ x: event.clientX, y: event.clientY });
			console.log("canvas", -canvasPosition.x, -canvasPosition.y);
			console.log(
				"nodepos",
				project?.blueprint.nodes[0].position.map((a: number) => -a)
			);
			updatePosition(deltaX, deltaY);
		}
	};

	const updatePosition = (deltaX: number, deltaY: number) => {
		setBlueprint((blueprint: Blueprint) => ({
			...blueprint,
			nodes: blueprint.nodes.map((node: BpNode) => ({
				...node,
				position: [node.position[0] + deltaX, node.position[1] + deltaY],
			})),
		}));
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

	return {
		startPanning,
		stopPanning,
		pan,
		disablePanning,
		enablePanning,
		canvasPosition,
	};
}

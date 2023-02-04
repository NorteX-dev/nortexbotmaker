import React, { useEffect, useState } from "react";
import Node from "@/components/Node";
import classes from "../styles/Blueprint.module.scss";
import { Blueprint, BpNode, useBlueprint } from "@/providers/BlueprintProvider";

export default function BlueprintContainer() {
	const [pressing, setPressing] = useState<boolean>(false);
	const [panning, setPanning] = useState<boolean>(true);
	const [canvasPosition, setCanvasPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	const { blueprint, setBlueprint } = useBlueprint();

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
			setBlueprint((blueprint: Blueprint) => ({
				...blueprint,
				nodes: blueprint.nodes.map((node) => ({
					...node,
					position: [node.position[0] + deltaX, node.position[1] + deltaY],
				})),
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

	if (!blueprint) return null;
	return (
		<div
			className={classes.container}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			style={{ backgroundPosition: `${canvasPosition.x}px ${canvasPosition.y}px` }}
		>
			{blueprint?.nodes.map((node: BpNode, idx: number) => (
				<Node data={node} key={idx} disablePanning={disablePanning} enablePanning={enablePanning} index={idx} />
			))}
		</div>
	);
}

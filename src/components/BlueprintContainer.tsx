import React from "react";
import Node from "@/components/Node";
import classes from "../styles/Blueprint.module.scss";
import { BpNode, useProject } from "@/providers/ProjectProvider";
import { useEditor } from "@/hooks/useEditor";

export default function BlueprintContainer() {
	const { project } = useProject();
	const { startPanning, stopPanning, pan, disablePanning, enablePanning, canvasPosition } = useEditor();

	if (!project) return null;
	return (
		<div
			className={classes.container}
			onMouseDown={startPanning}
			onMouseUp={stopPanning}
			onMouseMove={pan}
			style={{ backgroundPosition: `${canvasPosition.x}px ${canvasPosition.y}px` }}
		>
			{project?.blueprint.nodes.map((node: BpNode, idx: number) => (
				<Node data={node} key={idx} disablePanning={disablePanning} enablePanning={enablePanning} index={idx} />
			))}
		</div>
	);
}

import classes from "../styles/Blueprint.module.scss";
import { Blueprint, BpNode, useProject } from "@/providers/ProjectProvider";
import React, { useEffect, useRef, useState } from "react";
import Line from "@/components/Line";
import { invoke } from "@tauri-apps/api/tauri";
import ContextMenu, { MenuElement } from "@/components/ContextMenu";
import { Trash } from "tabler-icons-react";
import { useEditor } from "@/hooks/useEditor";

export default function Node({
	data,
	disablePanning,
	enablePanning,
	index,
}: {
	data: BpNode;
	disablePanning: () => void;
	enablePanning: () => void;
	index: number;
}) {
	const { setBlueprint } = useProject();

	const [pressing, setPressing] = useState<boolean>(false);
	const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	const ref1 = useRef<HTMLDivElement>(null);
	const ref2 = useRef<HTMLDivElement>(null);
	const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
	const [showLine, setShowLine] = useState(false);

	const handleMouseDown = (event: any) => {
		if (event.button !== 0) {
			return;
		}
		event.stopPropagation();
		setPressing(true);
		setMousePosition({ x: event.clientX, y: event.clientY });
		disablePanning();
	};

	const handleMouseUp = async (event: any) => {
		if (event.button !== 0) {
			return;
		}
		setPressing(false);
		enablePanning();
	};

	const handleMouseMove = async (event: any) => {
		const mapNodes = (deltaX: number, deltaY: number) => (node: BpNode, idx: number) => {
			if (idx !== index) return node;
			return {
				...node,
				position: [node.position[0] + deltaX, node.position[1] + deltaY],
			};
		};

		if (pressing) {
			const deltaX = event.clientX - mousePosition.x;
			const deltaY = event.clientY - mousePosition.y;
			setMousePosition({ x: event.clientX, y: event.clientY });
			setBlueprint((blueprint: Blueprint) => ({
				nodes: blueprint.nodes.map(mapNodes(deltaX, deltaY)),
			}));
		}
	};

	let handleNodeMenu = (event: any) => {
		event.stopPropagation();
		event.preventDefault();
		// openContextMenu(event);
	};

	useEffect(() => {
		document.addEventListener("mouseup", handleMouseUp);
		document.addEventListener("mousemove", handleMouseMove);
		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("mousemove", handleMouseMove);
		};
	});

	useEffect(() => {
		const element1 = ref1.current;
		const element2 = ref2.current;
		if (element1 && element2) {
			const x1 = element1.offsetLeft;
			const y1 = element1.offsetTop;
			const x2 = element2.offsetLeft;
			const y2 = element2.offsetTop;
			setCoords({ x1, y1, x2, y2 });
		}
	}, [ref1, ref2]);

	return (
		<>
			<div
				className={classes.node}
				style={{
					left: `${data.position[0]}px`,
					top: `${data.position[1]}px`,
					zIndex: index,
					opacity: pressing ? 0.75 : 1,
				}}
			>
				<div className={classes.nodeContent}>
					<div
						className={classes.nodeTitle}
						onMouseDown={handleMouseDown}
						onMouseUp={async () => {
							await invoke("set_node_position", {
								id: data.id,
								position: [data.position[0], data.position[1]],
							});
						}}
						style={{
							background: `linear-gradient(to right, ${data.color}, #5f5f5f)`,
						}}
						onContextMenu={handleNodeMenu}
					>
						<div
							className={classes.handle}
							onMouseDown={(e) => e.stopPropagation()}
							onMouseEnter={() => setShowLine(true)}
							onMouseLeave={() => setShowLine(false)}
							ref={ref1}
						></div>
						<p>{data.name}</p>
						<div className={classes.handle} onMouseDown={(e) => e.stopPropagation()} ref={ref2}></div>
						{showLine && (
							<Line from={{ x: coords.x1, y: coords.y1 }} to={{ x: coords.x2, y: coords.y2 }}></Line>
						)}
					</div>
				</div>
			</div>
			<ContextMenuHandler />
		</>
	);
}

function ContextMenuHandler() {
	const [contextMenuShown, setContextMenuShown] = useState(false);
	const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });

	function openContextMenu(event: any) {
		setContextMenuShown(true);
		if (window.innerWidth - event.clientX < 200) setContextMenuPos({ x: event.clientX - 200, y: event.clientY });
		else setContextMenuPos({ x: event.clientX, y: event.clientY });
	}

	const NODE_CONTEXT_MENU: MenuElement[] = [
		{
			name: "Delete",
			action: () => {
				console.log("delete");
			},
			icon: Trash,
			danger: true,
		},
	];
	if (contextMenuShown) {
		return (
			<ContextMenu
				elements={NODE_CONTEXT_MENU}
				position={contextMenuPos}
				onClose={() => setContextMenuShown(false)}
			/>
		);
	}
	return null;
}

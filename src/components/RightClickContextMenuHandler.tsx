import React, { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import { DeviceFloppy, Plus, Refresh } from "tabler-icons-react";
import { MenuElement } from "@/components/ContextMenu";
import { createNode } from "@/handlers/createNode";
import { useProject } from "@/providers/ProjectProvider";

export default function RightClickContextMenuHandler() {
	const [shown, setShown] = useState(false);
	const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

	const { refreshProject } = useProject();

	const RC_CONTEXT_MENU: MenuElement[] = [
		{
			name: "Create Node",
			action: () => createNode({ x: menuPos.x, y: menuPos.y }),
			icon: Plus,
			keybind: "Ctrl + A",
		},
		{ name: "Save Project", action: () => {}, icon: DeviceFloppy, keybind: "Ctrl + S" },
		{
			name: "Refresh",
			action: () => {
				refreshProject();
			},
			icon: Refresh,
		},
	];

	const onRightClick = (event: MouseEvent) => {
		event.preventDefault();
		setShown(true);
		if (window.innerWidth - event.clientX < 200) setMenuPos({ x: event.clientX - 200, y: event.clientY });
		else setMenuPos({ x: event.clientX, y: event.clientY });
	};

	useEffect(() => {
		document.addEventListener("contextmenu", onRightClick);
		return () => {
			document.removeEventListener("contextmenu", onRightClick);
		};
	}, []);

	if (!shown) return null;

	return <ContextMenu elements={RC_CONTEXT_MENU} position={menuPos} onClose={() => setShown(false)} />;
}

import { Copy, DeviceFloppy, Plus } from "tabler-icons-react";
import { MenuElement } from "@/components/ContextMenu";
import { createNode } from "@/handlers/createNode";

export const RC_CONTEXT_MENU: MenuElement[] = [
	{
		name: "Create Node",
		action: createNode,
		icon: Plus,
		keybind: "Ctrl + A",
	},
	{ name: "Save Project", action: () => {}, icon: DeviceFloppy, keybind: "Ctrl + S" },
];

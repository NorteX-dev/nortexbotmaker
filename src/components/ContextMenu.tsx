import classes from "../styles/ContextMenu.module.scss";
import React, { useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useKeybind } from "@/hooks/useKeybind";

export interface MenuElement {
	name: string;
	action: () => void;
	keybind?: string;
	icon?: any;
	danger?: boolean;
}

export default function ContextMenu({
	elements,
	position,
	onClose,
}: {
	elements: MenuElement[];
	position: { x: number; y: number };
	onClose: () => void;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref, () => {
		onClose();
	});

	useKeybind("Escape", () => {
		onClose();
	});

	function handleClick(action: () => void) {
		onClose();
		action();
	}

	return (
		<div className={classes.wrapper} ref={ref} style={{ top: position.y + "px", left: position.x + "px" }}>
			<ul className={classes.list}>
				{elements.map((element: MenuElement, idx: number) => (
					<li className={classes.element} onClick={() => handleClick(element.action)} key={idx}>
						<div className={classes.name} style={element.danger ? { color: "#da3232" } : {}}>
							{element.icon && <element.icon size={18} strokeWidth={2} />}
							{element.name}
						</div>
						{element.keybind && <div className={classes.keybind}>{element.keybind}</div>}
					</li>
				))}
			</ul>
		</div>
	);
}

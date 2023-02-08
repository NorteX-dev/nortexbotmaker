import classes from "../styles/ContextMenu.module.scss";
import React from "react";

interface Element {
	name: string;
	action: () => void;
	keybind?: string;
}

export default function ContextMenu({ elements }: { elements: Element[] }) {
	return (
		<div className={classes.wrapper}>
			<ul className={classes.list}>
				{elements.map((element: Element, idx: number) => (
					<li className={classes.element} onClick={element.action} key={idx} />
				))}
			</ul>
		</div>
	);
}

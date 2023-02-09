import React, { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import { RC_CONTEXT_MENU } from "@/const/contextMenu";

export default function RightClickContextMenuHandler() {
	const [shown, setShown] = useState(false);
	const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

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

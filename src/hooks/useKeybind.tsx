import { useEffect } from "react";

interface IOptions {
	ctrl: boolean;
	alt: boolean;
	shift: boolean;
}

export function useKeybind(
	key: string,
	cb: () => void,
	{ ctrl, alt, shift }: IOptions = { ctrl: false, alt: false, shift: false }
) {
	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.key === key && event.ctrlKey === ctrl && event.altKey === alt && event.shiftKey === shift) {
				cb();
			}
		};

		document.addEventListener("keydown", listener);

		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [key, cb, ctrl, alt, shift]);
}

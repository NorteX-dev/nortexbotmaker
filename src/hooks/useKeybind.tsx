import { useEffect } from "react";

interface IOptions {
	ctrl?: boolean;
	alt?: boolean;
	shift?: boolean;
}

export function useKeybind(
	key: string,
	cb: () => void,
	{ ctrl, alt, shift }: IOptions = { ctrl: undefined, alt: undefined, shift: undefined }
) {
	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			console.log("Pressed key: ", event.key);
			if (event.key === key) {
				if (ctrl && event.ctrlKey) cb();
				if (alt && event.altKey) cb();
				if (shift && event.shiftKey) cb();

				if (!ctrl && !alt && !shift) cb();
			}
		};

		document.addEventListener("keydown", listener);

		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [key, cb, ctrl, alt, shift]);
}

import React from "react";

export interface Point {
	x: number;
	y: number;
}

type LineParams = {
	from: Point;
	to: Point;
	color?: string;
	strokeWidth?: number;
};

export default function Line({ from, to, color = "white", strokeWidth = 2 }: LineParams): JSX.Element {
	return (
		<svg
			style={{
				position: "absolute",
				left: from.x /* + 22 /!*handle width*!/ / 2*/,
				top: from.y /*+ 15 /!*handle height*!/ / 2*/,
				width: "1px",
				height: "1px",
				overflow: "visible",
			}}
		>
			<path
				d={`M 0 0 L ${to.x /* - 22 /!*handle width*!/ / 2*/} ${to.y}`}
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
}

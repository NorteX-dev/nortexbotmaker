import { createStyles, Kbd, Text } from "@mantine/core";
import React from "react";

export default function MainView() {
	const { classes } = useStyles();

	return (
		<div className={classes.center}>
			<div className={classes.line}>
				<Text mt={5}>
					<Kbd>Ctrl</Kbd>
					<span style={{ margin: "0 5px" }}></span>
					<Kbd>O</Kbd>
				</Text>
				<Text>open project</Text>
			</div>
			<div className={classes.line}>
				<Text mt={5}>
					<Kbd>Ctrl</Kbd>
					<span style={{ margin: "0 5px" }}></span>
					<Kbd>C</Kbd>
				</Text>
				<Text>create new command</Text>
			</div>
			<div className={classes.line}>
				<Text mt={5}>
					<Kbd>Ctrl</Kbd>
					<span style={{ margin: "0 5px" }}></span>
					<Kbd>E</Kbd>
				</Text>
				<Text>create new event</Text>
			</div>
		</div>
	);
}

const useStyles = createStyles((theme) => ({
	center: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	line: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-end",
		gap: "20px",
	},
}));

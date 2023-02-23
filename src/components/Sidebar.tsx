import { createStyles } from "@mantine/core";
import { useView, View } from "@/providers/ViewProvider";

interface SidebarElement {
	name: string;
	active: boolean;
	onClick: () => void;
}

export default function Sidebar() {
	const { classes, cx } = useStyles();
	const { viewName, setView } = useView();

	const elements: SidebarElement[] = [
		{
			name: "Commands",
			active: viewName === View.Commands,
			onClick: () => {
				setView!(View.Commands);
			},
		},
		{
			name: "Events",
			active: viewName === View.Events,
			onClick: () => {
				setView!(View.Events);
			},
		},
	];

	return (
		<div className={classes.wrapper}>
			<ul className={classes.list}>
				{elements.map((element: SidebarElement, idx: number) => (
					<li
						key={idx}
						className={cx(classes.element, { [classes.active]: element.active })}
						onClick={() => element.onClick()}
					>
						<p className={classes.elementText}>{element.name}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

const useStyles = createStyles((theme, _params, getRef) => ({
	wrapper: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3],
		boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.3)",
		width: "25%",
		height: "100vh",
	},
	list: {
		listStyle: "none",
		marginTop: "40px",
		marginBottom: "40px",
		display: "flex",
		flexDirection: "column",
		gap: "10px",
	},
	element: {
		ref: getRef("element"),
		padding: "10px",
		backgroundColor: theme.colors.dark[5],
		borderRight: `8px solid ${theme.colors.blue[6]}`,
		transition: "background-color 100ms",
		cursor: "pointer",
		["&:hover"]: {
			backgroundColor: theme.colors.dark[5],
		},
	},
	elementText: {
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9],
		fontWeight: 600,
	},
	active: {
		[`.${getRef("element")}`]: {
			backgroundColor: "red",
		},
	},
}));

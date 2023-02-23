import { Container, createStyles, TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { SetStateAction, Dispatch, useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";

interface Command {
	name: string;
	description: string;
	actions: number;
}

const GLOBAL_COMMANDS: Command[] = [
	{ name: "bridge", description: "Confirm a bridge initiated from Revolt", actions: 2 },
	{ name: "test2", description: "Some command", actions: 4 },
];

export default function CommandsView() {
	const [unfilteredCommands, setUnfilteredCommands] = useState<Command[]>(GLOBAL_COMMANDS);
	const [filteredCommands, setFilteredCommands] = useState<Command[]>(unfilteredCommands);

	return (
		<Container>
			<Toolbar unfilteredCommands={unfilteredCommands} setFilteredCommands={setFilteredCommands} />
			<CommandList commands={filteredCommands} />
		</Container>
	);
}

function Toolbar({
	unfilteredCommands,
	setFilteredCommands,
}: {
	unfilteredCommands: Command[];
	setFilteredCommands: Dispatch<SetStateAction<Command[]>>;
}) {
	const { classes } = useStyles();

	const [search, setSearch] = useDebouncedState("", 200);

	useEffect(() => {
		updateSearchResults();
	}, [search]);

	function updateSearchResults() {
		if (search === "") {
			setFilteredCommands(unfilteredCommands);
			return;
		}

		const filteredCommands = unfilteredCommands.filter((command) => {
			return command.name.includes(search);
		});

		setFilteredCommands(filteredCommands);
	}

	return (
		<div className={classes.toolbar}>
			<TextInput
				placeholder={"Search..."}
				icon={<Search size={16} />}
				onChange={(event) => setSearch(event.currentTarget.value)}
			/>
		</div>
	);
}

function CommandList({ commands }: { commands: Command[] }) {
	const { classes } = useStyles();

	return (
		<ul className={classes.commandList}>
			{commands.map((command: Command, idx: number) => (
				<li key={idx}>
					<Command name={command.name} description={command.description} actions={command.actions} />
				</li>
			))}
		</ul>
	);
}

function Command({ name, description, actions }: { name: string; description: string; actions: number }) {
	const { classes } = useStyles();

	return (
		<div className={classes.command}>
			<div style={{ flexDirection: "column" }}>
				<p className={classes.nameText}>/{name}</p>
				<p className={classes.descriptionText}>{description}</p>
			</div>
			<div className={classes.actions}>
				<p className={classes.actionsText}>
					<span style={{ color: "white" }}>{actions}</span> actions →
				</p>
			</div>
		</div>
	);
}

const useStyles = createStyles((theme) => ({
	toolbar: {
		display: "flex",
		justifyContent: "right",
		margin: "20px 10px",
		marginTop: "40px",
	},
	commandList: {
		listStyle: "none",
	},
	command: {
		padding: "10px 12px",
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3],
		marginTop: "10px",
		borderRadius: "10px",
		transition: "background-color 50ms ease",
		cursor: "pointer",
		display: "flex",
		justifyContent: "space-between",
		["&:hover"]: {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4],
		},
	},
	nameText: {
		fontWeight: "bold",
		fontSize: "16px",
	},
	descriptionText: {
		color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
		fontSize: "13px",
	},
	actions: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	actionsText: {
		fontWeight: 300,
		textTransform: "uppercase",
		fontSize: "15px",
		marginTop: "5px",
		paddingRight: "10px",
	},
}));

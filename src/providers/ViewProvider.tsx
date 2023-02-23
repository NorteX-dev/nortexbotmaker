import React, { createContext, ReactNode, useContext, useState } from "react";
import SettingsView from "@/views/SettingsView";
import EventsView from "@/views/EventsView";
import CommandsView from "@/views/CommandsView";
import MainView from "@/views/MainView";

export type SetViewFn = (view: View) => void;

export enum View {
	Main = "main",
	Commands = "commands",
	Events = "events",
	Settings = "settings",
}

const ViewContext = createContext<{
	view?: ReactNode;
	viewName?: View;
	setView?: SetViewFn;
}>({});

const viewMap = {
	[View.Main]: <MainView />,
	[View.Commands]: <CommandsView />,
	[View.Events]: <EventsView />,
	[View.Settings]: <SettingsView />,
};

export default function ViewProvider({ children }: { children: ReactNode }) {
	const [view, setView] = useState<View>(View.Main);

	const viewNode = viewMap[view];
	if (!viewNode) {
		console.warn("(ViewProvider.tsx) View not found in the view map:", view);
	}

	return <ViewContext.Provider value={{ view: viewNode, viewName: view, setView }}>{children}</ViewContext.Provider>;
}

export function useView() {
	return useContext(ViewContext);
}

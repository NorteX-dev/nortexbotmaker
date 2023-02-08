use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu, WindowBuilder, WindowMenuEvent, WindowUrl, Wry};
use tauri::api::dialog;
use crate::structures::{ProjectState};

fn new_project(event: WindowMenuEvent<Wry>) {
	println!("New Project")
}

fn open_project(event: WindowMenuEvent<Wry>) {
	println!("Open")
}

fn open_recent(event: WindowMenuEvent<Wry>) {
	println!("Open Recent")
}

fn save(event: WindowMenuEvent<Wry>) {
	let project = event.window().state::<ProjectState>();
	let mut project = project.0.lock().unwrap();

	match project.save() {
		Err(_) => {
			drop(project);
			save_as(event);
		},
		Ok(_) => {},
	}
}

fn save_as(event: WindowMenuEvent<Wry>) {
	dialog::FileDialogBuilder::default()
		.add_filter("NDBC Project", &["ndbc"])
		.save_file(move |path| if let Some(p) = path {
			let project = event.window().state::<ProjectState>();
			let mut project = project.0.lock().unwrap();
			let path_buf = Some(p).unwrap();
			let path_string = path_buf.to_str().unwrap().to_string();
			println!("{}", path_string);
			project.save_as(path_string).expect("Failed to save project as.");
		});
}

fn quit(event: WindowMenuEvent<Wry>) -> ! {
	std::process::exit(0)
}

fn create_command(event: WindowMenuEvent<Wry>) {
	println!("Create Command")
}

fn create_event(event: WindowMenuEvent<Wry>) {
	println!("Create Event")
}

fn create_config_param(event: WindowMenuEvent<Wry>) {
	println!("Create Config Parameter")
}

fn build(event: WindowMenuEvent<Wry>) {
	println!("Build")
}

fn build_run(event: WindowMenuEvent<Wry>) {
	println!("Build and Run")
}

fn run(event: WindowMenuEvent<Wry>) {
	println!("Run without Building")
}

fn view_files(event: WindowMenuEvent<Wry>) {
	println!("View built files")
}

fn create_exe(event: WindowMenuEvent<Wry>) {
	println!("Generate executable")
}

fn check_updates(event: WindowMenuEvent<Wry>) {
	println!("Check for Updates")
}

fn about(event: WindowMenuEvent<Wry>) {
	match WindowBuilder::new(&event.window().app_handle(), "external", WindowUrl::External("https://youtube.com/".parse().unwrap())).build() {
		Ok(_) => (),
		Err(e) => {}
	}
}

fn unknown(event: WindowMenuEvent<Wry>) {
	println!("Unknown menu item: {}", event.menu_item_id());
}

pub fn get_menu() -> Menu {
	let file_menu = Menu::new()
		.add_item(CustomMenuItem::new("new".to_string(), "New Project"))
		.add_item(CustomMenuItem::new("open".to_string(), "Open"))
		.add_item(CustomMenuItem::new("recent".to_string(), "Open Recent"))
		.add_native_item(MenuItem::Separator)
		.add_item(CustomMenuItem::new("save".to_string(), "Save"))
		.add_item(CustomMenuItem::new("save_as".to_string(), "Save As"))
		.add_native_item(MenuItem::Separator)
		.add_item(CustomMenuItem::new("quit".to_string(), "Quit"));

	let project_menu = Menu::new()
		.add_item(CustomMenuItem::new("command".to_string(), "Create Command"))
		.add_item(CustomMenuItem::new("event".to_string(), "Create Event"))
		.add_item(CustomMenuItem::new("parameter".to_string(), "Create Config Parameter"));

	let build_menu = Menu::new()
		.add_item(CustomMenuItem::new("build".to_string(), "Build"))
		.add_item(CustomMenuItem::new("build_run".to_string(), "Build and Run"))
		.add_item(CustomMenuItem::new("run".to_string(), "Run without Building"))
		.add_native_item(MenuItem::Separator)
		.add_item(CustomMenuItem::new("view_files".to_string(), "View Bot Files"))
		.add_item(CustomMenuItem::new("create_exe".to_string(), "Generate Executable Script"));

	let help_menu = Menu::new()
		.add_item(CustomMenuItem::new("check_updates".to_string(), "Check for Updates"))
		.add_native_item(MenuItem::Separator)
		.add_item(CustomMenuItem::new("about".to_string(), "About"));


	Menu::new()
		.add_submenu(Submenu::new("File", file_menu))
		.add_submenu(Submenu::new("Project", project_menu))
		.add_submenu(Submenu::new("Build", build_menu))
		.add_submenu(Submenu::new("Help", help_menu))
}


pub fn get_menu_handler() -> fn(WindowMenuEvent<Wry>) {
	|event: WindowMenuEvent<Wry>| {
		match event.menu_item_id() {
			"new" => new_project(event),
			"open" => open_project(event),
			"recent" => open_recent(event),
			"save" => save(event),
			"save_as" => save_as(event),
			"quit" => quit(event),

			"command" => create_command(event),
			"event" => create_event(event),
			"parameter" => create_config_param(event),

			"build" => build(event),
			"build_run" => build_run(event),
			"run" => run(event),
			"view_files" => view_files(event),
			"create_exe" => create_exe(event),

			"check_updates" => check_updates(event),
			"about" => about(event),

			_ => unknown(event),
		}
	}
}

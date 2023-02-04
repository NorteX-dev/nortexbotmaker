use tauri::{AppHandle, CustomMenuItem, Manager, Menu, MenuItem, Submenu, WindowBuilder, WindowMenuEvent, WindowUrl, Wry};

fn new_project(app_handle: AppHandle<Wry>) {
	println!("New Project")
}

fn open_project(app_handle: AppHandle<Wry>) {
	println!("Open")
}

fn open_recent(app_handle: AppHandle<Wry>) {
	println!("Open Recent")
}

fn save(app_handle: AppHandle<Wry>) {
	println!("Save")
}

fn save_as(app_handle: AppHandle<Wry>) {
	println!("invoking");
	app_handle.emit_all("save_project_menu", ()).unwrap();
}

fn quit(app_handle: AppHandle<Wry>) -> ! {
	std::process::exit(0)
}

fn create_command(app_handle: AppHandle<Wry>) {
	println!("Create Command")
}

fn create_event(app_handle: AppHandle<Wry>) {
	println!("Create Event")
}

fn create_config_param(app_handle: AppHandle<Wry>) {
	println!("Create Config Parameter")
}

fn build(app_handle: AppHandle<Wry>) {
	println!("Build")
}

fn build_run(app_handle: AppHandle<Wry>) {
	println!("Build and Run")
}

fn run(app_handle: AppHandle<Wry>) {
	println!("Run without Building")
}

fn view_files(app_handle: AppHandle<Wry>) {
	println!("View built files")
}

fn create_exe(app_handle: AppHandle<Wry>) {
	println!("Generate executable")
}

fn check_updates(app_handle: AppHandle<Wry>) {
	println!("Check for Updates")
}

fn about(app_handle: AppHandle<Wry>) {
	match WindowBuilder::new(&app_handle, "external", WindowUrl::External("https://youtube.com/".parse().unwrap())).build() {
		Ok(_) => (),
		Err(e) => {}
	}
}

fn unknown(app_handle: AppHandle<Wry>, id: &str) {
	println!("Unknown menu item: {}", id);
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


	let final_menu = Menu::new()
		.add_submenu(Submenu::new("File", file_menu))
		.add_submenu(Submenu::new("Project", project_menu))
		.add_submenu(Submenu::new("Build", build_menu))
		.add_submenu(Submenu::new("Help", help_menu));

	final_menu
}


pub fn get_menu_handler() -> fn(WindowMenuEvent<Wry>) {
	|event: WindowMenuEvent<Wry>| {
		match event.menu_item_id() {
			"new" => new_project(event.window().app_handle()),
			"open" => open_project(event.window().app_handle()),
			"recent" => open_recent(event.window().app_handle()),
			"save" => save(event.window().app_handle()),
			"save_as" => save_as(event.window().app_handle()),
			"quit" => quit(event.window().app_handle()),

			"command" => create_command(event.window().app_handle()),
			"event" => create_event(event.window().app_handle()),
			"parameter" => create_config_param(event.window().app_handle()),

			"build" => build(event.window().app_handle()),
			"build_run" => build_run(event.window().app_handle()),
			"run" => run(event.window().app_handle()),
			"view_files" => view_files(event.window().app_handle()),
			"create_exe" => create_exe(event.window().app_handle()),

			"check_updates" => check_updates(event.window().app_handle()),
			"about" => about(event.window().app_handle()),

			_ => unknown(event.window().app_handle(), event.menu_item_id()),
		}
	}
}

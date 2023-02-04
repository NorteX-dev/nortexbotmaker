use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent, Wry};

fn new_project() {
	println!("New Project")
}

fn open_project() {
	println!("Open")
}

fn open_recent() {
	println!("Open Recent")
}

fn save() {
	println!("Save")
}

fn save_as() {
	println!("Save As")
}

fn quit() -> ! {
	std::process::exit(0)
}

fn create_command() {
	println!("Create Command")
}

fn create_event() {
	println!("Create Event")
}

fn create_config_param() {
	println!("Create Config Parameter")
}

fn build() {
	println!("Build")
}

fn build_run() {
	println!("Build and Run")
}

fn run() {
	println!("Run without Building")
}

fn view_files() {
	println!("View built files")
}

fn create_exe() {
	println!("Generate executable")
}

fn check_updates() {
	println!("Check for Updates")
}

fn about() {
	// let window = tauri::WindowBuilder::new(app, "external", "https://youtube.com/".parse().unwrap()).build().unwrap();
}

fn unknown(id: &str) {
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
			"new" => new_project(),
			"open" => open_project(),
			"recent" => open_recent(),
			"save" => save(),
			"save_as" => save_as(),
			"quit" => quit(),

			"command" => create_command(),
			"event" => create_event(),
			"parameter" => create_config_param(),

			"build" => build(),
			"build_run" => build_run(),
			"run" => run(),
			"view_files" => view_files(),
			"create_exe" => create_exe(),

			"check_updates" => check_updates(),
			"about" => about(),

			_ => unknown(event.menu_item_id()),
		}
	}
}

#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]
#![allow(dead_code)]
#![allow(unused_variables)]

mod menu_handlers;
mod structures;
mod errors;

use menu_handlers::{get_menu, get_menu_handler};
use std::sync::Mutex;
use tauri::{AppHandle, Manager, State};
use structures::{Project, ProjectState};

#[tauri::command]
fn get_project(project: State<ProjectState>) -> Project {
	(*project.0.lock().unwrap()).clone()
}

#[tauri::command]
fn add_node(project: State<ProjectState>, app_handle: AppHandle, name: String, position: (f32, f32)) {
	let mut project = project.0.lock().unwrap();
	project.blueprint.add_node(name, position, Some("#fff".to_string()));
	app_handle.emit_all("update-project", ()).unwrap();
}

#[tauri::command]
fn set_node_position(project: State<ProjectState>, app_handle: AppHandle, id: usize, position: (f32, f32)) {
	let mut project = project.0.lock().unwrap();
	project.blueprint.set_node_position(id, position);
	app_handle.emit_all("update-project", ()).unwrap();
}


fn main() {
	tauri::Builder::default()
		.manage(ProjectState(Mutex::from(Project::new())))
		.invoke_handler(tauri::generate_handler![
			get_project,
			add_node,
			set_node_position
		])
		.setup(|app| {
			#[cfg(debug_assertions)]
			{
				let window = app.get_window("main").unwrap();
				window.open_devtools();
			}
			Ok(())
		})
		.menu(get_menu()).on_menu_event(get_menu_handler())
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}


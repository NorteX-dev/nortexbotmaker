#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]
#![allow(dead_code)]
#![allow(unused_variables)]

mod menu_handlers;
mod structures;
mod errors;

use menu_handlers::{get_menu, get_menu_handler};
use std::sync::Mutex;
use tauri::{State, AppHandle, Manager};
use tauri::api::dialog;
use structures::{Project, ProjectState};

#[tauri::command]
fn save_project(mut project: Project) {
	project.save().unwrap();
}

fn main() {
	tauri::Builder::default()
		.manage(ProjectState(Mutex::from(Project::new())))
		.invoke_handler(tauri::generate_handler![save_project])
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


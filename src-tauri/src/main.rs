#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]
#![allow(dead_code)]
#![allow(unused_variables)]

mod menu_handlers;
mod structures;
mod errors;

use menu_handlers::{get_menu, get_menu_handler};
use std::sync::Mutex;
use serde_json::to_string;
use tauri::{State, AppHandle, Manager};
use tauri::api::dialog;
use structures::{Blueprint, Project, ProjectState};
use errors::Error;

#[tauri::command]
fn get_project(app_handle: AppHandle, project: State<ProjectState>) -> ProjectState {
	let project: ProjectState = project.0.lock().unwrap();
	project
}

#[tauri::command]
fn save_project(mut project: Project) {
	project.save().unwrap();
}

#[tauri::command]
pub fn save_project_as(project: State<ProjectState>) -> () {
	let mut file_path = None;
	dialog::FileDialogBuilder::default()
		.add_filter("NDBC Project", &["ndbc"])
		.save_file(move |path| match path {
			Some(p) => file_path = Some(p),
			None => (),
		});
}

fn main() {
	tauri::Builder::default()
		.manage(ProjectState(Mutex::new(Project::new())))
		.invoke_handler(tauri::generate_handler![get_project, save_project, save_project_as])
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


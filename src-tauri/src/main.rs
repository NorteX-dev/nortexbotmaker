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
fn save_project_as(/*file_path: &str, */project: State<ProjectState>) -> () {
	let mut file_path = None;
	dialog::FileDialogBuilder::default()
		.add_filter("NDBC Project", &["ndbc"])
		.save_file(move |path| match path {
			Some(p) => file_path = Some(p),
			None => (),
		});

	// dialog::FileDialogBuilder::default().add_filter("NDBC Project", &["ndbc"])
	// 	.save_file(move |given_path| {
	// 		match given_path {
	// 			Some(v) => {
	// 				let mut project = project.0.lock().unwrap();
	// 				project.save_as(String::from(v.to_str().unwrap()));
	// 			}
	// 			_ => {}
	// 		}
	// 	});
}

#[tauri::command]
fn get_blueprint(app_handle: AppHandle, project: State<ProjectState>) -> Blueprint {
	let project = project.0.lock().unwrap();
	println!("PROJECT {:?}", project);
	let json = match std::fs::read_to_string("C:\\Users\\NorteX\\Desktop\\test.json") {
		Ok(json) => json,
		Err(_) => return Blueprint::new(),
	};
	let blueprint = serde_json::from_str(&*json).unwrap();
	// let mut blueprint = Blueprint::new();
	// blueprint.add_node("test".to_string());
	// blueprint.add_node("test2".to_string());
	// blueprint.add_node("test3".to_string());
	// blueprint.connect_nodes(0, 1);
	// blueprint.connect_nodes(1, 2);

	// let json = to_string(&blueprint).unwrap();
	println!("READ {:?}", blueprint);
	blueprint
}

#[tauri::command]
fn save_blueprint(blueprint: Blueprint) {
	let json = to_string(&blueprint).unwrap();
	println!("WRITING {}", json);
	std::fs::write("C:\\Users\\NorteX\\Desktop\\test.json", json).unwrap();
}

fn main() {
	tauri::Builder::default()
		.manage(ProjectState(Mutex::new(Project::new())))
		.invoke_handler(tauri::generate_handler![save_project_as, get_blueprint, save_blueprint])
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


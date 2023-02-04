#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

mod menu_handlers;

#[macro_use]
extern crate lazy_static;

use menu_handlers::{get_menu, get_menu_handler};
use serde::{Serialize, Deserialize};
use std::sync::Mutex;
use serde_json::to_string;
use tauri::Manager;


#[derive(Debug)]
struct Project {
	file_path: String,
	unsaved_changes: bool,
}

impl Project {
	fn new() -> Self {
		Self {
			file_path: String::new(),
			unsaved_changes: false,
		}
	}

	fn save(&mut self, file_path: &str) {
		self.file_path = file_path.to_string();
		self.unsaved_changes = false;
	}
}

#[derive(Serialize, Deserialize, Debug)]
struct Node {
	id: usize,
	name: String,
	connections: Vec<usize>,
	position: (f32, f32),
	color: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Blueprint {
	nodes: Vec<Node>,
}

impl Blueprint {
	fn new() -> Self {
		Blueprint { nodes: vec![] }
	}

	fn add_node(&mut self, name: String) {
		let node = Node { id: 0, name, connections: vec![], position: (0.0, 0.0), color: "#ccc".to_string() };
		self.nodes.push(node);
	}

	fn connect_nodes(&mut self, node_index_1: usize, node_index_2: usize) {
		self.nodes[node_index_1].connections.push(node_index_2);
		self.nodes[node_index_2].connections.push(node_index_1);
	}
}

lazy_static! {
	static ref PROJECT: Mutex<Option<Project>> = Mutex::new(Some(Project::new()));
}

#[tauri::command]
fn save_project(file_path: &str) -> () {
	std::fs::File::create(file_path).unwrap();
	()
}

#[tauri::command]
fn get_blueprint() -> Blueprint {
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
	//
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
	let mut project = Project::new();
	println!("{:?}", project);
	project.save("C:\\Users\\NorteX\\Desktop\\test.txt");
	println!("{:?}", project);
	*PROJECT.lock().unwrap() = Some(project);

	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![save_project, get_blueprint, save_blueprint])
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


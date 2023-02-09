use std::fs;
use std::path::Path;
use std::sync::Mutex;
use serde::{Serialize, Deserialize};
use serde_json::to_string;
use crate::errors::Error;

/* NODE */
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Node {
	id: usize,
	name: String,
	position: (f32, f32),
	color: String,
	next: Option<usize>,
}

impl Node {
	pub fn new(id: usize, name: String, position: (f32, f32), color: String) -> Self {
		Node { id, name, position, color, next: None }
	}

	fn set_next(&mut self, next: usize) {
		self.next = Some(next);
	}
}

/* BLUEPRINT */
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Blueprint {
	nodes: Vec<Node>,
}

impl Blueprint {
	pub fn new() -> Self {
		Blueprint { nodes: vec![] }
	}

	pub fn add_node(&mut self, name: String, position: (f32, f32), color: Option<String>) {
		let node = Node::new(self.nodes.len(), name, position, color.unwrap_or("#ddd".to_string()));
		self.nodes.push(node);
	}

	pub fn set_next(&mut self, target_node: usize, next_id: usize) {
		self.nodes[target_node].set_next(next_id);
	}

	pub fn set_node_position(&mut self, node_id: usize, position: (f32, f32)) {
		self.nodes[node_id].position = position;
	}
}

/* PROJECT */
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Project {
	pub file_path: String,
	pub blueprint: Blueprint,
}

impl Project {
	pub fn new() -> Self {
		Self {
			file_path: String::new(),
			blueprint: Blueprint::new(),
		}
	}

	fn open(file_path: &String) -> Result<(), Error> {
		let exists = Path::new(file_path).exists();
		if !exists {
			return Err(std::io::Error::new(std::io::ErrorKind::NotFound, "File not found.").into());
		}
		let data = fs::read(file_path);

		Ok(())
	}


	fn serialize_json(&self) -> String {
		to_string(&self).unwrap()
	}

	pub fn save(&mut self) -> Result<(), Error> {
		let exists = Path::new(&self.file_path).exists();
		// if !exists {
		// 	fs::create_dir_all(&self.file_path).unwrap();
		// }
		fs::write(&self.file_path, self.serialize_json())?;
		Ok(())
	}

	pub fn save_as(&mut self, file_path: String) -> Result<(), Error> {
		self.file_path = file_path;
		self.save()
	}
}

#[derive(Serialize, Deserialize)]
pub struct ProjectState(pub Mutex<Project>);

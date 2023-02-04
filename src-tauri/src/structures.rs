use std::fs;
use std::path::Path;
use std::sync::Mutex;
use serde::{Serialize, Deserialize};
use serde_json::to_string;
use crate::errors::Error;

/* NODE */

#[derive(Serialize, Deserialize, Debug)]
struct Node {
	id: usize,
	name: String,
	connections: Vec<usize>,
	position: (f32, f32),
	color: String,
}

/* BLUEPRINT */

#[derive(Serialize, Deserialize, Debug)]
pub struct Blueprint {
	nodes: Vec<Node>,
}

impl Blueprint {
	pub fn new() -> Self {
		Blueprint { nodes: vec![] }
	}

	pub fn add_node(&mut self, name: String, color: Option<String>) {
		let node = Node { id: 0, name, connections: vec![], position: (0.0, 0.0), color: color.unwrap_or("#ddd".to_string()) };
		self.nodes.push(node);
	}

	pub fn connect_nodes(&mut self, node_index_1: usize, node_index_2: usize) {
		self.nodes[node_index_1].connections.push(node_index_2);
		self.nodes[node_index_2].connections.push(node_index_1);
	}

	fn serialise_json(&mut self) -> String {
		let json = to_string(&self).unwrap();
		json
	}
}

/* PROJECT */

#[derive(Serialize, Deserialize, Debug)]
pub struct Project {
	file_path: String,
	blueprint: Blueprint,
}

impl Project {
	pub fn new() -> Self {
		Self {
			file_path: String::new(),
			blueprint: Blueprint::new(),
		}
	}

	pub fn save(&mut self) -> Result<(), Error> {
		let exists = Path::new(&self.file_path).exists();
		if !exists {
			fs::create_dir_all(&self.file_path).unwrap();
		}
		fs::write(&self.file_path, "data")?;
		Ok(())
	}

	pub fn save_as(&mut self, file_path: String) -> Result<(), Error> {
		self.file_path = file_path;
		self.save()
	}
}

pub struct ProjectState(pub Mutex<Project>);

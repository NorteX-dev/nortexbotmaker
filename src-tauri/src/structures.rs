use std::fs;
use std::path::Path;
use std::sync::Mutex;
use serde::{Serialize, Deserialize};
use serde_json::to_string;
use crate::errors::Error;

/* PROJECT */
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Project {
	pub file_path: String,
}

impl Project {
	pub fn new() -> Self {
		Self {
			file_path: String::new(),
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

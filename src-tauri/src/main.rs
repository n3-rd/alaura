// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dirs;
use std::fs;
use std::path::PathBuf;

// Also in main.rs
fn main() {
    tauri::Builder::default()
        // This is where you pass in your commands
        .invoke_handler(tauri::generate_handler![get_audio_files])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}

#[tauri::command]
fn get_audio_files() -> Vec<String> {
    let mut files: Vec<String> = Vec::new();
    if let Some(audio_dir) = dirs::audio_dir() {
        let paths = fs::read_dir(audio_dir).unwrap();
        for path in paths {
            let path = path.unwrap().path();
            let path_str = path.to_str().unwrap().to_string();
            files.push(path_str);
        }
    }
    files
}

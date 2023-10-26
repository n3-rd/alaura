// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dirs;
use id3::{Tag, TagLike};
use serde::{Deserialize, Serialize};
use std::fs;
use std::fs::File;

// Also in main.rs
fn main() {
    tauri::Builder::default()
        // This is where you pass in your commands
        .invoke_handler(tauri::generate_handler![
            get_audio_files,
            get_audio_metadata
        ])
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

#[derive(Serialize, Deserialize)]
struct Metadata {
    title: Option<String>,
    artist: Option<String>,
    album: Option<String>,
    duration: Option<String>,
    year: Option<i32>,
    picture: Option<Vec<u8>>
}

#[tauri::command]
fn get_audio_metadata(file_path: String) -> Result<Metadata, String> {
    let file = File::open(&file_path).map_err(|err| err.to_string())?;
    let tag = Tag::read_from(&file).map_err(|err| err.to_string())?;

    let title = tag.title().map(|s| s.to_string());
    let artist = tag.artist().map(|s| s.to_string());
    let album = tag.album().map(|s| s.to_string());
    let duration = tag.duration().map(|d| d.to_string());
    let year = tag.year().map(|y| y as i32);

     // get picture
     let picture = tag.pictures().next().map(|p| p.data.to_vec());

    Ok(Metadata {
        title,
        artist,
        album,
        duration,
        year,
        picture
    })
}

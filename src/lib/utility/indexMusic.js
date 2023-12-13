import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import { addFiles } from './libraryActions';
import { db } from '$lib/databases/songs';

// Function to get file extension
const getFileExtension = (/** @type {string | string[]} */ filename) => {
	return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

// Reads the `$APPDATA/music` directory recursively
const entries = async () => {
	return await readDir('', { dir: BaseDirectory.Audio, recursive: true });
};

export const readAudioFiles = async () => {
	let fileEntries = await entries();
	let files = [];
	for (const entry of fileEntries) {
		// Extract the file extension from the path
		let extension = getFileExtension(entry.path);
		// Check if the file is an audio file
		if (extension === 'mp3' || extension === 'wav' || extension === 'flac') {
			files.push(entry);
		}
	}

	for (const file of files) {
		console.log(file.path);
		// Check if the file exists in the database
		// @ts-ignore
		const exists = await db.songs.where('filePath').equals(file.path).count();
		if (!exists) {
			addFiles(file.path);
		}
	}
	return files;
};

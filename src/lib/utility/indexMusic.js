import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import { addFiles } from './libraryActions';

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

	files.forEach((file) => {
		console.log(file.path);
		addFiles(file.path);
	});
	return files;
};

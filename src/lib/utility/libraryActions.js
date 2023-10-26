import { invoke } from '@tauri-apps/api/tauri';
// @ts-ignore
import { db } from '$lib/databases/songs';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';

export const listFiles = async () => {
	let files = await invoke('get_audio_files');
	return files;
};

export const addFiles = async (/** @type {any} */ file) => {
	let metaData = await getAudioMetadata(file);
	let fileName = file.toString().split('\\').pop().split('/').pop();
	let artist = metaData.artist;
	let album = metaData.album;
	let title = metaData.title;
	let duration = metaData.duration;
	let year = metaData.year;
	let picture = metaData.picture;

	const pushSong = async () => {
		try {
			// @ts-ignore
			// eslint-disable-next-line no-unused-vars
			const id = await db.songs.add({
				album: album,
				artist: artist,
				title: title,
				fileName: fileName,
				duration: duration,
				year: year
			});

			const sanitizedFileName = sanitizeFileName(title + artist);

			await savePicture(sanitizedFileName, picture);
		} catch (err) {
			console.log(err);
		}
	};

	await pushSong();
};

export let getAudioMetadata = async (/** @type {any} */ file) => {
	let metadata = await invoke('get_audio_metadata', { filePath: file });
	console.log(metadata);
	return {
		artist: metadata.artist,
		album: metadata.album,
		title: metadata.title,
		duration: metadata.duration,
		year: metadata.year,
		picture: metadata.picture
	};
};

export let savePicture = async (
	/** @type {any} */ name,
	/** @type {import("@tauri-apps/api/fs-9d7de754").c} */ path
) => {
	// Write a binary file to the `$APPDATA/avatar.png` path
	// await writeBinaryFile(`${name}.png`, new Uint8Array([]), { dir: BaseDirectory.AppData });
	await writeBinaryFile(`${name}.png`, path, { dir: BaseDirectory.AppData });
};

export let sanitizeFileName = (/** @type {string} */ str) => {
	// Replace any characters that are not alphanumeric, dashes, or underscores with underscores
	return str.replace(/[^a-zA-Z0-9-_]/g, '_');
};

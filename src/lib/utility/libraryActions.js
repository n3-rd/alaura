import { invoke } from '@tauri-apps/api/tauri';
// @ts-ignore
import { db } from '$lib/databases/songs';

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

	const pushSong = async () => {
		try {
			const id = await db.songs.add({
				album: album,
				artist: artist,
				title: title,
				fileName: fileName
			});
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
		title: metadata.title
	};
};

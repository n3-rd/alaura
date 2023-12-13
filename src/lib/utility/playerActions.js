import { currentPlaying, currentSongId } from '$lib/stores/currentPlaying';
import { readBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { Howl, Howler } from 'howler';
import { sanitizeFileName } from './libraryActions';
import { db } from '$lib/databases/songs';
import { get } from 'svelte/store';

/**
 * @type {Howl}
 */
export let sound;

export const playFile = async (
	/** @type {string} */ file,
	/** @type {any} */ title,
	/** @type {any} */ artist,
	/** @type {any} */ album,
	/** @type {any} */ id,
	/** @type {any} */ filePath
) => {
	Howler.unload();

	console.log('playFile', id);
	console.log('filePath', filePath);
	currentPlaying.update((current) => {
		return {
			...current,
			title: title,
			artist: artist,
			album: album,
			artwork: sanitizeFileName(title + artist)
		};
	});
	currentSongId.set(id);
	Howler.unload();

	const contents = await readBinaryFile(file, { dir: BaseDirectory.Audio });
	console.log('contents', contents);
	const blob = new Blob([new Uint8Array(contents)], { type: 'audio/wav' });
	// make the blob faster
	// @ts-ignore

	sound = new Howl({
		src: [window.URL.createObjectURL(blob)],
		format: ['mp3'],
		html5: true,
		// sprite: { __default: [0, 20000, true] },
		preload: true,
		onend: async (e) => {
			await playNextSong();
			console.log(e);
		},
		onloaderror: (id, err) => {
			console.error('Error loading sound:', err);
		},
		onplayerror: (id, err) => {
			console.error('Error playing sound:', err);
		}
	});
	sound.play();
};

export const playNextSong = async () => {
	Howler.unload();
	let currentSongIndex = get(currentSongId);
	const nextSongId = currentSongIndex + 1;
	// @ts-ignore
	const nextSong = await db.songs.get(nextSongId);
	if (nextSong) {
		Howler.unload();

		await playFile(nextSong.fileName, nextSong.title, nextSong.artist, nextSong.album, nextSong.id);
	} else {
		console.log(`Song ${nextSongId} not found. Skipping to next song.`);
		// await playNextSong();
	}
};

export const playPreviousSong = async () => {
	Howler.unload();

	let currentSongIndex = get(currentSongId);
	console.log('currentSongId', currentSongIndex);
	const previousSongId = currentSongIndex - 1;
	// @ts-ignore
	const previousSong = await db.songs.get(previousSongId);
	if (previousSong) {
		Howler.unload();

		await playFile(
			previousSong.fileName,
			previousSong.title,
			previousSong.artist,
			previousSong.album,
			previousSong.id
		);
	} else {
		console.log(`Song ${previousSongId} not found. Skipping to previous song.`);
		// await playPreviousSong();
	}
};

export const pause = () => {
	sound.pause();
};

export const resume = () => {
	sound.play();
};

/**
 * Checks if the sound is currently playing.
 * @returns {boolean} True if the sound is playing, false otherwise.
 */
export const isPlaying = () => {
	if (sound) {
		return sound.playing();
	}
	return false;
};

/**
 * Gets the current playback progress of the sound as a percentage.
 * @returns {number} The current playback progress as a percentage.
 */
export const getPlaybackProgress = () => {
	if (sound) {
		const progress = sound.seek();
		const duration = sound.duration();
		return (progress / duration) * 100;
	}
	return 0;
};

/**
 * Gets the current playback progress and duration of the sound as a formatted string.
 * @returns {string} The current playback progress and duration as a formatted string.
 */
export const getPlaybackTime = () => {
	if (sound) {
		const progress = formatTime(sound.seek());
		const duration = formatTime(sound.duration());
		return `${progress} / ${duration}`;
	}
	return '0:00 / 0:00';
};

/**
 * Formats the given time in seconds as a string in the format "mm:ss".
 * @param {number} time The time in seconds.
 * @returns {string} The formatted time string.
 */
const formatTime = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Sets the playback position of the sound to the given position in seconds.
 * @param {number} position The position to seek to in seconds.
 */
export const setPlaybackPosition = (position) => {
	if (sound) {
		sound.seek(position);
	}
};

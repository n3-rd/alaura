import { readBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { Howl, Howler } from 'howler';

/**
 * @type {Howl}
 */
export let sound;

export const playFile = async (/** @type {string} */ file) => {
	Howler.unload();
	const contents = await readBinaryFile(file, { dir: BaseDirectory.Audio });
	console.log('contents', contents);
	const blob = new Blob([new Uint8Array(contents)], { type: 'audio/wav' });

	sound = new Howl({
		src: [window.URL.createObjectURL(blob)],
		format: ['mp3'],
		html5: true,
		preload: true
	});
	sound.play();
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

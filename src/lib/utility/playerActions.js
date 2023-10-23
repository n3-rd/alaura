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
		html5: true
	});
	sound.play();
};

export const pause = () => {
	sound.pause();
};

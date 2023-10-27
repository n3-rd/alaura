import { writable } from 'svelte/store';

export const currentPlaying = writable({
	title: 'No song playing',
	artist: 'No artist',
	album: 'No album',
	artwork: 'No cover'
});

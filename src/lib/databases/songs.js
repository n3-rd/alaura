import Dexie from 'dexie';

export const db = new Dexie('musicDatabase');
db.version(1).stores({
	songs: '++id, album, artist, title, fileName' // Primary key and indexed props
});

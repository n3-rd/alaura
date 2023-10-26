import Dexie from 'dexie';

export const db = new Dexie('musicDatabase');
db.version(2).stores({
	songs: '++id, album, artist, title, fileName, duration, year' // Primary key and indexed props
});

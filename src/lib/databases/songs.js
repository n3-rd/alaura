import Dexie from 'dexie';

export const db = new Dexie('musicDatabase');
db.version(3).stores({
	songs: '++id, album, artist, title, fileName, duration, year, filePath' // Primary key and indexed props
});

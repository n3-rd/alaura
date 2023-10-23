import { invoke } from '@tauri-apps/api/tauri';

export const listFiles = async () => {
	let files = await invoke('get_audio_files');
	return files;
};

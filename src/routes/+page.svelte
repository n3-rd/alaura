<script>
	import MusicList from '$lib/components/MusicList.svelte';
	import { readAudioFiles } from '$lib/utility/indexMusic';
	const listFiles = async () => {
		const files = await readAudioFiles();
		console.log(files);
	};

	listFiles();
</script>

<MusicList />

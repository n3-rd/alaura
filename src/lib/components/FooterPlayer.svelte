<script>
	import { currentPlaying } from "$lib/stores/currentPlaying";
	import { loadImage } from "$lib/utility/libraryActions";
	import PlayerActions from "./PlayerActions.svelte";
	import ProgressBar from "./ProgressBar.svelte";


	/**
	 * @type {string}
	 */
let e;
$: e = $currentPlaying.artwork;
</script>
<div class="h-20 border-t border-gray-700">
<div class="w-full h-full flex justify-between items-center">
  {#await loadImage(e) then artworkUrl}

    <div class="now-playing-art h-full w-[13%] flex justify-between gap-2">
        <img src={artworkUrl} class="w-20 h-full object-cover object-center" alt="Now playing artwork">
    </div>
  {/await}
  <ProgressBar/>
<PlayerActions/>
</div>
</div>

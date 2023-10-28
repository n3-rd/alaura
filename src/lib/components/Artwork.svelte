<script>import { loadImage } from "$lib/utility/libraryActions";
import { currentPlaying, currentSongId } from "$lib/stores/currentPlaying";


/**
 * @type {string}
 */
let e;
$: e = $currentPlaying.artwork;
</script>
{#await loadImage(e) then artworkUrl}
    <div class="now-playing-art h-full w-[13%] flex justify-between gap-2">
        <img src={artworkUrl} class="w-20 h-full object-cover object-center" alt="Now playing artwork">
    </div>
{/await}
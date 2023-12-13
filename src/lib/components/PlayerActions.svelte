<script>
	import { pause, resume, isPlaying, playPreviousSong, playNextSong } from "$lib/utility/playerActions";
    import {Pause, Play, PlaySkipBack, PlaySkipForward} from "svelte-ionicons";
   /**
	 * @type {boolean}
	 */
   let soundPlaying;
   // @ts-ignore
   setInterval(() => {
       soundPlaying = isPlaying();
   }, 100);

</script>
<div class="actions w-[23%] flex justify-around">
    <button
    on:click={playPreviousSong}
    >
        <PlaySkipBack class="w-8 h-8 text-gray-500 hover:text-gray-300 cursor-pointer"/>
    </button>

    {#if soundPlaying}
    <button
    on:click={pause}
    >
    <Pause class="w-8 h-8 text-gray-500 hover:text-gray-300 cursor-pointer"/>
    </button>
    {:else}
    <button
    on:click={resume}
    >
    <Play class="w-8 h-8 text-gray-500 hover:text-gray-300 cursor-pointer"/>
    </button>
    {/if}
    <button
    on:click={playNextSong}
    >
    <PlaySkipForward class="w-8 h-8 text-gray-500 hover:text-gray-300 cursor-pointer"/>

    </button>

</div>
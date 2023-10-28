<script>
	import { addFiles, loadImage, sanitizeFileName } from "$lib/utility/libraryActions";
	import { playFile } from "$lib/utility/playerActions";
	import FileDrop from 'svelte-tauri-filedrop'
    import { initializeStores } from '@skeletonlabs/skeleton';
    import { liveQuery } from "dexie";
    import {db } from '$lib/databases/songs';

initializeStores();


	/**
	 * @type {any[]}
	 */
let songs = [];

// @ts-ignore
liveQuery(() => db.songs.toArray()).subscribe((value) => {
  songs = value;
});

const playMusic = async (/** @type {String} */ e, /** @type {String} */ title, /** @type {String} */ artist, /** @type {String} */ album, /** @type {number} */ id)=>{
  playFile(e, title, artist, album, id);
}


	/**
	 * @param {any} paths
	 */
function open(paths) {
    paths.forEach((/** @type {any} */ path) => {
      addFiles(path);
    });
  }

  let fileDrag = false;

  
  
</script>


{#if fileDrag}
<FileDrop extensions={['mp3']} handleFiles={open} let:files>

    <div class="dropzone z-[999] h-screen w-screen absolute bg-[#eee]" class:droppable={files.length > 0}

        
        >
      <h2>Drop JSON files</h2>
    </div>
  </FileDrop>

  {/if}
<table class="table table-hover rounded-none"
on:dragover={() => fileDrag = true}
on:dragleave={() => fileDrag = false}
>
    <thead>
        <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Duration</th>
            <th>Album</th>
        </tr>
    </thead>

    <tbody>
        {#each songs as song}
        {#await loadImage(song.title + song.artist) then artworkUrl}
            <tr class="cursor-pointer" 
            on:click={() => playMusic(song.fileName, song.title, song.artist, song.album, song.id)}
            >
                <td class="flex gap-3 items-center">
                    <img src={artworkUrl} class="w-12 rounded-xl" alt="">
                    <div class="font-bold">{song.title}</div>
                </td>
                <td>{song.artist}</td>
                <!-- <td>{song.duration}</td> -->
                <td>3:00</td>
                <td>{song.album}</td>
            </tr>
            {/await}
        {/each}
    </tbody>
</table>

  
  <style>
    .droppable {
      background: #d6dff0;
    }
  </style>
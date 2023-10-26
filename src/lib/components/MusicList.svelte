<script>
	import { listFiles, addFiles, sanitizeFileName } from "$lib/utility/libraryActions";
	import { pause, playFile } from "$lib/utility/playerActions";
	import FileDrop from 'svelte-tauri-filedrop'
    import { initializeStores } from '@skeletonlabs/skeleton';
    import { liveQuery } from "dexie";
    import {db } from '$lib/databases/songs';
    import { appDataDir, join } from '@tauri-apps/api/path';
    import { convertFileSrc } from '@tauri-apps/api/tauri';
initializeStores();


	/**
	 * @type {any[]}
	 */
let songs = [];

liveQuery(() => db.songs.toArray()).subscribe((value) => {
  songs = value;
});

const playMusic = async () => {
  let files = await listFiles();
  console.log('files', files);
  playFile(files[4]);

};



	/**
	 * @param {any} paths
	 */
function open(paths) {
    paths.forEach((/** @type {any} */ path) => {
      addFiles(path);
    });
  }

  let fileDrag = false;

  const loadImage =async(/** @type {string} */ e)=>{
        const appDataDirPath = await appDataDir();
       let sanitizedName = sanitizeFileName(e);
      const filePath = await join(appDataDirPath, `${sanitizedName}.png`);
      console.log('filePath', filePath);
      const assetUrl = convertFileSrc(filePath);
      return assetUrl;
  }
  
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
            on:click={() => playMusic()}
            >
                <td class="flex gap-3 items-center">
                    <!-- <Avatar src={`/img/${song.image}.png`} width="w-12" rounded="rounded-xl" /> -->
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
<script>
	import { listFiles, addFiles } from "$lib/utility/libraryActions";
	import { pause, playFile } from "$lib/utility/playerActions";
	import FileDrop from 'svelte-tauri-filedrop'
    import { initializeStores } from '@skeletonlabs/skeleton';

initializeStores();

    let songs = [
        {
            name: 'Bd Baby',
            artist: 'Seyi Vibez',
            duration: '3:00',
            album: 'Billion Dollar Baby',
            image: 'bdbaby'
        },
 ]


const playMusic = async () => {
  let files = await listFiles();
  console.log('files', files);
    playFile(files[3]);

    setTimeout(() => {
        pause();
    }, 6000);
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
            <tr class="cursor-pointer" 
            on:click={() => playMusic()}
            >
                <td class="flex gap-3 items-center">
                    <!-- <Avatar src={`/img/${song.image}.png`} width="w-12" rounded="rounded-xl" /> -->
                    <img src={`/img/${song.image}.png`} class="w-12 rounded-xl" alt="">
                    <div class="font-bold">{song.name}</div>
                </td>
                <td>{song.artist}</td>
                <td>{song.duration}</td>
                <td>{song.album}</td>
            </tr>
        {/each}
    </tbody>
</table>

  
  <style>
    .droppable {
      background: #d6dff0;
    }
  </style>
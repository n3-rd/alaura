<script>
	import { listFiles } from "$lib/utility/libraryActions";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { convertFileSrc } from "@tauri-apps/api/tauri";
    // import { audioDir, join } from '@tauri-apps/api/path';
    import { readBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
	import { onMount } from "svelte";
    // import Amplitude from 'amplitudejs'
    import {Howl, Howler} from 'howler';
    import { browser } from "$app/environment";
	import { pause, playFile } from "$lib/utility/playerActions";

    let songs = [
        {
            name: 'Bd Baby',
            artist: 'Seyi Vibez',
            duration: '3:00',
            album: 'Billion Dollar Baby',
            image: 'bdbaby'
        },
        {
            name: '+234',
            artist: 'Seyi Vibez',
            duration: '3:00',
            album: 'Billion Dollar Baby',
            image: 'bdbaby'
        },
         {
            name: 'Terminator',
            artist: 'Asake',
            duration: '2:43',
            album: 'Mr Money with the vibe',
            image: 'mrmoney'
        }, {
            name: 'Damages',
            artist: 'Tems',
            duration: '3:20',
            album: 'Damages',
            image: 'damages'
        }, {
            name: 'Commander',
            artist: 'Blaqbonez',
            duration: '3:24',
            album: 'Commander',
            image: 'commander'
        },
        {
            name: 'Lonely At The Top',
            artist: 'Asake',
            duration: '2:30',
            album: 'Work Of Art',
            image: 'workofart'
        }    ]


const playMusic = async () => {
  let files = await listFiles();
  console.log('files', files);
    playFile(files[3]);

    setTimeout(() => {
        pause();
    }, 6000);
};

</script>
<table class="table table-hover rounded-none">
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
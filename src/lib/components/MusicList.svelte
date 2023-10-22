<script>
	import { Avatar } from "@skeletonlabs/skeleton";

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
    ]

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
            <tr class="cursor-pointer">
                <td class="flex gap-3 items-center">
                    <Avatar src={`/img/${song.image}.png`} width="w-12" rounded="rounded-xl" />
                    <div class="font-bold">{song.name}</div>
                </td>
                <td>{song.artist}</td>
                <td>{song.duration}</td>
                <td>{song.album}</td>
            </tr>
        {/each}
    </tbody>
</table>
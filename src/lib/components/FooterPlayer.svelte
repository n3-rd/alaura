<script>
	import { ProgressBar } from "@skeletonlabs/skeleton";
    import {HeartOutline, Megaphone, MegaphoneOutline, Pause, Play, Repeat, Shuffle, VolumeHigh, VolumeMedium} from "svelte-ionicons";
</script>
<div class="h-20 border-t border-gray-700">
<div class="w-full h-full flex justify-between items-center">
    <div class="now-playing-art h-full w-[7%] flex justify-between gap-2">
        <img src="/img/bdbaby.png" class="w-20 h-full object-cover object-center" alt="Now playing artwork">
    </div>
    <div class="progress-bar w-[65%] flex flex-col gap-1">
        <div class="title">Bullion Van</div>
        <ProgressBar label="Progress Bar" value={50} max={100} />
        <div class="timer">1:30 / 2:47</div>
    </div>
    <div class="actions w-[23%] flex justify-around">
        <HeartOutline class="w-8 h-8 text-gray-500"/>
        <Shuffle class="w-8 h-8 text-gray-500"/>
        <Repeat class="w-8 h-8 text-gray-500"/>
        <VolumeMedium class="w-8 h-8 text-gray-500"/>

    </div>
</div>
</div>

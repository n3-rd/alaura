<script>
	import PlayerActions from "./PlayerActions.svelte";
	import ProgressBar from "./ProgressBar.svelte";



</script>
<div class="h-20 border-t border-gray-700">
<div class="w-full h-full flex justify-between items-center">
    <div class="now-playing-art h-full w-[7%] flex justify-between gap-2">
        <img src="/img/bdbaby.png" class="w-20 h-full object-cover object-center" alt="Now playing artwork">
    </div>
  <ProgressBar/>
<PlayerActions/>
</div>
</div>

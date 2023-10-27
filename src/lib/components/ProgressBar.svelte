<script>
	import { getPlaybackProgress, getPlaybackTime, setPlaybackPosition, sound } from "$lib/utility/playerActions";
  import { RangeSlider } from '@skeletonlabs/skeleton';
    /**
	 * @type {number}
	 */
     let progress;
     /**
	 * @type {string}
	 */
     let playTime;
    setInterval(() => {
        progress = getPlaybackProgress();
   playTime = getPlaybackTime();

    }, 100);

    
    /**
   * Seeks the playback position to the given percentage.
   * @param {number} percentage The percentage to seek to.
   */
  const seekPlaybackPosition = (percentage) => {
    const duration = sound.duration();
    const position = (percentage / 100) * duration;
    setPlaybackPosition(position);
  };

  const sayHello = ()=>{
    console.log("hello")
  }

   const handleProgressBarClick = (event) => {
    const progressBar = event.currentTarget;
    const boundingRect = progressBar.getBoundingClientRect();
    const percentage = (event.clientX - boundingRect.left) / boundingRect.width * 100;
    seekPlaybackPosition(percentage);
  };
</script>
<div class="progress-bar w-[65%] flex flex-col gap-1">
    <div class="title">Bullion Van</div>
      <RangeSlider name="prog" label="Progress Bar" value={progress} max={100} 
      on:click={handleProgressBarClick}
  accent="accent-surface-900 dark:accent-surface-50"
      />
    <div class="timer">{playTime}</div>
  </div>
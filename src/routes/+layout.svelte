
<script>
	import FooterPlayer from '$lib/components/FooterPlayer.svelte';
import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer">
		<FooterPlayer/>
	</svelte:fragment>
</AppShell>
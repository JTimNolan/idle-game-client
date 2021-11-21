<script>
	import { orbs } from './stores';
	import OrbSlot from './OrbSlot.svelte'
</script>

<div class="orb-bar">
	{#each Array(7) as _, i}
			<OrbSlot orb={$orbs[i] || null}></OrbSlot>
	{/each}
</div>

<style>
	.orb-bar {
		display: flex;
		padding-top: 15px;
	}
</style>
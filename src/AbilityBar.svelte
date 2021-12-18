<script>
	import AbilitySlot from './AbilitySlot.svelte';

	let expanded = true;
	
	export var activeIndex = 0;
</script>

<div class="ability-bar">
	<div class="expand-icon" on:click={() => expanded = !expanded}>
		{#if expanded}
			<span>&minus;</span>
		{:else}
			<span>&plus;</span>
		{/if}
	</div>
	{#each Array(5) as _, slot}
			<AbilitySlot active={activeIndex == slot} {slot} {expanded} />
	{/each}
</div>

<style>
	.ability-bar {
		display: flex;
		justify-content: center;
		align-items: stretch;
		position: relative;
	}
	.expand-icon {
		position: absolute;
		right: 100%;
		height: 20px;
		width: 20px;
		line-height: 1;
		margin-right: 15px;
		border: 1px solid black;
		border-radius: 3px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.expand-icon span {
		margin-top: -4px;
		font-size: 20px;
		font-weight: bold;
	}
</style>
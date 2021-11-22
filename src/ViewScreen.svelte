<script>
	import { player, enemy } from './stores';
	import Character from './Character.svelte';
</script>

<div class="viewscreen">
	<Character character={$player} side="left"></Character>
	{#if $enemy}
		<Character character={$enemy} side="right"></Character>
	{/if }
</div>

<style>
	.viewscreen {
		overflow: hidden;
		position: relative;
		border: 1px solid #333;
		height: 400px;
		min-height: 250px;
		width: 700px;
		margin: 20px;
	}
</style>
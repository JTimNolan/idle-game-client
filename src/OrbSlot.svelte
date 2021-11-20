<script>
	import {orbs} from "./data";
	export var orb;
</script>

{#if orb}
	<div class="orb-slot" title={orbs[orb].title} style="--orb-color: {orbs[orb].color}">
		{orb}
	</div>
{:else}
	<div class="orb-slot"></div>
{/if}

<style>
	.orb-slot {
		border-radius: 50%;
		height: 40px;
		width: 40px;
		border: 1px solid #333;
		margin: 5px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 26px;
		font-weight: 500;
		border-color: var(--orb-color);
		color: var(--orb-color);
	}
</style>
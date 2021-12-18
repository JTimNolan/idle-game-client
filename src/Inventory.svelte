<script>
    import { inventory } from './stores';
    import ItemTile from './ItemTile.svelte';
</script>

<div class="inventory-container">
	{#each $inventory as item}
        <div class="inventory-slot">
            {#if !!item}
                <ItemTile {item} />
            {/if}
        </div>
    {/each}
</div>

<style>
    .inventory-container {
        display: flex;
        flex-wrap: wrap;
        width: 370px;
        margin: 0 auto;
    }
	.inventory-slot {
		height: 40px;
		width: 40px;
		border: 1px solid black;
		overflow: hidden;
        margin: 5px;
	}
</style>
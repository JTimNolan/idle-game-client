<script>
    import { equipment } from './stores';
    import ItemTile from './ItemTile.svelte';
</script>

<div class="equipment-container">
	{#each $equipment as item, i}
        <div class={"equipment-slot equipment-slot-"+i}>
            {#if !!item}
                <ItemTile {item} />
            {/if}
        </div>
    {/each}
</div>

<style>
    .equipment-container {
        left: 50%;
        margin-left: -30px;
        margin-top: 5px;
        width: 200px;
        height: 195px;
        position: relative;
    }
	.equipment-slot {
        position: absolute;
		height: 40px;
		width: 40px;
		border: 1px solid black;
		overflow: hidden;
	}
    .equipment-slot-1 {
        top: 50px;
    }
    .equipment-slot-2 {
        top: 100px;
    }
    .equipment-slot-3 {
        top: 150px;
    }
    .equipment-slot-4 {
        top: 50px;
        margin-left: -50px;
    }
    .equipment-slot-5 {
        top: 50px;
        margin-left: 50px;
    }
    .equipment-slot-6 {
        top: 100px;
        margin-left: -50px;
    }
    .equipment-slot-7 {
        top: 100px;
        margin-left: 50px;
    }
</style>
<script>
	import { activeAbilities, player } from './stores';
    import { abilities } from './data';
    import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
    import AbilityTile from "./AbilityTile.svelte";
    export var slot, expanded, active;

    let ability = abilities[$activeAbilities[slot]];
    let items = [{id:0, ...ability}];

    $: abilitySpeed = ability.speed * 1000;
    $: windup = active ? $player.abilityWindup : 0;
    $: completion = windup/abilitySpeed*100;

    function handleDndConsider(e) {
        if(e.detail.items.length == 0){
            e.detail.items = [abilities[0]];
        }
        items = e.detail.items;
    }
    
    function handleDndFinalize(e) {
        e.detail.items = e.detail.items.filter(item => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
        items = [e.detail.items[0]];
        $activeAbilities[slot] = items[0].id;
        $activeAbilities = $activeAbilities;
        ability = abilities[items[0].id];
    }
</script>

<div use:dndzone={{items, morphDisabled: true}} on:finalize={handleDndFinalize} on:consider={handleDndConsider}>
    {#each items as item, i (item.id)}
        {#if i === 0 }
            <AbilityTile {active} {ability} {expanded} {completion} />
        {:else}
            <div />
        {/if}
    {/each}
</div>

<style>
</style>
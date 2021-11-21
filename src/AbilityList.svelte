<script>
    import {abilities} from './data';
    import AbilityTile from './AbilityTile.svelte';
    import {dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, TRIGGERS, DRAGGED_ELEMENT_ID} from "svelte-dnd-action";

    let items = Object.values(abilities);
    function handleDndConsider(e){
        const {trigger, id} = e.detail.info;
        if(trigger === TRIGGERS.DRAG_STARTED){
            const idx = items.findIndex(item => item.id === id);
            const newId = `${id}_copy`;
            e.detail.items = e.detail.items.filter(item => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
            e.detail.items.splice(idx, 0, {...items[idx], id: newId});
            items = e.detail.items;
        }
        else {
            items = [...items];
        }
    }
    function handleDndFinalize(e) {
        items = e.detail.items.map(item => {
            item.id = typeof item.id === 'string' ? parseInt(item.id.replace('_copy', '')) : item.id;
            return item;
        });
    }
</script>

<div class="ability-list-container">
    <div class="ability-list" use:dndzone={{items}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
        {#each items as ability (ability.id)}
            <AbilityTile expanded={true} {ability} dragging={!!ability[SHADOW_ITEM_MARKER_PROPERTY_NAME]} />
        {/each}
    </div>
</div>

<style>
    .ability-list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        text-align: left;
        max-width: 1300px;
        margin: 0 auto;
    }
</style>
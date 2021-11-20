<script>
	import Effect from './Effect.svelte';
    export var effects = [];
</script>

<div class="effect-group">
    {#each effects as effect (`${effect.type}_${effect.start}_${effect.text}`)}
        <Effect {effect} />
    {/each}
</div>

<style>
    .effect-group {
        position: relative;
    }
</style>
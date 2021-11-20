<script>
	import { sineOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    export var effect;

</script>

<div class="effect type-{effect.type}" out:fly={{duration: 1500, y: -50, opacity: 0, easing: sineOut}}>
    {effect.text}
</div>

<style>
    .effect {
        font-weight: bold;
        text-align: center;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .type-damage {
        color: #e81224;
    }
    .type-heal {
        color: #16c60c;
    }
</style>
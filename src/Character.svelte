<script>
	import HealthBar from './HealthBar.svelte';
	import EffectGroup from './EffectGroup.svelte';
	export var character;
	export var side;
</script>

<div class={"character side-"+side} >
	<EffectGroup effects={character.effects} />
	<div class="title">{character.title}</div>
	<HealthBar health={character.health} maxHealth={character.maxHealth}></HealthBar>
	<div class="sprite"></div>
</div>

<style>
	.title {
		text-align: center;
	}
	.character {
		position: absolute;
		bottom: 5%;
	}
	.sprite {
		width: 100px;
		height: 160px;
		border: 1px solid #333;
	}
	.side-left {
		left: 20%;
	}
	.side-right {
		right: 20%;
	}
</style>
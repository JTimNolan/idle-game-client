<script>
	import {orbs} from "./data";
	export var ability = null, expanded = false;
	export var dragging = false;
	export var active = false;
	export var completion = 0;
</script>

{#if ability && expanded}
	<div class="expanded ability-tile" class:active={active} class:dragging={dragging} style="--completion-percent: {completion}%">
		<b>{ability.name}</b>
		<br />
		💨: {ability.speed}
		{#if ability.damage > 0}
			⚔: {ability.damage}
		{/if}
		{#if ability.heal > 0}
			💚: {ability.heal}
		{/if}
		{#if ability.cost}
			<br />
			➖: {Object.entries(ability.cost).map(([orb, cost]) => {
				return orbs[orb].icon.repeat(cost);
			}).join('')}
		{/if}
		{#if ability.orbs}
			<br />
			➕: {ability.orbs.map(orb => {
				return orbs[orb].icon;
			}).join('')}
		{/if}
		<div class="progress-bar"></div>
	</div>
{:else if ability}
	<div class="ability-tile icon" class:active={ability.active} title={`${ability.name}: ${ability.damage} damage`} style="--completion-percent: {completion}%">
		{ability.icon}
		<div class="progress-bar"></div>
	</div>
{:else if expanded}
	<div class="expanded ability-tile">
		Nothing!
	</div>
{:else}
	<div class="ability-tile"></div>
{/if}

<style>
	.ability-tile {
		position: relative;
        visibility: visible!important;
		border-radius: 5px;
		height: 50px;
		width: 50px;
		border: 1px solid #333;
		background-color: #EEE;
		margin: 5px;
		padding: 5px;
	}
	.progress-bar {
		height: 100%;
		width: 0%;
		width: var(--completion-percent);
		position: absolute;
		left: 0;
		top: 0;
		background-color:#333;
		opacity: .2;
	}
	.ability-tile.dragging {
		opacity: .8;
	}
	.ability-tile.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 26px;
		font-weight: 500;
	}
	.ability-tile.expanded {
		height: auto;
		width: 150px;
	}
	.ability-tile.active {
		border-width: 3px;
		margin: 3px;
	}
</style>
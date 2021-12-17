<script>
	import { player, activeAbilities, enemy, orbs } from './stores';
	import { abilities, enemies, locationList } from './data';
	import ViewScreen from './ViewScreen.svelte';
	import OrbBar from './OrbBar.svelte';
	import AbilityBar from './AbilityBar.svelte';
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import AbilityList from './AbilityList.svelte';

	let enemiesKilled = 0;
	
	function loadGame(){
		const loadedStateString = localStorage.getItem('gameState');
		if(!loadedStateString || !loadedStateString.length){
			return false;
		}
		const state = JSON.parse(loadedStateString);
		if(!state){
			return false;
		}
		console.log("Loaded game");
		$activeAbilities = state.activeAbilities || $activeAbilities;
		$player = state.player || $player;
		goToLocation($player.location);
	}
	function saveGame(){
		const state = {
			activeAbilities: $activeAbilities,
			player: $player,
			savedAt: new Date().getTime(),
			version: '0.0.1',
		};
		localStorage.setItem('gameState', JSON.stringify(state));
		return true;
	}
	function goToLocation(locationId){
		if(locationId == 0){
			stopCombat();
		} else {
			startCombat(enemies.TEST);
		}
		$player.location = locationId;
	}
	
	if(!loadGame()){
		goToLocation(0);
		saveGame();
	}

	// TODO: Use a real game loop
	// TODO: Fix issue where cost is not considered for first turn
	// TODO: Handle case where no moves can be played
	// TODO: Combo system
	const tickrate = 50;
	const loopInterval = setInterval(tick, tickrate);
	function tick(){
		playerTick();
		enemyTick();
		saveGame();
	}
	const playerTick = () => {
		if(!$enemy){
			return;
		}
		const ability = abilities[$activeAbilities[$player.activeAbilityIndex]];

		$player.effects = clearOldEffects($player.effects);

		if(!canPayOrbCost(ability.cost, $orbs)){
			goToNextAbility($player.activeAbilityIndex);
			return;
		}

		// Tick ability windup
		$player.abilityWindup += tickrate;

		// Handle using ability
		const abilitySpeed = ability.speed * 1000;
		if($player.abilityWindup >= abilitySpeed){
			// Remove orb cost
			$orbs = subtractAllOrbCosts(ability, $orbs);
			const comboMultiplier = getComboMultiplier($player.combo);
			const damage = (ability.damage || 0) * comboMultiplier;
			const heal = (ability.heal || 0) * comboMultiplier;
			$enemy.health -= damage;
			$player.health += heal;
			if($player.health > $player.maxHealth){
				$player.health = $player.maxHealth;
			}
			$player.abilityWindup -= abilitySpeed;
			if(damage > 0){
				$enemy.effects = [...$enemy.effects, {
					text: `-${damage}`,
					start: new Date().getTime(),
					type: 'damage',
				}];
			}
			if(heal > 0){
				$player.effects = [...$player.effects, {
					text: `${heal}`,
					start: new Date().getTime(),
					type: 'heal',
				}];
			}
			combatLog(`Player uses ${ability.name} (Damage: ${damage}, Heal: ${heal}) Combo: ${comboMultiplier}x`);
			// Handle ability orbs
			if(ability.orbs){
				$orbs = [...$orbs, ...ability.orbs];
			}
			if($orbs.length == 0){
				$player.combo = 0;
			} else if($orbs.length > $player.maxOrbs){
				$player.effects = [...$player.effects, {
					text: `Combo Reset!`,
					start: new Date().getTime(),
					type: 'damage',
				}];
				$player.combo = 0;
				$orbs = $orbs.slice(-1*$player.maxOrbs);

			}
			// Increment combo counter
			if(ability.speed > 0){
				$player.combo += 1;
			}
			goToNextAbility($player.activeAbilityIndex);
		}
	}
	const enemyTick = () => {
		if(!$enemy){
			return;
		}
		$enemy.effects = clearOldEffects($enemy.effects);
		// Handle enemy death
		if($enemy.health <= 0){
			// $enemy.effects = [...$enemy.effects, {
			// 	text: `RIP`,
			// 	start: new Date().getTime(),
			// 	type: 'damage',
			// }];
			const reward = Math.floor(Math.random()*($enemy.maxHealth/10))+1;
			$player.gold += reward;
			combatLog(`${$enemy.title} killed! Found ${reward} gold.`);
			const newHealth = $enemy.maxHealth + 10;
			startCombat({...$enemy, health: newHealth, maxHealth: newHealth});
			return;
		}
		$enemy.abilityWindup += tickrate;
		const abilitySpeed = $enemy.speed * 1000;
		if($enemy.abilityWindup >= abilitySpeed){
			$enemy.abilityWindup -= abilitySpeed;
			$player.health -= $enemy.damage;
			$player.effects = [...$player.effects, {
				text: `-${$enemy.damage}`,
				start: new Date().getTime(),
				type: 'damage',
			}];
			combatLog(`${$enemy.title} attacks for ${$enemy.damage} damage`);
			if($player.health <= 0){
				// TODO: Message for player death
				$player.health = $player.maxHealth;
				$player.gold = 0;
				goToLocation(0);
				// $player.effects = [...$player.effects, {
				// 	text: `RIP`,
				// 	start: new Date().getTime(),
				// 	type: 'damage',
				// }];
			}
		}
	}
	const goToNextAbility = abilityIndex => {
		let nextAbilityIndex = !!$activeAbilities[abilityIndex+1] ? abilityIndex + 1 : 0;
		const ability = abilities[$activeAbilities[nextAbilityIndex]];
		
		// Check if current ability has enough orbs
		if(ability.cost && !canPayOrbCost(ability.cost, $orbs)){
			combatLog("Not enough orbs to use "+ability.name+", skipping");
			goToNextAbility(nextAbilityIndex);
			return;
		}
		$player.activeAbilityIndex = nextAbilityIndex;
	}
	function canPayOrbCost(abilityCost, orbs){
		if(!abilityCost){
			return true;
		}
		const orbCounts = orbs.reduce(function (acc, curr) {
			return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
		}, {});
		return Object.entries(abilityCost).every(([orbType, amount]) => {
			return orbCounts[orbType] && orbCounts[orbType] >= amount; 
		});
	}
	function subtractAllOrbCosts(ability, orbs){
		if(!ability.cost){
			orbs;
		}
		const costs = {...ability.cost};
		return orbs.filter(orb => {
			if(costs[orb]){
				costs[orb]--;
				return false;
			}
			return true;
		});
	}
	function getComboMultiplier(combo){
		return Math.floor((combo + 1)**.5);
	}
	function clearOldEffects(effects, gap = 1){
		gap = (new Date().getTime()) - gap;
		return effects.filter(e => e.start > gap);
	}
	function startCombat(enemyData){
		$enemy = enemyData;
		$enemy.abilityWindup = 0;
		$player.activeAbilityIndex = 0;
		$player.abilityWindup = 0;
		$player.combo = 0;
		$orbs = [];
	}
	function stopCombat(){
		$enemy = false;
		$player.activeAbilityIndex = 0;
		$player.abilityWindup = 0;
		$player.combo = 0;
		$orbs = [];
	}
	function combatLog(line){
		return false;
		console.log(line);
	}
</script>

<main class="app">
	<div>Gold: {$player.gold} | Combo: {getComboMultiplier($player.combo)}x ({$player.combo} hit{$player.combo != 1 ? 's' : ''})</div>
	<ViewScreen></ViewScreen>
	<AbilityBar activeIndex={$player.activeAbilityIndex}></AbilityBar>
	<OrbBar></OrbBar>
	<Tabs>
		<TabList>
			<Tab>Abilities</Tab>
			<Tab>Travel</Tab>
			<Tab>Inventory</Tab>
			<Tab>Equipment</Tab>
			{#if $player.location == 0}
				<Tab>Shop</Tab>
			{/if}
		</TabList>
		<TabPanel>
			<AbilityList></AbilityList>
		</TabPanel>
		<TabPanel>
			<div>
				{#each locationList as location (location.id)}
					<div>
						<button on:click={e => goToLocation(location.id)}>{location.name}</button>
					</div>
				{/each}
			</div>
		</TabPanel>
		<TabPanel>
			<div>
				Inventory will go here!
			</div>
		</TabPanel>
		<TabPanel>
			<div>
				Equipment will go here!
			</div>
		</TabPanel>
		{#if $player.location == 0}
			<TabPanel>
				<div>
					Shop will go here!
				</div>
			</TabPanel>
		{/if}
	</Tabs>
</main>

<style>
	.app {
		display: flex;
		min-height: 100%;
		min-width: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
    :global(#dnd-action-dragged-el){
        opacity: .9 !important;
    }
	:global(.svelte-tabs) {
		width: 100%;
		text-align: center;
		padding-top: 30px;
	}
	:global(.svelte-tabs__tab-panel) {
		padding-top: 20px;
	}
</style>
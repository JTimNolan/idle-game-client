import { writable } from 'svelte/store';

export const player = writable({
    title: "Player",
    health: 100,
    maxHealth: 100,
    activeAbilityIndex: 0,
    abilityWindup: 0,
    maxOrbs: 7,
    gold: 0,
    combo: 0,
    effects: [],
    location: 0,
});

export const activeAbilities = writable([2,3,4,5,0]);

export const orbs = writable([]);

export const enemy = writable({
    title: "Enemy",
    health: 100,
    maxHealth: 100,
    damage: 1,
    speed: 2.5,
    abilityWindup: 0,
    effects: [],
});

export const inventory = writable(new Array(28));

export const equipment = writable(new Array(8));
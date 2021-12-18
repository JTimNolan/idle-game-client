
const listToObject = list => {
    return list.reduce((carry, item, index) => {
        item.id = index;
        carry[item.id] = item;
        return carry;
    }, {});
}

export const abilityList = [
    {name: "Nothing!", icon: "-", damage: 0, speed: 0},
    {name: "Punch", icon: "P", damage: 1, speed: 2},
    {name: "Fire Bolt", icon: "F", damage: 1, speed: 2, orbs: ['F']},
    {name: "Kick", icon: "K", damage: 2, speed: 3, orbs: ['P']},
    {name: "Roundhouse", icon: "R", damage: 3, speed: 2, cost: {P: 2}},
    {name: "Healing Flame", icon: "H", speed: 5, damage: 0, heal: 8, cost: {F: 2, P: 1}},
    {name: "Splash", icon: "S", damage: 0, speed: 1, orbs: ['W']},
    {name: "Steam Blast", icon: "SB", damage: 3, speed: 1, cost: {W: 2, F: 1}, orbs: ['W']},
    {name: "Ice Armor", icon: "IA", heal: 5, speed: 1, cost: {W: 3}},
    {name: "Rock Toss", icon: "RT", damage: 2, speed: 5, orbs: ['E', 'E']},
    {name: "Stone Fist", icon: "SF", damage: 4, speed: 3, cost: {P: 1, E: 1}, orbs: ['P', 'P']},
    {name: "Mud Slap", icon: "MS", damage: 3, speed: 2, cost: {W: 1, E: 1}, orbs: ['E', 'P']},
    {name: "Landslide", icon: "LS", damage: 20, speed: 5, cost: {E: 5}},
];
export const abilities = listToObject(abilityList);

export const orbs = {
    "P": {
        title: "Physical",
        color: '#383838',
        icon: '⚫',
    },
    "F": {
        title: "Flame",
        color: '#e81224',
        icon: '🔴',
    },
    "W": {
        title: "Water",
        color: '#0078d7',
        icon: '🔵',
    },
    "E": {
        title: "Earth",
        color: '#8e562e',
        icon: '🟤',
    },
};

export const locationList = [
    {name: "Town"},
    {name: "Killing Fields"},
];
export const locations = listToObject(locationList);

// export const enemies = Object.entries({
    // TEST: {name: "Test Enemy"}
// }).map(([value, id]) => {return {...value, id}});

export const enemies = {
    TEST: {
        title: "Test Enemy",
        health: 100,
        maxHealth: 100,
        damage: 1,
        speed: 2.5,
        abilityWindup: 0,
        effects: [],
    },
};

export const items = [
    {
        title: "Wood Club",
        strength: 10,
        accuracy: 10,
        defense: 5,
        magic_defense: 3,
        value: 5,
        equipment_slots: [4,5],
    },
    {
        title: "Tree Branch",
        strength: 5,
        accuracy: 10,
        defense: 5,
        magic_defense: 3,
        value: 10,
        equipment_slots: 5,
    },
    {
        title: "Bark Shield",
        defense: 10,
        magic_defense: 5,
        value: 10,
        equipment_slots: 4,
    },
    {
        title: "Leather Jerkin",
        defense: 5,
        magic_defense: 10,
        ranged_defense: 10,
        value: 10,
    },
    {
        title: "Leather Chaps",
        defense: 5,
        magic_defense: 10,
        ranged_defense: 10,
        value: 10,
    },
    {
        title: "Leather Gloves",
        defense: 1,
        magic_defense: 3,
        ranged_defense: 3,
        value: 5,
    },
    {
        title: "Leather Boots",
        defense: 1,
        magic_defense: 3,
        ranged_defense: 3,
        value: 5,
    },
    {
        title: "Cloth Robe",
        defense: 1,
        magic_defense: 5,
        ranged_defense: 1,
        value: 10,
    },
    {
        title: "Ring of Fire",
        defense: 1,
        magic_defense: 3,
        flame: 2,
        value: 20,
    },
    {
        title: "Stone Circlet",
        defense: 1,
        magic_defense: 3,
        earth: 5,
        value: 10,
    },
    {
        title: "Ring of Water",
        defense: 1,
        magic_defense: 3,
        water: 2,
        value: 20,
    },
];
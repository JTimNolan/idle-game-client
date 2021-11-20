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
export const abilities = abilityList.reduce((carry, item, index) => {
    item.id = index;
    carry[item.id] = item;
    return carry;
}, {});

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
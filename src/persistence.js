import { player, activeAbilities, enemy, orbs } from './stores';

export function loadGame(){
    const loadedStateString = localStorage.getItem('gameState');
    if(!loadedStateString || !loadedStateString.length){
        return false;
    }
    const state = JSON.parse(loadedStateString);
    if(!state){
        return false;
    }
    return state;
}
export function saveGame(){
    const state = {activeAbilities: activeAbilities};
    localStorage.setItem('gameState', JSON.stringify(state));
    return true;
}
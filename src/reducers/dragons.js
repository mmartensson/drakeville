/**
@license
Copyright (c) 2018 Markus Mårtensson. All rights reserved.
*/

import { SPAWN_DRAGON, SLAY_DRAGON, SELECT_MATE } from '../actions/dragons.js';

import { createSelector } from 'reselect';

// FIXME: May want to move these to the backend
const INITIAL_ALIVE = [
  { id: 1, kind: 'eel', level: 1 },
  { id: 2, kind: 'fire', level: 1 }
];

let idCounter = 10;
const newId = () => {
  return ++idCounter;
}

const dragons = (state = {alive: INITIAL_ALIVE, dead: [], selectedMates: []}, action) => {
  switch (action.type) {
    case SPAWN_DRAGON:
      return {
        ...state,
        alive: [...state.alive, { id: newId(), kind: action.kind, level: 1 }]
      };
    case SLAY_DRAGON:
      const ndx = state.alive.findIndex(dragon => dragon.id === action.id);
      if (ndx < 0) {
        console.error(`Unexpected identifier ${action.id} passed to SLAY_DRAGON`);
        return state;
      }
      const dragon = state.alive.dragon;
      return {
        ...state,
        alive: [state.alive.slice().splice(ndx, 1)],
        dead: [...state.dead, dragon]
      };
    case SELECT_MATE:
      let selectedMates;
      if (state.selectedMates.length >= 2) {
        selectedMates = [action.kind];
      } else if (state.selectedMates[0] === action.kind) {
        selectedMates = [];
      } else {
        selectedMates = [...state.selectedMates, action.kind];
      }
      console.log('SELECT_MATE', action.kind, selectedMates);
      return {
        ...state,
        selectedMates
      }
    default:
      return state;
  }
};

export default dragons;

export const aliveSelector = state => state.dragons.alive;
export const deadSelector = state => state.dragons.dead;
export const selectedMatesSelector = state => new Set(state.dragons.selectedMates);

const DRAGON_PARENTS = {
  eel: null,
  fire: null,
  ground: ['eel','fire'],
  clay: ['eel','ground'],
  green: ['eel','ground'],
  lava: ['fire', 'ground'],
  smelt: ['fire', 'ground'],
  hard: ['fire', 'clay'],
  air: ['eel', 'lava'],
  stone: ['green', 'hard'],
  crystal: ['air', 'smelt'],
  odd: ['hard', 'air']
};

export const activeDisabledKindsSelector = createSelector(
  aliveSelector,
  (alive) => {
    let active = new Set();
    let disabled = new Set();

    // Enumerate kinds that match a dragon that is alive
    alive.forEach(dragon => active.add(dragon.kind));

    // Enumerate kinds that are missing one or more parent
    Object.keys(DRAGON_PARENTS).forEach(kind => {
      if (active.has(kind))
        return;

      const parents = DRAGON_PARENTS[kind];
      if (!parents)
        return;

      if (!active.has(parents[0]) || !active.has(parents[1])) {
        disabled.add(kind);
      }
    }); 
   
    return { active, disabled };
  }
);

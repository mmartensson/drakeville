/**
@license
Copyright (c) 2018 Markus Mårtensson. All rights reserved.
*/

import { SPAWN_DRAGON, SLAY_DRAGON } from '../actions/dragons.js';

let idCounter = 0;
const newId = () => {
  return ++idCounter;
}

const counter = (state = {alive: [], dead: []}, action) => {
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
    default:
      return state;
  }
};

export default counter;

/**
@license
Copyright (c) 2018 Markus Mårtensson. All rights reserved.
*/

export const SPAWN_DRAGON = 'SPAWN_DRAGON';
export const SLAY_DRAGON = 'SLAY_DRAGON';
export const SELECT_MATE = 'SELECT_MATE';

export const mateDragons = (first,second) => (dispatch) => {
  let matingCall = firebase.functions().httpsCallable('mateDragons');
  matingCall({first,second})
    // FIXME: Set up a client timer for the egg; spawnDragon deferred until successful hatchEgg
    .then(result => dispatch(spawnDragon(result.data.kind)))
    .catch(error => dispatch(reallyNeedErrorHandling(error)))
};

// FIXME: Something in app, possibly snack bar related 
const reallyNeedErrorHandling = (error) => {
  return {
    type: 'Missing proper error handling',
    error
  };
};

export const selectMate = (kind) => {
  return {
    type: SELECT_MATE,
    kind
  };
};

export const spawnDragon = (kind) => {
  return {
    type: SPAWN_DRAGON,
    kind
  };
};

export const slayDragon = (id) => {
  return {
    type: SLAY_DRAGON,
    id
  };
};

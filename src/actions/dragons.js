/**
@license
Copyright (c) 2018 Markus Mårtensson. All rights reserved.
*/

export const SPAWN_DRAGON = 'SPAWN_DRAGON';
export const SLAY_DRAGON = 'SLAY_DRAGON';

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

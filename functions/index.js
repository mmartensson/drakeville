// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const verifyPlayer = (context, expectGame) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }

  const uid = context.auth.uid;
  const playerRef = admin.firestore().collection('players').doc(uid);

  return playerRef.get()
    .then(doc => {
      if (!doc.exists) {
        const displayName = context.auth.displayName;
        player = {
          displayName
        };
        console.log(`Storing initial player information for ${uid}`, player);
        playerRef.set(player);
      } else {
        player = doc.data();
        console.log(`Read player information for ${uid}`, player);
      }

      if (expectGame && !player.game) {
        throw new functions.https.HttpsError('failed-precondition', 'Player is not currently playing a game.');
      }

      return player;
    })
    .catch(err => {
      console.log(`Failed reading player information for ${uid}: $err`);
      throw new functions.https.HttpsError('unavailable', `Failed reading player data: ${err}.`);
    });
};

const childKindForParents = (first, second) => {
  if (first === second) {
    throw new functions.https.HttpsError('invalid-argument', 'First and second parent kind may not be the same.');
  }

  const set = new Set([first,second]);

  if (set.has('eel')) {
    if (set.has('fire'))
      return 'ground';

    if (set.has('ground'))
      return ['clay','green'][Math.round(Math.random())];

    if (set.has('lava'))
      return 'air';
  }

  if (set.has('fire')) {
    if (set.has('ground'))
      return ['smelt','lava'][Math.round(Math.random())];

    if (set.has('clay'))
      return 'hard';
  }

  if (set.has('hard')) {
    if (set.has('air'))
      return 'odd';
    if (set.has('green'))
      return 'stone';
  }

  if (set.has('air')) {
    if (set.has('smelt'))
      return 'crystal';
  }

  throw new functions.https.HttpsError('invalid-argument', `Kinds ${first} and ${second} can not mate.`);
};

exports.mateDragons = functions.https.onCall((data, context) => {
  const now = new Date().getTime();
  const conceived = now;
  const hatches = conceived + 1000 * 60 * 2;
  const kind = childKindForParents(data.first, data.second);
  let egg = { kind, conceived, hatches };

  return verifyPlayer(context, true)
    .then(player => {
      const gameRef = player.game;
      const gamePlayerRef = gameRef.collection('players').doc(context.auth.uid);
      const eggsRef = gamePlayerRef.collection('eggs');
      return eggsRef.add(egg);
    })
    .then(eggRef => {
      return Object.assign(egg, {
        id: eggRef.id,
        conceivedRelative: conceived-now,
        hatchesRelative: hatches-now
      });
    });
});

// exports.hatchEgg ...
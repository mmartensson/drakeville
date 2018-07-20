// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const verifyPlayer = (context) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }
  return context.auth;
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
  const player = verifyPlayer(context);

  const hatches = +new Date() + 1000 * 60 * 2;
  const kind = childKindForParents(data.first, data.second);
  const egg = { kind, hatches };

  // Store egg for player

  return { egg };
});
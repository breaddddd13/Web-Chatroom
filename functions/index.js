const functions = require('firebase-functions');

exports.addedTime = functions.database.ref('/Messages/{roomId}/mes/{pushId}')
  .onCreate((snap, context) => {

    const timestamp = Date.now();
    return snap.ref.child('timestamp').set(timestamp);

  });


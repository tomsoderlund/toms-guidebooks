## Firebase

https://console.firebase.google.com/
https://www.firebase.com/docs/web/api/

yarn add firebase

const firebase = require('firebase/app')
require('firebase/database')

const userRef = userId => firebase.database().ref(`users/${userId}`)

Events: on/once

  const userSnapshot = await userRef.once('value')
  const user = userSnapshot.val()

Or:

  firebaseRef.once('value', function (snapshot) {
    // snapshot.exportVal() has '.priority', snapshot.val() does not
    var newProject = _.cloneDeep(snapshot.exportVal())
  }, function (err) {
    // code to handle read error
  })

queryRef

  var queryRef = ref.orderBy('created').startAt(Firebase.ServerValue.TIMESTAMP)
  queryRef.on('child_added', function(snap) {
    console.log('queryRef.child_added', snap.val())
  })

More:

- firebaseRef.once
- firebaseRef.on
- firebaseRef.off
- firebaseRef.child(keyName)
- firebaseRef.set(newObject, callback) // callback(err) - write/replace
- firebaseRef.update(partialObject, callback) // merge/update existing
- newChildRef = firebaseRef.push(newChild, callback) // use push().key or newChildRef.key() to get new key
- firebaseRef.remove(callbackAfterDeleted) // same as: set(null)
- firebaseRef.key() -> .key
- firebaseRef.authWithCustomToken

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

## Snapshots

Not `map`, but `forEach`:

    projectsSnapshot.forEach(project => console.log(project.key))

https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot

## Unique keys/slugs

    async addProject (parent, variables, context, info) {
      const { userId, title } = variables
      const slugBase = toSlug(title)
      for (let i = 1; i < 100; i++) {
        const slug = slugBase + (i > 1 ? `-${i}` : '')
        const newProjectRef = userProjectRef({ userId, projectId: slug })
        const project = (await newProjectRef.once('value')).val()
        if (project === null) {
          await newProjectRef.set({ title, dateUpdated: Math.round(Date.now() / 1000) })
          return { id: slug }
        }
      }
      throw new Error(`Could not generate a unique project ID`)
    }

## Firebase + React: re-base

Firebase + Redux: https://github.com/prescottprue/react-redux-firebase

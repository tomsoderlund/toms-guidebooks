# Firebase

New: Cloud Firestore
Old: Realtime Database

- List services on https://firebase.google.com/docs/web/setup
- Update https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
- Console: https://console.firebase.google.com/
- Docs: https://www.firebase.com/docs/web/api/

## Installing

	yarn add firebase

## Importing

	import * as firebase from 'firebase/app'
	import 'firebase/auth'
	import 'firebase/firestore'

	// Better with 'require', you probably need server-side
	const firebase = require('firebase/app')
	require('firebase/auth')
	require('firebase/firestore')
	require('firebase/database')
	
	const userRef = userId => firebase.database().ref(`users/${userId}`)

## Modules

- firebase.app
- firebase.analytics: events & Google Analytics
- firebase.auth: login
- firebase.database: old database
- firebase.firestore: new database
- firebase.functions
- firebase.installations
- firebase.messaging: push notifications
- firebase.performance
- firebase.remoteconfig: update your app
- firebase.storage
- A/B Testing
- App Distribution
- Machine Learning

## Authentication

	const user = firebase.auth().currentUser

- https://firebase.google.com/docs/auth/web/email-link-auth
- Token + user.getIdToken(): https://firebase.google.com/docs/auth/admin/verify-id-tokens + https://firebase.google.com/docs/auth/web/custom-auth
- With Next.js: https://github.com/vercel/next.js/tree/master/examples/with-firebase-authentication

    export default function useUser () {
      const [user, setUser] = useState(null)
      useEffect(() => firebase.auth().onAuthStateChanged(firebaseUser => setUser(firebaseUser)), [])
      return { user }
    }

ID Tokens for client/server: https://firebase.google.com/docs/auth/admin/verify-id-tokens

## Cloud Firestore (new)

https://firebase.google.com/docs/firestore/quickstart

### Snapshots

- doc.id
- doc.data()
- doc.get('name')

https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot

### List

	const mapsRef = db.collection('maps')
	const mapsSnapshot = await mapsRef.get()
	let maps = []
	mapsSnapshot.forEach((doc) => {
		console.log(doc.id, '=>', doc.data())
		maps.push(doc.data())
	})
	return maps

Search:

	var query = citiesRef.where("capital", "==", true)

Order:

	citiesRef.orderBy("name", "desc").limit(3)

### Get

	let getDoc = db.collection('cities').doc('DC').get()

### Set

	const cityRef = db.collection('cities').doc('LA')
	let setDoc = cityRef.set(obj)
	// Merge:
	let setDoc = cityRef.set(obj, { merge: true })
	let updateSingle = cityRef.update({ capital: true })

	const docRef = db.collection('users').doc('alovelace')
	const setName = docRef.set({ name: 'Frank' })

### Add to collection

	let newRef = await citiesRef.add({ name: 'Tokyo' })
	console.log('Added document with ID:', newRef.id)

### Delete

	let deleteDoc = db.collection('cities').doc('DC').delete()
	
	let removeCapital = cityRef.update({ capital: FieldValue.delete() })

### Timestamp

    FieldValue.serverTimestamp()

### Geopoint

    coordinates: new firebase.firestore.GeoPoint(lat, long)

### Events/Triggers

https://firebase.google.com/docs/functions/firestore-events

## Realtime Database (old)

### Events: on/once

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

### Snapshots

Not `map`, but `forEach`:

	projectsSnapshot.forEach(projectSnapshot => {
	  const projectKey = projectSnapshot.key
	  const project = projectSnapshot.val()
	})

https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot

### Unique keys/slugs

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

### Firebase rules

https://firebase.google.com/docs/database/security

		await firebase.auth().signInWithCustomToken(firebaseToken)

		data.child('createdByUser').val() === auth.uid
	
	    {
	      "rules": {
	        "users": {
	          "$uid": {
	            ".write": "$uid === auth.uid"
	          }
	        }
	      }
	    }

## Firebase + React: re-base

Firebase + Redux: https://github.com/prescottprue/react-redux-firebase

## Firebase in Next.js

	/**
	 * firebase module
	 * @description Firebase implementation
	 * @module firebase
	 * @author Tom Söderlund
	 */
	
	import firebase from 'firebase/app'
	import 'firebase/analytics'
	import 'firebase/auth'
	
	import isClientSide from './isClientSide'
	
	const firebaseConfig = {
	  apiKey: 'AIza…',
	  authDomain: 'MYAPP.firebaseapp.com',
	  databaseURL: 'https://MYAPP.firebaseio.com',
	  projectId: 'MYAPP',
	  storageBucket: 'MYAPP.appspot.com',
	  messagingSenderId: '741…',
	  appId: '1:74182…',
	  measurementId: 'G-5D…'
	}
	
	// Initialize Firebase
	const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
	if (isClientSide()) firebase.analytics()
	
	export default firebaseApp

## Custom domain for email

	makamap.com TXT v=spf1 include:_spf.firebasemail.com ~all
	makamap.com TXT firebase=makamap-map-creator
	firebase1._domainkey.makamap.com  CNAME mail-makamap-com.dkim1._domainkey.firebasemail.com.
	firebase2._domainkey.makamap.com  CNAME mail-makamap-com.dkim2._domainkey.firebasemail.com.

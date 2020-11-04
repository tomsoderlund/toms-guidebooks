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

1. Enable Email/Password authentication in https://console.firebase.google.com/u/0/project/MYAPP/authentication/providers
2. Magic link login creates user automatically.

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

### Phone signup

Add a phone number to an existing, logged-in user:

    const appVerifier = new firebase.auth.RecaptchaVerifier('save-user-button', { size: 'invisible' }) // An element with id="save-user-button" must exist
    const authProvider = new firebase.auth.PhoneAuthProvider()
    const verificationId = await authProvider.verifyPhoneNumber(phoneNumber, appVerifier)
    const verificationCode = window.prompt('Please enter the verification code that was sent to your phone.')
    const phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode)
    user.updatePhoneNumber(phoneCredential)

Sign up new user from phone number:

    const appVerifier = new firebase.auth.RecaptchaVerifier('create-new-user-button', { size: 'invisible' }) // An element with id="create-new-user-button" must exist
    const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    const verificationCode = window.prompt('Please enter the verification code that was sent to your phone.')
    const { user } = await confirmationResult.confirm(verificationCode)

https://firebase.google.com/docs/auth/web/phone-auth

### Server-side authentication

https://github.com/vercel/next.js/tree/canary/examples/with-firebase-authentication

1. Listen to `firebase.auth().onIdTokenChanged`: https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/utils/auth/useUser.js#L33
2. Save the fresh `user.xa` property as a token in a cookie.
3. SSR/getServerSideProps: Use `admin.auth().verifyIdToken` in the firebase-admin SDK to verify token.


## Cloud Firestore (new)

https://firebase.google.com/docs/firestore/quickstart

### Data Snapshots

- docRef.collection('cities')
- collection.doc('YK6lO7LbLkdNU369f9fj')
- collection.parent
- ref.parent
- ref.path
- snapshot.id
- snapshot.data()
- snapshot/ref.get('name')

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

	citiesRef.where('capital', '==', true)
	citiesRef.where("population", "<", 100000)
	citiesRef.where("regions", "array-contains", "west_coast")
	citiesRef.where('country', 'in', ['USA', 'Japan']);

Order:

	citiesRef.orderBy('name', 'desc').limit(3)

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

### Timestamp/Date

    FieldValue.serverTimestamp()
    firebase.firestore.FieldValue.serverTimestamp()
    // Server firebase-admin: admin.firestore.FieldValue.serverTimestamp()

    conversation.dateUpdated.toDate()

### Geopoint

    coordinates: new firebase.firestore.GeoPoint(lat, long)

### Events/Triggers

https://firebase.google.com/docs/functions/firestore-events

- `onCreate`: Triggered when a document is written to for the first time.
- `onUpdate`: Triggered when a document already exists and has any value changed.
- `onDelete`: Triggered when a document with data is deleted.
- `onWrite`: Triggered when onCreate, onUpdate or onDelete is triggered.
- `DocumentReference.onSnapshot`/`CollectionReference.onSnapshot`

		functions.firestore
		  .document('users/{userId}')
		  .onUpdate((change, context) => {})

		const unsubscribe = db.collection('cities').onSnapshot(function (querySnaphot) {
		  // do something with the data.
		})

### Admin package

https://github.com/vercel/next.js/tree/master/examples/with-firebase-authentication

Env:

		NEXT_PUBLIC_FIREBASE_PROJECT_ID=myappname
		NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://myappname.firebaseio.com
		FIREBASE_CLIENT_EMAIL=firebase-adminsdk...
		FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEv

Node:

		import * as admin from 'firebase-admin'

	  if (!admin.apps.length) {
	    admin.initializeApp({
	      credential: admin.credential.cert({
	        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	      }),
	      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	    })
	  }

### File Storage

    folderRef = firebaseApp.storage().ref(`accounts/${accountId}`)
    await folderRef.listAll()
    folderRef.fullPath
    folderRef.parent
    folderRef.child(file.name)
    await folderRef.put(file, newMetaData)

    const result = await quoteFolderRef.listAll()
    result.items.forEach(async function (file) {
      await file.delete()
    })

    0:
    bucket: "myapp.appspot.com"
    cacheControl: undefined
    contentDisposition: "inline; filename*=utf-8''MyFile.pdf"
    contentEncoding: "identity"
    contentLanguage: undefined
    contentType: "application/pdf"
    customMetadata: undefined
    fullPath: "conversations/EVfZfytxioUjnEExeEdT/quotes/MyFile.pdf"
    generation: "1601988986266954"
    md5Hash: "LVIyrqThQeEnYXwbXGFDxA=="
    metageneration: "1"
    name: "MyFile.pdf"
    size: 661171
    timeCreated: "2020-10-06T12:56:26.266Z"
    type: "file"
    updated: "2020-10-06T12:56:26.266Z"
    ref: 

#### CORS issues

    gsutil cors set firebaseCors.json gs://myapp.appspot.com


### Cloud Messaging (Notifications)

- https://firebase.google.com/docs/cloud-messaging/js/client
- https://firebase.google.com/docs/cloud-messaging/js/first-message
- Next.js: https://github.com/vercel/next.js/tree/canary/examples/with-firebase-cloud-messaging

Setup:

- Set server token: https://console.firebase.google.com/project/_/settings/cloudmessaging/web
- Send message from console: https://console.firebase.google.com/project/_/notification

### Security and User Rights

#### Firebase Security Rules

https://firebase.google.com/docs/firestore/security/get-started

		rules_version = '2';
		service cloud.firestore {
		  match /databases/{database}/documents {

		    // If you have a matching custom claim "account"
		    match /accounts/{account}/{document=**} {
		      allow read, write: if request.auth != null && request.auth.token.account == account;
		      
		      // Override rules for the 'conversations' subcollection
		      match /teams/{team}/conversations/{conversation}/messages/{message} {
		        allow read, write: if true;
		      }
		    }

		    //match /{document=**} {
		      //allow read, write: if true;
		    //}
		  }
		}

		allow read, write: if request.time < timestamp.date(2021, 7, 24);
		allow read: if request.auth != null;
		allow write: if request.auth.token.isAdmin == true;
    // Make sure a 'users' document exists for the requesting user before allowing any writes to the 'cities' collection
    allow create: if request.auth != null && exists(/databases/$(database)/documents/users/$(request.auth.uid))
    // Allow the user to delete cities if their user document has the 'admin' field set to 'true'
    allow delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true
		allow create: if request.auth != null && exists(/databases/$(database)/documents/users/$(request.auth.uid))
		allow read: if resource.data.visibility == 'public';
		allow update: if request.resource.data.population > 0

    function isAccountUser() {
      return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.account == account;
    }
    function isAccountAdmin() {
      return isAccountUser() && get(/databases/$(database)/documents/accounts/$(account)/users/$(request.auth.uid)).data.role == 'admin';
    }
		allow read: if isAccountUser();
		allow write: if isAccountAdmin();

#### Custom Claims (metadata)

https://stackoverflow.com/a/63548916/449227
https://firebase.google.com/docs/auth/admin/custom-claims
https://medium.com/firebase-developers/patterns-for-security-with-firebase-supercharged-custom-claims-with-firestore-and-cloud-functions-bb8f46b24e11
https://medium.com/google-developers/controlling-data-access-using-firebase-auth-custom-claims-88b3c2c9352a

##### Set custom claims/metadata (server only)

Here’s an example on how to set `device_id` on a Firebase User object (on the server):

	await admin.auth().setCustomUserClaims(uid, { deviceId })

Note: You can not set custom claims on the client.

##### Get custom claims/metadata (server and client)

Then to retrieve the the `device_id` from the User on the server:
	
	const userRecord = await admin.auth().getUser(uid)
	console.log(userRecord.customClaims.deviceId)

…and on the client:

	const idTokenResult = await firebase.auth().currentUser.getIdTokenResult()
	console.log(idTokenResult.claims.deviceId)

##### Use custom claims/metadata in Firebase Security Rules

The neat thing is that custom claims are also available in Firebase Security Rules. This (slightly unrealistic) example only allows users with `deviceId === 123` to see the data:

	{
	  "rules": {
	    "secureContent": {
	      ".read": "auth.token.deviceId === 123"
	    }
	  }
	}


## Cloud Functions

https://firebase.google.com/docs/functions


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

	const firebase = require('firebase/app')
	require('firebase/auth')
	require('firebase/firestore')
	require('firebase/analytics')

	const isClientSide = require('./isClientSide')

	const firebaseConfig = {
	  apiKey: process.env.FIREBASE_API_KEY,
	  authDomain: 'MYAPPNAME.firebaseapp.com',
	  databaseURL: 'https://MYAPPNAME.firebaseio.com',
	  projectId: 'MYAPPNAME',
	  storageBucket: 'MYAPPNAME.appspot.com',
	  messagingSenderId: '741...',
	  appId: '1:741...',
	  measurementId: 'G-5D...'
	}

	// Initialize Firebase
	const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
	if (isClientSide()) firebase.analytics()

	module.exports = firebaseApp

## Custom domain for email

	makamap.com TXT v=spf1 include:_spf.firebasemail.com ~all
	makamap.com TXT firebase=MYAPPNAME
	firebase1._domainkey.makamap.com  CNAME mail-makamap-com.dkim1._domainkey.firebasemail.com.
	firebase2._domainkey.makamap.com  CNAME mail-makamap-com.dkim2._domainkey.firebasemail.com.

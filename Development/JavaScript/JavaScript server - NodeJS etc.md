## Upgrade/install Node from Homebrew

	brew search node
	brew install node@6
	# multiple versions
	brew unlink node
	brew link node@6


## Upgrade/install Node from website

http://nodejs.org/download/


## Upgrade Node with NPM

### Update NPM

	npm update npm -g

### Install 'n' helper

	sudo npm cache clean -f
	sudo npm install -g n
	sudo n stable
	sudo n 0.8.21 # specific version

### See versions

	npm view <package> versions
	0.8.3<package>@<version>

	npm view bcrypt versions
	npm install bcrypt@0.8.3


## Heroku (Node.js on Heroku)

https://devcenter.heroku.com/articles/getting-started-with-nodejs

### Push to Heroku

	git init
	git add .
	git commit -m 'Version 1.0.0'
	git commit -m 'Empty commit' --allow-empty
	git push heroku master
	git push heroku MYBRANCH:master

### Set up Heroku app

heroku login
heroku create myappname
heroku config:set NODE_ENV=production #optional
heroku config:get DATABASE_URL
heroku addons:add papertrail

heroku addons:create scheduler:standard
heroku addons:add mongolab
heroku addons:create heroku-postgresql:hobby-dev

heroku access:add info@weld.io # collaborator first, then owner
heroku apps:transfer info@weld.io # owner

heroku features:enable preboot # double servers

git push heroku master

heroku rename NEWNAME #also renames Heroku-Git remote

	# Add new target, done by heroku create normally:
	git remote add heroku git@heroku.com:MY-HEROKU-APP.git

### Multiple apps

	heroku logs -a my-app

	heroku create myappname --remote beta
	git push beta master

### Heroku NPM issues - clear cache

	heroku config:set NODE_MODULES_CACHE=false

### Scheduler

heroku run node app/scheduler/postToSlack.js
Scheduler: "node app/scheduler/postToSlack.js"


## NPM

package.json

	npm install -g [package-name]
	-g = global

	npm view <package> versions //
	npm install <package>@<version> // npm install bcrypt@0.8.0

	npm install --save compass # update package.json
	npm install --save-dev grunt-bumpx
	--save = update package.json

	npm update -g yo

	npm update --save mongoose

### NPM from Git

	"mongoose-crudify": "git+https://github.com/ryo718/mongoose-crudify.git#0.2.0",

### Create NPM packages

Tokens: https://www.npmjs.com/settings/YOUR-USER-NAME/tokens

https://docs.npmjs.com/getting-started/publishing-npm-packages

Check if existing: go to https://npmjs.com/package/<package>

	npm init  # OR npm init --scope=weld-io

Author: Tom Söderlund <tom@YOUR-USER-NAME.com> (http://www.YOUR-USER-NAME.com)

	npm whoami # check user
	npm login # OR npm adduser # OR create new on https://www.npmjs.com
	npm config ls # to ensure that the credentials are stored on your client.

Make local package (TGZ file):

	npm pack

Publish to NPM:

	npm publish ## will run prepublish if exists

Update:

	npm version [patch, minor, or major]
	npm publish

Rename package:

	npm deprecate old-project-name@"<= last-version-with-old-name" "WARNING: This project has been renamed, now install new-project-name instead."
	npm deprecate @weld-io/weld-crossplatform-libs@"<= 2.9.9" "WARNING: This project has been renamed, now install @weld-io/crossplatform-libs instead."

GitHub: no problem
Codeship: change git:// link

#### Ignore files (blacklist/whitelist)

- Excluding files in .gitignore or .npmignore, including files in package.json "files"
- Ignore files: https://zellwk.com/blog/ignoring-files-from-npm-package/

#### Create NPM package with React

- https://www.codementor.io/peterodekwo/create-a-simple-react-npm-package-in-simple-steps-using-cra-w966okagi

Add Babel and a preset:

	yarn add @babel/cli @babel/preset-react --dev ## or babel-preset-next

package.json:

	"main": "dist/index.js",
	"scripts": {
		"prepare": "rm -rf dist && mkdir dist && babel ./components -d dist --copy-files --presets=@babel/preset-react",
		"prepare": "rm -rf dist && for folder in {components,lib,config,public}; do mkdir -p dist/${folder} && babel ${folder} -d dist/${folder} --copy-files --presets=@babel/preset-env,next; done && cp package.json dist/",
	},
	"files": [
	  "dist/"
	],

## Yarn

https://yarnpkg.com/en/docs/usage

Installing all the dependencies of project

	yarn / yarn install

Starting a new project

	yarn init

Adding a dependency

	yarn add [package] // [package]@[version/tag]

Adding a dependency to different categories of dependencies (devDependencies, peerDependencies, and optionalDependencies)

	yarn add [package] --dev / --peer / --optional

Upgrading a dependency

	yarn upgrade [package] // [package]@[version/tag]
	yarn upgrade-interactive

Removing a dependency

	yarn remove [package]
	yarn remove [package] && yarn add [package] --dev


## Bower

	npm install -g bower

	bower install # install from list
	bower install --save [plugin]
	bower uninstall socket.io-client

## Grunt

## Yeoman

### Yeoman Angular

https://github.com/yeoman/generator-angular

	sudo npm update -g yo & sudo npm install -g generator-angular-fullstack

generator-angular
generator-angular-fullstack

	yo angular-fullstack [appname]
	npm install & bower install

### Yeoman Polymer

Use just bower instead!

	bower install --save Polymer/polymer#^1.0.0

Install element:

	bower install --save PolymerElements/paper-fab#^1.0.0

Yeoman way:

	sudo npm install -g generator-polymer
	mkdir -p my-project && cd $_

	yo polymer (aka polymer:app)
	yo polymer:element
	yo polymer:seed
	yo polymer:gh

### Yeoman Express

	sudo npm install -g yo # Make sure you have yo installed
	sudo npm install generator-express # Install the generator locally
	yo express # then run Yeoman and select Basic


## Express

	// Without Express - just Node.js
	const { createServer } = require('http')
	const PORT = process.env.PORT || 3003
	const requestHandler = (req, res) => { res.end('Hello world') }
	createServer(requestHandler).listen(PORT, () => console.log(`Node.js server running on http://localhost:${PORT}/`))

	// With Express
	const express = require('express')
	const server = express()
	server.get('*', requestHandler)
	server.listen(PORT, () => console.log(`Express server running on http://localhost:${PORT}/`))

### Parsing parameters without Express

	// Returns array like '/:0/:1/:2/:etc'
	const parseRequestParams = url => (url.split('?')[0] || '/').substr(1).split('/')

	// Returns a req.query-type object
	const parseRequestQuery = url => (url.split('?')[1] || '')
		.split('&')
		.reduce((result, propValue) => {
			const key = propValue.split('=')[0]
			if (key) result[key] = propValue.split('=')[1]
			return result
		}, {})

### Next.js with/without Express

	// Next.js: without Express - just Node.js
	const { createServer } = require('http')
	app.prepare().then(() => {
		createServer(handler).listen(3000)
	})

	// Next.js: with Express
	const express = require('express')
	app.prepare().then(() => {
		express().use(handler).listen(3000)
	})

### Routes

https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express

	var fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`

	req.url
	req.path = req.originalUrl // '/highscore/monthly/2017-01-01/2018-01-01'
	req.route.path // '/highscore/:grouping/:startDate/:endDate'

	req.params (url/:key)
	req.query (url?key=value)
	req.body (JSON body)
	req.headers

	const { path, route, params, query, body } = req

#### Generic request handler

	/** handleRequest(async () => {...}, { req, res }) */
	const handleRequest = async (actionFunction, { req, res }) => {
	  try {
	    await actionFunction(req, res)
	  } catch (err) {
	    const message = err.message.split(':')[0]
	    const status = err.message.split(':')[1] || 500
	    console.error(`Error ${status}: ${message}`)
	    res.status(status)
	    res.json({ message, status })
	  }
	}

#### Write

	res.writeHead(200, {
		'Content-Type': 'image/png',
		'Content-Length': img.length
	})
	res.end(img)

#### 301 or 302

	res.writeHead(302, { Location: 'your/404/path.html' })
	res.end()

	res.statusCode = 404
	res.statusMessage = 'Not found'
	res.end(statusMessage)
	res.writeHead(statusCode[, statusMessage][, headers])

#### Content-Type

	// text/html, text/javascript, text/csv, application/json, image/svg+xml, image/jpeg
	res.setHeader('content-type', 'text/javascript')
	res.setHeader('Cache-Control', 'public, max-age=31557600') // One year

	res.write()
	res.end()

#### CORS

	const setAccessControlHeaders = (res, methods = 'POST') => {
	  res.setHeader('Access-Control-Allow-Origin', '*')
	  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	  res.setHeader('Access-Control-Allow-Methods', methods)
	}

#### Express only

	res.status(302).end()
	res.set('location', newUrl)
	res.send = Express write() + end()
	res.json(myObj)

	console.log('Request:', _.pick(req, ['params', 'query', 'body']))

	res.statusCode
	NEW: res.status(404).send('Page not found')
	NEW: res.status(404).json(myObj)
	OLD: res.sendStatus(404, 'Page not found')

#### https.get

	const https = require('https')

	https.get(url, res => {
	  let data = ''
	  // A chunk of data has been received.
	  res.on('data', chunk => {
	    data += chunk
	  })
	  // The whole response has been received. Print out the result.
	  res.on('end', () => {
	    console.log(JSON.parse(data).explanation)
	  })
	}).on('error', err => {
	  console.log('Error: ' + err.message)
	})

#### request

	request.get(url, { json: true }, function (err, response, body) {
		response.statusCode
	})

	request.post(url, { form: body }, function (err, result, body) {
	})

	request({ method: 'PUT', url: url, json: obj }, function (err, res, body) {
	})

#### node-fetch

	const fetch = require('node-fetch')
	const userResponse = await fetch(`${API_URL}/api/users/${user}`)
	const userJson = await userResponse.json() // or text(), arrayBuffer(), blob(), formData()

### EJS

https://www.npmjs.org/package/ejs

	<%= variable %> // variable is evaluated and printed out (escaped)
	<%- variable %> // variable is evaluated and printed out (HTML, not escaped)
	<% variable %>  // variable is evaluated but not printed out

	<% if (true) { %>
		<h1>foo</h1>
	<% } else { %>  
		<h1>bar</h1>
	<% } %>

	<table>
	<% for (var i=0; i < data.length; i++) { %>
		<tr>
			<td><%= data[i].id %></td>
			<td><%= data[i].name %></td>
		</tr>
	<% } %>
	</table>

	// To string. Months are zero-based
	app.locals.formatDate = function (dateObj) {
		return (dateObj.getFullYear() + "-" + ('0' + (dateObj.getMonth()+1)).slice(-2) + "-" + ('0' + dateObj.getDate()).slice(-2) )
	}

### Base64

	// Encode:
	var b = new Buffer('JavaScript')
	var s = b.toString('base64'); // "SmF2YVNjcmlwdA=="

	// Decode:
	var b = new Buffer('SmF2YVNjcmlwdA==', 'base64')
	var s = b.toString(); // "JavaScript"


## .env files - dotenv

	yarn add dotenv

	require('dotenv').config()


## JWT - JSON Web Token

Client (header):

	const jwt = await getUserJWT()
	Object.assign(defaultHeaders, { Authorization: `Bearer ${jwt}` })

Server - generate token:

	yarn add jsonwebtoken

	const jwt = require('jsonwebtoken')

	// Sign/generate
	jwt.sign(payload, secretOrPrivateKey, [options, callback])

	// Verify/decode
	const decoded = jwt.verify(token, secretOrPublicKey, [options, callback])

	// Firebase
	(new FirebaseTokenGenerator(process.env.MY_SECRET)).createToken(payload)

Server - verify access:

	const jwt = require('express-jwt') // https://github.com/auth0/express-jwt

	module.exports.jwtAuthentication = jwt({
		secret: process.env.MY_SECRET,
		credentialsRequired: false // false = will let users through if auth fails
	})


## Testing

### Jasmine

https://jasmine.github.io/2.0/introduction.html

	yarn add jasmine --dev

Config: `spec/support/jasmine.json`:

	mkdir -p spec/support
	touch spec/support/jasmine.json

	{
		"spec_dir": "",
		"spec_files": [
			"lib/**/*.test.js",
			"lib/**/*[sS]pec.js"
		],
		"helpers": [
		]
	}

#### Jasmine with ES2015

https://blog.fullstacktraining.com/using-jasmine-with-javascript-es2015/

	yarn add @babel/core @babel/node @babel/preset-env --dev
	touch .babelrc
	touch spec/run.js

`.babelrc`:

	{
	  "presets": ["@babel/env"]
	}

`spec/run.js`:

	import Jasmine from 'jasmine'

	const jasmine = new Jasmine()
	jasmine.loadConfigFile('spec/support/jasmine.json')
	jasmine.execute()

`package.json`:

	"unit": "babel-node spec/run.js"

#### Tests

* `toBe`
* `toEqual`
* `toBeGreaterThan`
* `toBeLessThan`
* `toBeCloseTo`
* `toBeFalsy`
* `toBeTruthy`
* `toContain`
* `toBeDefined`
* `toBeUndefined`
* `toBeNull`
* `toMatch`
* `toHaveBeenCalled`
* `toHaveBeenCalledWith`
* `toThrow`
* `toThrowError`

#### Mock a function

	it('should sqlFind to sort', async function () {
		const pool = jasmine.createSpyObj('pool', ['query'])
		pool.query.and.callFake((pool, tableName, query, options) => ({ rows: pool }))
		expect(
			await sqlFind(pool, 'people', { id: 5, sort: 'name' })
		).toEqual(
			'SELECT * FROM people WHERE id=5 ORDER BY name NULLS LAST;'
		)
	})

## Node Command Line Application

http://javascriptplayground.com/blog/2012/08/writing-a-command-line-node-tool/

	process.env.NODE_ENV

	#!/usr/bin/env node
	'use strict'
	console.log('adsfs', process.argv.length)

	// process.argv = ['node', 'yourscript.js', ...]
	// First custom argument is 2
	const NR_OF_ARGUMENTS_REQUIRED = 2
	if ((process.argv.length - 2) < NR_OF_ARGUMENTS_REQUIRED) {
		console.log('Usage: node app.js [filename] [JSON key]')
		console.log('  E.g: node app.js data/test.json projects.562e3d6dfd53820c00e98bd7')
	}
	else {
		//.. do run
		myFunction(process.argv[2])
	}

	// process.argv -> name/value collection
	const processCommandLineArguments = function () {
		const ARGUMENTS = [
			{ key: 'inputFile', default: 'companies.csv', required: true },
			{ key: 'workTitle', default: 'digital marketing' },
			{ key: 'location', default: 'Sweden' },
		]
		const argvCollection = {}
		for (var i = 2; i < Math.max(process.argv.length, ARGUMENTS.length+2); i++) {
			argvCollection[ARGUMENTS[i-2].key] = process.argv[i] || ARGUMENTS[i-2].default
		}
		return argvCollection
	}

	// process.argv -> name/value collection (OLD)
	var processCommandLine = function (defaultOptions) {
		var options = _.merge({}, defaultOptions)
		for (var i = 2; i < process.argv.length; i++) {
			var arg = process.argv[i]
			if (arg.indexOf('=') !== -1) {
				var param = arg.split('=')
				options[param[0]] = param[1]
			}
		}
		return options
	}

	// process.argv -> two arrays of files/options
	var processCommandLineArguments = function () {
		var result = { files: [], options: [] }
		for (var i = 1; i < process.argv.length; i++) {
			if (process.argv[i][0] === '-') {
				result.options.push(process.argv[i].substr(1))
			}
			else {
				result.files.push(process.argv[i])
			}
		}
		return result
	}

	const parseFile = async function (filename) {
	  const fsPromises = require('fs').promises
	  const text = await fsPromises.readFile(filename, 'utf8')
	}

	const openFile = function (filename, cb) {
		const fs = require('fs')
		fs.readFile(filename, 'utf8', function (err, data) {
			if (err) {
				throw err
			}
			else if (cb) {
				console.log('OK: ' + filename)
				cb(data)
			}
		})
	}

	var fs = require('fs')
	fs.writeFile('/tmp/test', 'Hey there!', function(err) {
		if(err) {
			return console.log(err)
		}

		console.log('The file was saved!')
	});


## CDN - AWS CloudFront

1. Enable both HTTPS and HTTP, otherwise 301.
2. Override cache control timing, if you want.

### Headers

- `Cache-Control: public, max-age=120` (seconds)


## Mongoose

	// Remove Mongoose warnings:
	mongoose.Promise = Promise
	mongoose.connect(config.db, { useMongoClient: true })

### Model

	const mongoose = require('mongoose')
	const Schema = mongoose.Schema

	// a Task consists of one or more SubSchemas
	const SubSchema = new Schema({
		name: { type: String, required: true },
		properties: {},
		elementSelector: String, // JQuery-style selector e.g. '#button-save'
		popoverClasses: String, // 'left', 'right', etc
	})

	const ThingSchema = new Schema({
		FORBIDDEN: id /_id,
		slug: String,
		name: { type: String, unique: true, required: true, sparse: true }, // sparse: The index skips over any document that is missing the indexed field
		dateCreated: { type: Date, default: Date.now },
		position: Number,
		referenceModel: { type: Schema.Types.ObjectId, ref: 'OtherModelName' },
		price: {
			monthly: Number,
			vatIncluded: Boolean,
		},
		oneSubSchema: SubSchema,
		manySubSchemas: [SubSchema],
		topicArray: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
		anything: {},
	})

	mongoose.model('Thing', ThingSchema)

#### Schema Types

String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array

http://mongoosejs.com/docs/schematypes.html

#### Statics, Methods

	// Statics: On the Collection/Class
	TaskSchema.statics.getOrderedList = function (group, callback) {
		var Task = mongoose.model('Task')
		Task.find({ group: group }, null, { sort: { position: 1, name: 1 } }, callback)
	}

	// Methods: On the Object/Instance
	TaskSchema.methods.slug = function (task) {
		return this.name.trim().replace(/ /g,'-').replace(/[^\w-]+/g,'').toLowerCase()
	}

#### Virtual properties

Only synchronous - otherwise use Model.methods

	// Get
	ArticleSchema.virtual('date').get(function () {
		return this._id.getTimestamp()
	})

	// Set
	ArticleSchema.virtual('date').set(function (newDate) {
		this.otherDate = newDate
	})

#### toJSON and toObject

Override JSON output:

	// For JSON
	const MySchema = new Schema({
		...
	},
	{
		toObject: {
			virtuals: true,
			transform: function (doc, ret) {
				delete ret._id
			},
		},
		toJSON: {
			virtuals: true,
			transform: function (doc, ret) {
				delete ret._id
			},
		}
	})

Alternative way:

	UserSchema.methods.toJSON = function() {
		let obj = this.toObject()
		// do whatever
		return obj
	}

NOTE: toObject affects save too

What does this do?

	AccountSchema.set('toJSON', { getters: true, virtuals: true })

#### Middleware: pre/post hooks

doc.init
doc.validate
doc.save
doc.remove

	// also: 'save'
	MySchema.pre('validate', function (next) {
		if ('invalid' == this.name) {
			return next(new Error('#sadpanda'))
		}
		next()
	})

Collection.count
Collection.find
Collection.findOne
Collection.findOneAndRemove
Collection.findOneAndUpdate
Collection.insertMany
Collection.update

	PlanSchema.pre('find', function (next) {
		console.log('PlanSchema.pre.find', ...arguments)
		next()
	})

	PlanSchema.post('find', function (results, next) {
		console.log('PlanSchema.post.find', ...arguments)
		next()
	})

#### Validations

	required: [true, 'Why no bacon?'],
	min: [6, 'Too few eggs'],
	max: 12,
	enum: ['Coffee', 'Tea'],
	required: function() { return this.bacon > 3; }
	validate: {
		validator: function (v) {
			return /\d{3}-\d{3}-\d{4}/.test(v)
		},
		message: '{VALUE} is not a valid phone number!'
	},

### Searching

#### Lean and Exec

MyModel
	.find({ published: true })
	.sort({ date: -1 })
	.limit(20)
	//.lean()
	.exec(function (err, results) {
	})

#### findById

User.findById(req.params.id).lean().exec(function (err, user) {})

#### findOne

Restaurant.findOne( {'_id' : restaurantId }, function (err, restaurant) {
})

#### Wildcard search

query['locationDetails.original'] = new RegExp(req.query.city, 'ig')

Starts with:

	User.find({ username: new RegExp('^' + userName) })

Case insensitive:

	User.find( { name: { $regex: new RegExp(nameString, 'i') } } )

#### Nested

const query = {
	'positions.company': req.crudify.company._id
}

query['locationDetails.original'] = createServernew RegExp(req.query.city, 'ig')

#### Numeric values

	{ quantity: { $not: { $gt: 5 } } } // qty is "not >5" (i.e. 5 or below)
	{ quantity: { $ne: 20 } } // qty is "not 20" (includes undefined)
	{ quantity: { $gte: 5, $lte: 15 } } // qty is >5 and <15

#### Value exists

	{ locationDetails: { $exists: false }, location: { $exists: true, $ne: '' } }
	{ quantity: { $exists: true, $nin: [5, 15] } } // qty exists but isn't 5 or 15
	{ names: null } // find where 'names' is null or undefined

#### Field types

	{ names: { $type: 4 } } // find where 'names' is an array: https://docs.mongodb.org/manual/reference/operator/query/type/#op._S_type
	{ names: { $type: 10 } } // find where 'names' is null

#### And/Or

	{ quantity: 5, price: 1.99 } // implicit $and statement
	{ $and: [ { quantity: { $ne: 5 } }, { quantity: { $exists: true } } // qty is not 5, but exists
	{ $or: [ { quantity: { $ne: 5 } }, { quantity: { $exists: true } } // qty is not 5 or exists

	{
		type: 'food',
		$or: [
			{ quantity: { $gt: 100 } },
			{ price: { $lt: 9.95 } }
		]
	}

#### Date search

	if (req.query.after) filter.dateCreated = { $gte: new Date(req.query.after) }
	if (req.query.days) filter.dateCreated = { $gte: new Date((new Date()).getTime() + req.query.days*-24*60*60*1000) }

	const query = {
		dateCreated: {
			$gte: new Date(year,  month,  1),
			$lt:  new Date(year2, month2, 1)
		}
	}

#### Search in arrays

	// As favouriteFoods is a simple array of strings, you can just query that field directly:
	PersonModel.find({ favouriteFoods: "sushi" }, ...)

	{ price: { $in: [5, 15] } } // price is either 5 or 15
	{ price: { $nin: [5, 15] } } // price is neither 5 nor 15

Find ObjectID

	Lesson.find({ topics: mongoose.Types.ObjectId(topic._id) })

$elemMatch:

	db.users.find({ awards: { $elemMatch: { award:'National Medal', year:1975 } } })
	db.articles.find({ translations: { $elemMatch: { languageCode: 'sv', slug: 'swells-grundare-sarah' } } })

	Article.findOne().elemMatch('translations', { languageCode: req.params.languageCode, slug: req.params.slug }).exec()

### Populate: linked/referenced

populate(fieldName)

	req.crudify[modelName].populate(propertyName, '-_id -__v', (err, result) => {
		next()
	})

	BugUpdate.find(query).sort(sorting).limit(200).populate('bug').exec(function (err, bugUpdates) {
	})

### Create new

	MyModel.create(dataObj, callback)

	let notification = new Notification(data)
	notification.save(cb)

### Update/Upsert

account.markModified('subscriptions')

db.products.update( { item: "book", quantity: { $gt: 5 } }, { $set: { x: 6 }, $inc: { y: 5} } )
db.projects.update( { _id: ObjectId("52e57805d87d0e2618000003") }, { $set: { name: 'Hola Bandoola' } } )
db.projects.update( { slug: "myapp" }, { $set: { screens: [ {name: 'Nr1', data: {}}, {name: 'Nr2', data: {}} ] } } )
db.projects.update( { slug: "test-project" }, { $set: {'screens.0': 'testVal'} }, { upsert: true } )
db.projects.update( { slug: "test-project" }, { $set: {screens.0.elements.elem1: 'testVal'} }, { upsert: true } )
db.users.find( { email: "tom@YOUR-USER-NAME.com" } )
db.users.update( { email: "tom+expired@weld.io" }, { $set: {'subscriptions.0.expires': ISODate("2014-01-01")} }, { upsert: true } )
db.users.update( { email: "tom@YOUR-USER-NAME.com" }, { $set: {'dateLastLogin': ISODate("2014-11-20")} }, { upsert: true } )
db.users.update( { email: "tom@YOUR-USER-NAME.com" }, { $set: {'role': 'admin' } } )
db.users.update( { email: "tom@YOUR-USER-NAME.com" }, { $set: {'tags': ['beta2.0'] } } )

db.posts.insert({ title: "Hello World", text: "yoda yoda" })
db.projects.save() // update or insert

db.projects.remove({}) // NOTE: Removes all!

#### findOrCreate vs. Upsert vs. findOneAndUpdate

Upsert: because you probably always want to update with latest properties

	UserModel.update({ user: req.body.user }, { $set: userNewObj }, { upsert: true }, function (err, rowsUpdated) {})

https://github.com/drudge/mongoose-findorcreate

	const findOrCreate = require('mongoose-findorcreate')
	PersonSchema.plugin(findOrCreate)

	Person.findOrCreate({ name: { $regex: new RegExp(newPerson.name, 'i') } }, newPerson, function (err, result, wasCreated) {
		req.crudify = { err, result, person: result }
		next()
	})

	Person.findOrCreate({
			name: { $regex: new RegExp(newPerson.name, 'i') }
		},
		newPerson,
		function (err, result, wasCreated) {
			console.log(`wasCreated:`, { wasCreated, err, result })
			req.crudify = { err, result, person: result }
			next()
	})

// findOrCreate, then update old record
	Bug.findOrCreate({ githubIssueId: data.issue.id }, bugObj, function (err, bug, wasCreated) {
		if (wasCreated) {
			// New bug
			cb(err, data, bug)
		}
		else {
			// Update existing bug
			_.merge(bug, bugObj)
			bug.save(function (err, bug2) {
				cb(err, data, bug2)
			})
		}
	})

// Find+Update or Create:

	User.findOne({ twitterHandle: twitterUser.screen_name }, (err, foundUser) => {
		if (foundUser) {
			// Update existing
			foundUser.imageUrl = foundUser.imageUrl || userData.imageUrl
			foundUser.save(cb)
		}
		else {
			// Create new
			User.create(userData, cb)
		}
	})

#### Upsert/Update

http://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose

	var contact = new Contact({ phone: request.phone, status: request.status })

// Convert the Model instance to a simple object using Model's 'toObject' function to prevent weirdness like infinite looping

	var upsertData = contact.toObject()

// Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error

	delete upsertData._id

// Do the upsert, which works like this: If no Contact document exists with _id = contact.id, then create a new doc using upsertData. Otherwise, update the existing doc with upsertData

	Company.update({ _id: position.company._id }, position.company, { upsert: true }, cb)


#### mapReduce

	const mapReduceOperation = {
		//query: { createdByUser: _.get(req, 'user.d.uid') },
		sorting: { dateCreated: 1 },
		map: function () {
			//consolelog('MAP', this, arguments)
			emit(this.name, 1)
		},
		reduce: function (k, vals) {
			//consolelog('REDUCE', this, arguments)
			return vals.length
		},
		// finalize: function
		out: { replace: 'createdCollectionNameForResults' },
		verbose: true,
	}
	DataSource.mapReduce(mapReduceOperation, function (err, model, stats) {
		console.log('map reduce:', {err, model, stats})
		model.find().exec(function (err, result) { //.where('value').gt(10)
			console.log({ err, result })
			req.crudify = req.crudify || { err, result }
			next()
		})
	})


### MongoDB

Install

	brew tap mongodb/brew
	brew install mongodb-community

To have launchd start mongodb/brew/mongodb-community now and restart at login:

	brew services start mongodb/brew/mongodb-community

Or, if you don't want/need a background service you can just run:

 	mongod --config /usr/local/etc/mongod.conf

http://docs.mongodb.org/v2.2/reference/mongo-shell/

mongod # server: /usr/local/Cellar/mongodb-community@3.6/3.6.12/bin/mongod
mongo # interactive client

show dbs // list all databases
db // show db
use weld-dev // set db
db.dropDatabase()

show collections // 'tables'

### Indexes

db.users.getIndexes()
db.users.dropIndex("name_1")
db.users.dropIndexes()

### Collections

db.collection.count()
db.collection.drop()

## MongoLab

{
	"name": {
		"$regex": "Ecwid.*",
		"$options": "si"
	}
}

### Backups: mongodump / mongorestore

mongorestore --db weld-live-20160113 heroku_app21501008/

#### Henrics: Restore one document/project

1. Download the backup from MongoLab.
2. Restore it locally into a new database:
	mongorestore -h 127.0.0.1:27017 -d <some-new-DB> <path-of-backup>
3. Extract the one document:
	mongodump -h 127.0.0.1 -d <some-new-DB> -c projects -q '{"_id":ObjectId("<project-id>")}'
4. Restore to MongoLab:
	mongorestore --host ds045481-a0.mongolab.com --port 45481 --db heroku_app21501008 -u <username> -p <password> <some-new-DB>


## PostgreSQL - postgres sql

See SQL.md


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


## GraphQL

Types/Scalars:

- Int: Signed 32‐bit integer
- Float: Signed double-precision floating-point value
- String: UTF‐8 character sequence
- Boolean: true or false
- ID (serialized as String)

### GraphQLDateTime

https://www.npmjs.com/package/graphql-iso-date

	const { GraphQLDateTime } = require('graphql-iso-date')

- typeDefs: scalar DateTime, dateUpdated: DateTime
- resolvers: DateTime: GraphQLDateTime
- dateUpdated = new Date()


### Queries

	{
		articles {
			title
		}
	}

#### Filters

	{
		articles(category: "news") {
			title
		}
	}

#### Fragments

  fragment GameShortInfo on Game {
    id
    title
  }

  query GamesList($system: String) {
    games (system: $system) {
      ...GameShortInfo
    }
  }

_Note: GamesList($system: String!) for mandatory parameter_

#### Nested queries

	{
		articles {
			title
	    # Queries can have comments
	    author {
	      name
	    }
		}
	}

##### Nesting in resolvers

	Query: {
		...
	},

	Company: { // same name as in schema
	  async employees (parent, variables, context, info) {
	  	...
	  }
	},

### Server

	yarn add graphql apollo-server(-express/-micro)

server.js:

	const server = require('express')()
	const { ApolloServer } = require('apollo-server-express')
	const { typeDefs, resolvers } = require('./graphql/schema')

	const apolloServer = new ApolloServer({ typeDefs, resolvers })
	apolloServer.applyMiddleware({ app: server })

### Next.js

- Global: https://github.com/zeit/next.js/tree/master/examples/with-apollo
- New:    https://github.com/zeit/next.js/tree/canary/examples/with-apollo
- Per page: https://github.com/adamsoffer/next-apollo-example

### Zeit Now

https://zeit.co/guides/deploying-apolloserver-to-now

	yarn add apollo-server-micro graphql
	mkdir -p api/graphql
	touch api/graphql/index.js

api/graphql/index.js:

	const { ApolloServer, gql } = require('apollo-server-micro')

	const server = new ApolloServer({
	  typeDefs,
	  resolvers,
	  introspection: true,
	  playground: true
	})

	module.exports = server.createHandler({ path: '/api/graphql' })

### Combine schemas

merge-graphql-schemas

	const { mergeTypes, mergeResolvers }  = require('merge-graphql-schemas')

	const typeDefs = mergeTypes([
	  require('../../graphql/gift/schema'),
	  require('../../graphql/wishlist/schema')
	], { all: true })

	const resolvers = mergeResolvers([
	  require('../../graphql/gift/resolvers')(pool),
	  require('../../graphql/wishlist/resolvers')(pool)
	])

# Desktop App

http://electron.atom.io/docs/tutorial/quick-start/

npm install --save-dev electron


## PassportJS / Authentication

Best practice: server-side encrypted cookie

https://www.npmjs.com/package/express-session
https://www.npmjs.com/package/cookie-session

Domain-wide cookie:

Set-Cookie: <cookie-name>=<cookie-value>; Domain=.topdomain.com


**See LoveBot**

Twitter: need Callback URL in settings but it’s overridden in code.

NPMs: cookie-session, passport, passport-twitter etc

Init:
	// express-session is only in RAM, can’t do server restarts
	server.use(cookieSession({
		name: 'myappname',
		keys: ['secret'],
		maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
	}))
	server.use(passport.initialize())
	server.use(passport.session())

Routes:
	server.get('/login/twitter', passport.authenticate('twitter'))
	server.get('/login/twitter/return', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/?loginFailed=true' }))

Access user:
	req.session, req.sessionID
	twittername = _.get(req, 'session.passport.user.username')


## SSL / HTTPS / Let’s Encrypt

More info: https://medium.com/@franxyzxyz/setting-up-free-https-with-heroku-ssl-and-lets-encrypt-80cf6eac108e

Steps:

brew install certbot

sudo certbot certonly --manual
	NOTE: use full domain incl "www."

Set up challenge/response on server
	server.get('/.well-known/acme-challenge/*', (req, res) => res.send('LONGWEIRDSTRING'))

Files end up in in /etc/letsencrypt/live/MYDOMAIN/
	`privkey.pem`  : the private key for your certificate.
	`fullchain.pem`: the certificate file used in most server software.
	`chain.pem`    : used for OCSP stapling in Nginx >=1.3.7.
	`cert.pem`     : will break many server configurations, and should not be used without reading further documentation (see link below).

sudo heroku certs:add /etc/letsencrypt/live/MYDOMAIN/fullchain.pem /etc/letsencrypt/live/MYDOMAIN/privkey.pem
	Need Hobby or Professional dynos

## Email - Mailgun

https://github.com/bojand/mailgun-js

	MAILGUN_DOMAIN=mg.wrux.it

	const mailgun = require('mailgun-js')({
		apiKey: process.env.MAILGUN_KEY,
		host: 'api.eu.mailgun.net',
		domain: process.env.MAILGUN_DOMAIN,
    testMode: false
	})

### Send email

	curl --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \ 
	https://api.mailgun.net/v3/samples.mailgun.org/messages \
	 -F from='Excited User <excited@samples.mailgun.org>' \
	 -F to='devs@mailgun.net' \
	 -F subject='Hello' \
	 -F text='Testing some Mailgun awesomeness!'

Node.js:

	const emailData = {
		from,
		to,
		cc,
		bcc,
		subject,
		html,
		text,
		'h:Reply-To',
		'o:tag': [],
		'v:my-variable': '123'
	}

	mailgun.messages().send(emailData, (error, body) => console.log({ error, body }))

#### Preview

	const getEmailPreview = emailData => `------------------------------
	from: ${emailData.from} | reply-to: ${emailData['h:Reply-To']}
	to: ${emailData.to}
	bcc: ${emailData.bcc}
	tags: [${emailData['o:tag'].join(', ')}]
	------------------------------
	subject: ${emailData.subject}
	------------------------------
	${emailData.html.replace(/<br\/>/g, '\n')}`

#### Debug: CURL test

	const getCurl = (emailData, mailgunConfig) => `------------------------------
	curl --user 'api:${mailgunConfig.apiKey}' \\
	https://${mailgunConfig.host}/v3/${mailgunConfig.domain}/messages \\
	--form from='${emailData.from}' \\
	--form to='curl <${emailData.to}>' \\
	--form subject='${emailData.subject} (curl)' \\
	--form-string html='${emailData.html}'
	------------------------------`

#### Send with fetch

	const fetch = require('node-fetch')
	const btoa = require('btoa')
	const { URLSearchParams } = require('url')

	const createFormBody = params => {
	  const urlParams = new URLSearchParams()
	  const keys = Object.keys(params)
	  for (const k in keys) {
	    console.log(`  - ${keys[k]}: ${params[keys[k]]}`)
	    urlParams.append(keys[k], params[keys[k]])
	  }
	  return urlParams
	}

	const mailgunSendMessage = async (emailData, mailgunConfig) => {
	  try {
	    const result = await fetch(`https://${mailgunConfig.host}/v3/${mailgunConfig.domain}/messages`, {
	      method: 'POST',
	      headers: {
	        Authorization: 'Basic ' + btoa('api:' + mailgunConfig.apiKey)
	      },
	      body: createFormBody(emailData)
	    })
	    console.log('result:', result)
	  } catch (err) {
	    console.warn(`Warning: ${err.message || err}`)
	  }
	}

### Read email

	const mailgunQuery = { event: 'stored', limit: 300 }
  const body = await mailgun.events().get(mailgunQuery)
  const results = body.items.map(item => )

  // These won't work?
  // const messageId = results[i].key
  // const message = await mailgun.messages(messageId).info((err, body) => console.log({err, body}))
  // const message = await mailgun.get(`/${config.mailgunDomain}/messages/${messageId}`)
  // const message = await mailgun.get(results[i].url)

	const fetchEmail = (emailUrl, method = 'GET') => fetch(emailUrl, {
	  method,
	  headers: { Authorization: 'Basic ' + Buffer.from('api' + ':' + process.env.MAILGUN_KEY).toString('base64') }
	})

	const deleteReceivedEmail = messageUrl => fetchEmail(messageUrl, 'DELETE') // mailgun.messages(messageId).delete()

### URL tracking - utm_medium etc

	const urlRegex = require('url-regex')

	const addUrlParameters = (url, newParameters) => url.includes('http')
	  ? url.includes('?')
	    ? `${url}&${newParameters}`
	    : `${url}?${newParameters}`
	  : url

	const addLinkTracking = (html, person) => {
	  const utmParameters = `utm_medium=email&utm_source=cabal&utm_custom[email]=${person.email}&utm_custom[name]=${encodeURIComponent(person.name)}`
	  return html.replace(urlRegex({ strict: false }), url => addUrlParameters(url, utmParameters))
	}

## Upgrade/install Node from Homebrew

	brew search node
	brew install node@6
	# multiple versions
	brew unlink node
	brew link node@6


## Upgrade/install Node from website

http://nodejs.org/download/

## Upgrade Node with NPM

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

### Routes

https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express

	var fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`

	req.method // 'GET'
	req.url
	req.originalUrl (Express)
	req.path (Express)
	req.headers
	req.headers.host = 'localhost:3206'
	req.params (url/:key)
	req.query (url?key=value)
	req.body (JSON body)

	const { path, route, params, query, body } = req

#### next()

	const typicalRoute = function (req, res, next) {
	  cacheProvider.setKeyOnResponse(res, get(req, 'crudify.user.account.reference'))
	  next()
		next(new Error(...))
	}

#### Generic request handler

	/** handleRequest(async () => {...}, { req, res }) */
	module.exports.handleRequest = async function handleRequest (actionFunction, { req, res }) {
	  try {
	    await acti onFunction(req, res)
	  } catch (error) {
	    const reference = `E${Math.round(1000 * Math.random())}`
	    const { message, status = 400 } = error
	    console.error(`[${reference}] Error ${status}: “${message}” –`, error)
	    if (!isNaN(status)) res.status(status)
	    res.json({ status, message, reference })
	  }
	}

	// From: https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6
	/** throw new CustomError(`Account not found`, 404) */
	module.exports.CustomError = class CustomError extends Error {
	  constructor (message, status) {
	    super(message)
	    if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError)
	    this.status = status
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
	res.setHeader('cache-control', 'public, max-age=31557600') // One year

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

	// Firebase JWT token
	(new FirebaseTokenGenerator(process.env.MY_SECRET)).createToken(payload)

Server - verify access:

	const jwt = require('express-jwt') // https://github.com/auth0/express-jwt

	module.exports.jwtAuthentication = jwt({
		secret: process.env.MY_SECRET,
		credentialsRequired: false // false = will let users through if auth fails
	})


## Babel / ES6 on Node

Note: doesn’t help import/export

	yarn add @babel/core @babel/node @babel/preset-env
	babel-node app.js


## Node Command Line Application

http://javascriptplayground.com/blog/2012/08/writing-a-command-line-node-tool/

	process.env.NODE_ENV

	#!/usr/bin/env node
	'use strict'
	console.log('process.argv', process.argv.length)

	// process.argv -> name/value collection
	const ARGUMENTS = ['languageId:1']
	if ((process.argv.length - 2) < ARGUMENTS.length) {
	  console.log('Usage: node tasks/myNodeApp ' + ARGUMENTS.map(str => `[${str.split(':')[0]}]`).join(' '))
	  console.log('  E.g: node tasks/myNodeApp ' + ARGUMENTS.map(str => str.split(':')[1] || '“something”').join(' '))
	} else {
	  const argumentObj = process.argv.slice(2).reduce((result, value, index) => ({ ...result, [ARGUMENTS[index] ? ARGUMENTS[index].split(':')[0] : `arg${index + 1}`]: value }), {})
	  myNodeApp(argumentObj)
	}

	// process.argv = ['node', 'yourscript.js', ...]
	// First custom argument is 2
	const NR_OF_ARGUMENTS_REQUIRED = 2
	if ((process.argv.length - 2) < NR_OF_ARGUMENTS_REQUIRED) {
		console.log('Usage: node myNodeApp [filename] [JSON key]')
		console.log('  E.g: node myNodeApp data/test.json projects.562e3d6dfd53820c00e98bd7')
	}
	else {
		myNodeApp(process.argv)
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

	// text = await getTextFromFile(filename)
	const getTextFromFile = (filename) => require('fs').promises.readFile(filename, 'utf8')

	// Read one line at a time / cb = (line) => {}
	const getTextFromFileOneLineAtATime = async function (filename, cbLine, cbClose) {
	  const lineReader = require('readline').createInterface({
	    input: require('fs').createReadStream(filename)
	  })
	  lineReader.on('line', cbLine)
	  lineReader.on('close', cbClose)
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

	// CSV
	const parseCsvFile = function (fileName, actionFunction) {
	  const fs = require('fs')
	  const parse = require('csv-parse')
	  const parser = parse({ delimiter: ',' }, actionFunction)
	  fs.createReadStream(require('path').join(__dirname, fileName)).pipe(parser)
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

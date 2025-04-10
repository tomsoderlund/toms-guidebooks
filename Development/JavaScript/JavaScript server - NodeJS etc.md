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

### Express methods

		router.get('/', function (req, res) {})
		router.post('/', function (req, res) {})
		router.put('/user', function (req, res) {})
		router.delete('/user', function (req, res) {})

### Request object

	req.method // 'GET'
	req.url = '/mypage?query=value'
	req.query (url?key=value)
	req.headers
		host = 'www.myserver.com:8080'
		'x-forwarded-host': 'www.myserver.com:8080',
		'x-forwarded-proto': 'https',
		'x-forwarded-port': '8080',
		origin = 'http://localhost:3301'
		referer = 'http://localhost:3301/my-page'
		'user-agent'
	req.body (JSON body)

	// Get *relative* URL
	const url = new URL(request.url);
	const relativePath = url.pathname;

	const { host, origin, referer } = req.headers

	const getServerHref = (req) => `${req.headers.host.includes('localhost') ? 'http' : 'https'}://${req.headers.host}/`

Express:

	req.originalUrl (Express)
	req.path (Express)
	req.params (url/:key)

Pure Node / Vercel:

	aborted
	body
	client
	complete
	cookies
	headers
	httpVersion
	httpVersionMajor
	httpVersionMinor
	method
	query
	rawHeaders
	rawTrailers
	socket
	statusCode
	statusMessage
	trailers
	upgrade
	url

	_consuming
	_dumped
	_events
	_eventsCount
	_maxListeners
	_readableState

#### Error handling

  if (req.method !== 'POST') throw new CustomError('Method not allowed', 405)
  if (!ALLOW_ORIGINS.includes(req.headers.origin)) throw new CustomError('Request not authorized', 401)

#### Full URL

https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express

	var fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`

#### next()

	const typicalRoute = function (req, res, next) {
	  cacheProvider.setKeyOnResponse(res, get(req, 'crudify.user.account.reference'))
	  next()
		next(new Error(...))
	}

#### Generic request handler

	/** export default (req, res) => handleRestRequest(async (req, res) => {...}, { req, res }) */
	module.exports.handleRestRequest = async function handleRestRequest (actionFunction, { req, res }) {
	  try {
	    await actionFunction(req, res)
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
	  constructor (message, status = 400) {
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

1) Set headers:

	const setCORSHeaders = (res, methods = 'POST,OPTIONS') => {
	  res.setHeader('Access-Control-Allow-Methods', methods)
	  res.setHeader('Access-Control-Allow-Origin', '*')
	  res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	  res.setHeader('Access-Control-Allow-Credentials', 'true')
	}

2) Respond to `OPTIONS`:

  if (req.method === 'OPTIONS') {
		res.statusCode = 200
		return res.json({})
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

Note: latest version requires `import`, use `yarn add node-fetch@2` if you need `require`.

	const fetch = require('node-fetch')
	const userResponse = await fetch(`${API_URL}/api/users/${user}`)
	const userJson = await userResponse.json() // or text(), arrayBuffer(), blob(), formData()

#### html-metadata

NEWER:

	yarn add html-metadata-parser

	import { parser as htmlMetadataParser } from 'html-metadata-parser'

Old:

	const htmlMetadata = require('html-metadata')
	const { general, openGraph, twitter, schemaOrg } = await htmlMetadata(url)
	const { title, description, image } = (openGraph || general) // openGraph not always present

#### cheerio

	const cheerio = require('cheerio')
	const $ = cheerio.load(htmlContent)

	$(this).toString()
	$(this).text()
	$(this).find('.display-name').text()
	// $(element) === $(this)
	$('div').map(function (i, element) { console.log($(element).toString()) })
	$element.children()
	$element[0].name
	$element.attr('class')

	$.root().html()

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

	import dotenv from 'dotenv'
	dotenv.config({ path: '.env.local' })

	require('dotenv').config() // load .env file
	require('dotenv').config({ path: '.env.local' })


## JWT - JSON Web Token

1. **➡️ Client Sends Login Request:** Client sends login credentials (e.g., username and password) to the server.
2. **⬅️ Server Authenticates User and returns JWT:** Server verifies the credentials. If valid, it generates a JWT. The server responds with a JWT, typically in a JSON response or in an HTTP-only cookie.
3. **Client Stores JWT:** Client stores the token (e.g., in local storage, session storage, or a cookie).
4. **➡️ Client Sends JWT with API Requests:** For subsequent requests, the client includes the JWT in the Authorization header (`Authorization: Bearer [token]`).
5. **⬅️ Server Verifies JWT:** Server checks the token’s signature and validates its claims (e.g., expiration time).
	- **Access Granted or Denied:** If the token is valid, the server processes the request and sends a response. If invalid or expired, the server denies access or requests re-authentication.
	- **Client Handles Token Expiration:** If expired, the client may need to refresh the token (e.g., using a refresh token) or prompt the user to log in again.

### Code

Client (header):

	const jwt = await getUserJWT()
	Object.assign(defaultHeaders, { Authorization: `Bearer ${jwt}` })

	// JWT Token with fetch()
	window.fetch(`${config.appUrl}api/domains`, {
		method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify(data)
	})

Server - generate token:

	yarn add jsonwebtoken

	import jwt from 'jsonwebtoken'

	// Sign/generate JWT
	jwt.sign(payloadObjectOrString, secretOrPrivateKey, [options])

	// Verify/decode
	const decoded = jwt.verify(token, secretOrPublicKey, [options])


	// Firebase JWT token
	(new FirebaseTokenGenerator(process.env.MY_SECRET)).createToken(payloadObjectOrString)

Server - verify access:

	const jwt = require('express-jwt') // https://github.com/auth0/express-jwt

	module.exports.jwtAuthentication = jwt({
		secret: process.env.MY_SECRET,
		credentialsRequired: false // false = will let users through if auth fails
	})

### Scopes/Roles

Scopes for access levels, e.g. Admin roles.


## Babel / ES6 on Node

Note: doesn’t help import/export

	yarn add @babel/core @babel/node @babel/preset-env
	babel-node app.js


## Node Command Line Application (CLI)

http://javascriptplayground.com/blog/2012/08/writing-a-command-line-node-tool/

	process.env.NODE_ENV

	#!/usr/bin/env node
	'use strict'
	console.log('process.argv', process.argv.length)

	// Get all env values
	Object.keys(process.env)
	  .map((key, i) => [key, Object.values(process.env)[i]])
	  .filter(([key]) => !key.startsWith('rvm_') && !key.startsWith('rvm_') && !key.startsWith('_system'))
	  .sort((a, b) => a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0))
	  .map(([key, value]) => `${key}=${value}`)
	  .join('\n')

	// Check if running from command-line
	if (process.argv[1].split('/').pop() === 'myJsFilename') {
	  ...run code
	}

	// Single action: process.argv -> name/value collection
	const ARGUMENTS = ['languageId:1', 'otherArgument']
	if ((process.argv.length - 2) < ARGUMENTS.length) {
	  console.log('Usage: node tasks/myNodeApp ' + ARGUMENTS.map(str => `[${str.split(':')[0]}]`).join(' '))
	  console.log('  E.g: node tasks/myNodeApp ' + ARGUMENTS.map(str => str.split(':')[1] || '“something”').join(' '))
	} else {
	  const argumentObj = process.argv.slice(2).reduce((result, value, index) => ({ ...result, [ARGUMENTS[index] ? ARGUMENTS[index].split(':')[0] : `arg${index + 1}`]: value }), {})
	  myNodeApp(argumentObj)
	}

	// Multiple actions: process.argv -> value array
	if (process.argv[1].split('/').pop() === 'myNodeApp') {
	  if ((process.argv.length - 2) < 1) {
	    console.log('Usage: node tasks/myNodeApp [action]')
	    console.log('  E.g: node tasks/myNodeApp search "Topic"')
	    console.log('  E.g: node tasks/myNodeApp add "Name" "URL" technology,business')
	    console.log('  E.g: node tasks/myNodeApp import')
	  } else {
	    const cliFunctions = {
	      add: cliAddSource,
	      import: cliAddSourcesFromJSON,
	      search: cliSearchNewSources
	    }
	    runDatabaseFunction((pool) => cliFunctions[process.argv[2]](pool, process.argv.slice(3)))
	  }
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

## Read/write/delete files

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

### Read/write/delete files – async

	const fs = require('fs')

	const fsReadFileAsync = (filePath) => new Promise((resolve, reject) => {
	  fs.readFile(filePath, 'utf-8', (err, text) => {
	    if (err) reject(err)
	    else resolve(text)
	  })
	})

	const fsWriteFileAsync = (filePath, text) => new Promise((resolve, reject) => {
	  fs.writeFile(filePath, text, 'utf-8', (err) => {
	    if (err) reject(err)
	    else resolve(text)
	  })
	})

	const fsDeleteFileAsync = (filePath) => new Promise((resolve, reject) => {
	  fs.unlink(filePath, (err) => {
	    if (err) reject(err)
	    else resolve(true)
	  })
	})

	// List files in folder
	const { promises: fs } = require('fs')
	const fileNames = await fs.readdir('path/to/dir')

	// Make folder
	fs.mkdirSync(dir, { recursive: true })

	// Does file exist
	if (fs.existsSync('foo.txt')) {
		// ...
	}

### CSV files: `csv-parse`

	import { parse } from 'csv-parse/sync'

	const getCsvDataFromUrl = async function (url) {
		const dataAsCsv = await fetch(url).then(res => res.text())
		const dataAsArray = parse(dataAsCsv, { columns: true, skip_empty_lines: true })
		return dataAsArray
	}

Older:

	const fs = require('fs')
	const path = require('path')
	const parse = require('csv-parse')

	const parseCsvFile = function (fileName, actionFunction) {
	  const filePath = path.join(__dirname, fileName)
	  const parser = parse({ delimiter: ',' }, actionFunction)
	  fs.createReadStream(filePath).pipe(parser)
	}

	// Simple CSV parser: [['Name','Age'], ['Tom',45]]
	const csvRows = csvText.split('\n').map(row => row.split(','))

	// parseCSV: own implementation
	type CsvDataRow = Record<string, any>
	type CsvData = CsvDataRow[]
	export const parseCSV = (text: string, separator = '\t'): CsvData => {
		const rows = text.split('\n')
		const headers = rows[0].split(separator)
		const data = rows.slice(1).map(row => {
			const values = row.split(separator)
			const rowResult: CsvDataRow = {}
			for (let i = 0; i < headers.length; i++) {
				rowResult[headers[i]] = values[i]
			}
			return rowResult
		})
		return data
	}

	const csvToString = (array: Record<string, string>[], separator = '\t') => {
		let str = '';
		const fieldNames = Object.keys(array[0]);
		const headerRow = fieldNames.join(separator);
		str += headerRow + '\n';
		array.forEach((row) => {
			const dataRow = fieldNames.map((fieldName) => row[fieldName]).join(separator);
			str += dataRow + '\n';
		});
		return str;
	};

## CDN - AWS CloudFront

1. Enable both HTTPS and HTTP, otherwise 301.
2. Override cache control timing, if you want.

### Headers

	res.setHeader('Cache-Control', 'public, max-age=31536000, immutable, stale-while-revalidate')

(Time in _seconds_)

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

## Email

### Mailgun

https://github.com/bojand/mailgun-js

	MAILGUN_DOMAIN=mg.wrux.it

	const mailgun = require('mailgun-js')({
		apiKey: process.env.MAILGUN_KEY,
		domain: process.env.MAILGUN_DOMAIN,
		host: 'api.eu.mailgun.net',
    testMode: false
	})

#### Send email

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

#### Read email

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

### SendGrid

	/* Using Twilio SendGrid's v3 Node.js Library: https://github.com/sendgrid/sendgrid-nodejs

		Usage:
			import { sendEmailWithTemplate, EmailTemplate } from '~/services.server/email'
			await sendEmailWithTemplate(EmailTemplate.GenericEmail, emailAddress, { firstName, subject, text });

		Manual mode:
			await sendEmail({ to, subject, text/html });
	*/

	import sendgridEmail, { MailDataRequired } from '@sendgrid/mail';

	sendgridEmail.setApiKey(process.env.SENDGRID_API_KEY!);

	const DEFAULT_EMAIL_SENDER = process.env.EMAIL_SENDER ?? 'platform@climateaction.agency';

	type EmailMessageData = Omit<MailDataRequired, 'from'> & {
		to: string;
		subject: string;
		text?: string;
		html?: string;
	};

	export async function sendEmail(messageData: EmailMessageData) {
		const newMessage = {
			from: DEFAULT_EMAIL_SENDER,
			...messageData,
		};
		const [response] = await sendgridEmail.send(newMessage as MailDataRequired);
		return response;
	}

	/* ----- Templates: https://mc.sendgrid.com/dynamic-templates ----- */

	// Inside the template editor, use {{variable}} for plain text, and triple {{{variable}}} for HTML markup
	export enum EmailTemplate {
		GenericEmail = 'd-de3300ebee2c45aea13abc690017e47d', // Variables: { firstName, subject, html }
	}

	type DynamicTemplateData = Record<string, string | number>;

	export async function sendEmailWithTemplate(
		templateId: EmailTemplate,
		to: string,
		templateVariables: DynamicTemplateData,
	) {
		const newMessage = {
			to,
			templateId: templateId,
			dynamicTemplateData: templateVariables,
		};
		return await sendEmail(newMessage as EmailMessageData);
	}

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

## Process death

		const onProcessDeath = require('death')

		onProcessDeath(function (signal, err) {
		  // clean up code here
		})

## Common problems

### ERR_OSSL_EVP_UNSUPPORTED: openssl-legacy-provider

	Error: error:0308010C:digital envelope routines::unsupported {
		opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
		library: 'digital envelope routines',
		reason: 'unsupported',
		code: 'ERR_OSSL_EVP_UNSUPPORTED'
	}

Solution:

	export NODE_OPTIONS=--openssl-legacy-provider

package.json:

	"build": "NODE_OPTIONS=--openssl-legacy-provider next build",

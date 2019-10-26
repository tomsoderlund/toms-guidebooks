## Search files

Exclude:

	-node_modules/,-.next/,-build/,-dist/,-yarn*

## Javascript include

	<script type="text/javascript" src="ajax.js" async defer></script>

async: load when it can -> for stand-alone scripts
defer: as on order on page -> when there are dependencies

	<script type="text/javascript">
		// code here
	</script>

### Great libraries

https://github.com/sorrycc/awesome-javascript


### CommonJS, RequireJS/AMD, UMD, new ES6 module syntax

CommonJS: export object

http://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs

UMD: https://github.com/umdjs/umd
e.g. https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js


## Module structure

	/**
	 * moduleName module
	 * @description This is...
	 * @module moduleName
	 * @author Tom Söderlund
	 */

	'use strict'

	// Private functions

	// ES6: export const functionName = function (obj) {
	const functionName = function (obj) {
		return JSON.stringify(obj, null, 4)
	}

	// Public API

	// ES6: export default {
	module.exports = {

		functionName,

	}

	module.exports.functionName = functionName

### Require/Import

	var utilities = require('./utilities')


### Safe library

	//
	// Name:    MYLIBRARY.js
	// Purpose: Crossplatform library for helper functions
	// Creator: Tom Söderlund
	//

	'use strict'

	// Only instantiate MYLIBRARY once
	var MYLIBRARY = MYLIBRARY || {}

	(function (MYLIBRARY) {

		MYLIBRARY.myFunction = function () {
		}

	}(MYLIBRARY))

### Immediately-invoked function expression (IIFE)

	(function() {
		/* code here */
	})()


## Debugging

	open -a Google\ Chrome --args --disable-web-security

### try/catch, throw, finally

	throw new Error('Something went wrong')

	try {
		throw new Error('Something went wrong')
	}
	catch (err) {
		console.error(`Error: ${err.message || err}`)
	}
	finally {
		// Code to be executed regardless of the try/catch result
	}

### Console

	console.log/warn/error

	console.log(event.fromElement.tagName) // works only in Firefox?
	process.stdout.write('no line')

	console.time('myFunction')
	console.timeEnd('myFunction')
	myFunction: 3465.123ms

	console.profile('myFunction')
	console.profileEnd('myFunction')

	// Get all properties for an object (console.dir):
	const specify = obj => _.isObject(obj) ? _.mapValues(obj, val => typeof(val)) : typeof(obj)
	const specify = function (obj) {
		return _.isObject(obj) ? _.mapValues(obj, val => typeof(val)) : typeof(obj)
	}

	// Specify v3: Get all properties for an object (console.dir):
	const specify = function (obj) {
		const getValueDescription = function (val) {
			const objectType = Object.prototype.toString.call(val).replace('[object ', '').replace(']', '')
			switch (objectType) {
				case 'Object': return '{' + Object.keys(val).slice(0, 7).join() + '}'
				case 'String': return val.slice(0, 50)
				case 'Array': return 'Array[' + val.length + ']'
				case 'Function':
				case 'Null':
					return objectType.toLowerCase()
				default: return objectType + (':' + val).slice(0, 50)
			}
		}
		return typeof(obj) === 'object' ? Object.values(obj).map(val => getValueDescription(val)) : getValueDescription(obj)
	}

	// Return name of "class" (actually, JavaScript object prototype of which object is a copy)
	function getClassName(obj) {
		// get classname abstracted from constructor property
		var c = obj.constructor.toString()
		var start = c.indexOf('function ') + 9
		var stop = c.indexOf('(')
		c = c.substring(start, stop)
		return c
	}

	// Use _ instead of . and $ instead of # to allow for easier JavaScript parsing
	const getElementReference = $element => ($element[0].name) + ($element.attr('class') ? '_'+$element.attr('class').replace(/ /g, '_') : '') + ($element.attr('id') ? '$'+$element.attr('id') : '')


## Conditional (ternary) operator

	x = a > b ? a : b


## Functions

A JavaScript `function` contains:

1. The code.
2. A name (not same as variable it’s placed in), e.g. `var f = function myFunction() {}`.
3. The receiver/context (`this`).
4. The `arguments` array.
5. All local variables defined in the function’s scope (= parent function).

Tips: functions are the ONLY scopes in JavaScript. Other `{}` blocks don't matter.
See “variable hoisting”.

Chaining: return `this`

### Javascript bind, call, & apply

	var newFunction = theFunction.bind(valueForThis/undefined, arg1, arg2, …)
	theFunction.call(valueForThis, arg1, arg2, …)
	theFunction.apply(valueForThis, arguments)

* Use `bind` when you want that function to later be called with a certain context, useful in events.
* Use `call` or `apply` when you want to invoke the function immediately, and modify the context.
* The difference is that `apply` lets you invoke the function with arguments as an array `call` requires the parameters be listed explicitly.

### Arguments

	function () {
		console.log('cb', arguments)
		cb.apply(undefined, arguments)
	}

	var clonedArguments = Array.prototype.slice.call(arguments)

	const parseArguments = function (args, nrOfArgumentsIncludingOptions) {
		return {
			callback: args[args.length-1],
			options: args.length >= nrOfArgumentsIncludingOptions ? args[args.length-2] : {},
		}
	}

JavaScript `arguments` works both with without arguments in function signature.

	// Support variable number of function arguments, where the LAST is the most important
	// https://jsfiddle.net/YOUR-USER-NAME/t7eusww0/
	var argumentsMapLastImportant = function(args, optionNames) {
		var options = {}
		for (var a = 0 a < args.length a++) {
			options[optionNames[optionNames.length - 1 - a]] = args[args.length - 1 - a]
		}
		return optionsƒ
	}

	var functionWithMultipleParametersAndOptionsAtEnd = function () {
		var options = {}
		var nrOfValues = arguments.length
		if (typeof(arguments[arguments.length-1]) === 'object') {
			options = arguments[arguments.length-1]
			nrOfValues = arguments.length - 1
		}
		for (var i = 0 i < nrOfValues i++) {
			console.log('  value:', arguments[i])
		}
	}


## Classes & Instances

	var myObject = { myProperty: 'ok', sayHi: function (){ console.log(this) } }
	var myObj2 = Object.create(myObject)
	// See also: Object.create(proto [, propertiesObject ])

NOTE: prototype vs. this: http://stackoverflow.com/questions/4691044/should-i-use-prototype-or-not
prototype keyword: http://stackoverflow.com/questions/12064104/prototype-keyword-in-javascript
http://stackoverflow.com/questions/1595611/how-to-properly-create-a-custom-object-in-javascript

http://javascript.crockford.com/prototypal.html

	Object.prototype.inherit = function () {
		function F() {}
		F.prototype = this
		return new F()
	}

	newObject = oldObject.inherit()


### Object Types

	(o3 instanceof D) // true
	isNaN(123)

	// Simple, faster: 'object', 'string', 'number', 'boolean'
	typeof(myObj)

	// Advanced: Object, Array, String, Number, Boolean, Function
	Array.isArray(objectOrArray)
	objectOrArray.constructor === Array

	// Advanced, slower: '[object X]' where X can be Object, Array, String, Number, Boolean, Function
	Object.prototype.toString.call(myObj) === '[object Array]'


### Custom classes

	/* Custom class: var myMyClass = new MyClass('foo') */
	function MyClass (property) {
		// Private
		var privateVariable = property * 2
		var privateMethod = function () {}
		// Public
		this.publicProperty = property * 3
		this.publicPrivilegedMethodOnInstance = function () {}
	}
	MyClass.prototype.publicMethod = function () {}

	var myMyClass = new MyClass('foo')


	WELD.clone = function (obj) {
		if (null == obj || "object" != typeof obj) return obj
		var copy = obj.constructor()
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
		}
		return copy
	}


## Loops

	for (let i in array) {
		console.log(`${i}: ${array[key]}`)
	}

	for (let key in object) {
		console.log(`${key}: ${object[key]}`)
	}

	const keys = ['apple', 'banana', 'citrus']
	for (let k in keys) {
		console.log(`${keys[k]}: ${object[keys[k]]}`)
	}

	for (let i = 0; i < array.length; i++) {
		console.log(`${i}: ${array[key]}`)
	}

	const keys = ['apple', 'banana', 'citrus']
	for (let k = 0; k < keys.length; k++) {
		console.log(`${keys[k]}: ${object[keys[k]]}`)
	}

	array.forEach((i, index) => console.log(`${i}: ${array[key]}`)

	// While

	while (condition) {
		// code block to be executed
	}

	do {
		// code block to be executed
	}
	while (condition)


	// Switch = Select/Case

	switch (n) {
		case 1:
			// execute code block 1
			break // or return
		case 2:
			// execute code block 2
			break // or return
		default:
			// code to be executed if n is different from case 1 and 2
			break // or return
	}


## Exceptions

	try {
		myroutine() // may throw three exceptions
	}
	catch (e if e instanceof EvalError) {
		// statements to handle EvalError exceptions
	}
	catch (e) {
		// statements to handle any unspecified exceptions
		logMyErrors(e) // pass exception object to error handler
	}
	finally {
		// Code to be executed regardless of the try/catch result
	}

## Numbers & Math

### Random

	Math.random() // 0.0 to 1.0

	const getRandomNumber = (min, max) => Math.round(min + Math.random() * (max - min))
	const getRandomFromArray = array => array[getRandomNumber(0, array.length - 1)]
	const getSerialFromArray = (array, index) => array[index % array.length]
	const otherNumber = (allNumbers, notNumber) => shuffleArray(allNumbers).filter(nr => notNumber !== nr)[0]

	Seeded random: https://github.com/davidbau/seedrandom

	// Serial e.g. '1464642047155-207'
	(Date.now() + '-' + Math.floor(Math.random() * 1000))

### Rounding

	Math.abs(x)
	Math.min, Math.max

	Math.round()
	// 2 decimals
	Math.round(num * 100) / 100
	const round = (value, decimals = 2) => parseFloat(value.toFixed(decimals))

	// Limit value between max and min
	const limitValue = (value, min, max) => Math.min(Math.max(value, min), max)

	parseInt(StringorNum) // to int
	parseFloat(StringorNum) // to float

	function padDigits (number, digits) {
		return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
	}

	const interpolate = function (fraction, min, max) {
		var result = min + (fraction * (max - min))
		// If min and max are integers, return integer
		if (min % 1 === 0 && max % 1 === 0)
			result = Math.round(result)
		return result
	}

### Sum, average, median

From https://www.jstips.co/en/javascript/array-average-and-median/

	const sum = values => values.reduce((previous, current) => current + previous, 0)

	const average = values => sum(values) / values.length

	const median = values => {
	  values.sort((a, b) => a - b)
	  const lowMiddle = Math.floor((values.length - 1) / 2)
	  const highMiddle = Math.ceil((values.length - 1) / 2)
	  return (values[lowMiddle] + values[highMiddle]) / 2
	}

  min = Math.min(...values)
  max = Math.max(...values)

### Power/root

	Math.pow(3, 2)
	Math.sqrt(9)

### Trigonometry and coordinates

	Math.PI
	Math.sin(radians) // 'x': 0=0, 0.5π=1, π=0,  1.5π=-1, 2π=0
	Math.cos(radians) // 'y': 0=1, 0.5π=0, π=-1, 1.5π=0,  2π=1

	deg/360 = rad/2π -> rad = deg/180 * Math.PI

	// ~= 0.866 * a
	const triangleHeight = a => Math.sqrt(3) / 2 * a

X/Y distances:

	var calcDistance = function (pos1, pos2) {
		var x = pos1[0] - pos2[0]
		var y = pos1[1] - pos2[1]
		return Math.sqrt(x*x + y*y)
	}

Get angle:

	const getAngle = function (x, y) {
		const angle = Math.atan2(y, x) // radians
		const degrees = 180 * angle / Math.PI // degrees
		return (360 + Math.round(degrees)) % 360 // round number, avoid decimal fragments
	}

Vector to X/Y:

	const xySpeed = (speed, rotationDegrees) => ({
		x: Math.sin(rotationDegrees/180 * Math.PI) * speed,
		y: -Math.cos(rotationDegrees/180 * Math.PI) * speed,
	})

Graph circle:

	var findNewPoint = function (x, y, angle, distance) {
		var result = {
			x: Math.round(Math.cos(angle * Math.PI / 180) * distance + x),
			y: Math.round(Math.sin(angle * Math.PI / 180) * distance + y)
		}
		return result
	}

Bounce and gravity:

	const applyRuleBounce = ({ position, speed, acceleration }) => {
		if (position[Y] > 200) {
			speed[Y] = -speed[Y] * 0.9
			speed[ROTATION] = -speed[ROTATION] * 0.9
			position[ROTATION] = position[ROTATION] * 0.9
			position[Y] = 200
		}
	}

	const applyRuleBlackHole = ({ gravity = 0.01, holePosition = [150, 150], position, speed, acceleration }) => {
		for (let dim = X; dim <= Z; dim++) {
			acceleration[dim] = (holePosition[dim] - position[dim]) * gravity
		}
	}

What is this?

	Math.sign(-3) // -1

	var calcDeltaMovement = function (pos1, pos2) {
		var x = pos1[0] - pos2[0]
		var y = pos1[1] - pos2[1]
		return [
			x > 0 ? 1 : 0,
			y > 0 ? 1 : 0
		]
	}


## Strings/Text

http://www.w3schools.com/jsref/jsref_obj_string.asp

	string.length

	console.log('String: “%s”, Integer: %d, Float: %f, Boolean: %s', myString, myInteger, myFloat, myBoolean)

### String search/comparison

	string.indexOf(searchstring, start)
	string.lastIndexOf(searchstring, start)
	string.search() // for regular expressions

	s.startsWith('hello')
	s.endsWith('hello')

	const makeStringOfLength = (char, length) => new Array(length + 1).join(char)

	const stringContains = (bigString, searchString) => bigString.toLowerCase().includes(searchString.toLowerCase())

	string.substr(start, length)
	string.substr(nrOfInitialCharsToRemove) = string.substring(nrOfInitialCharsToRemove) = string.slice(nrOfInitialCharsToRemove)
	string.substring(start, end) = string.slice(start, end)
	string.slice(nrOfInitialCharsToRemove, - nrOfEndingCharsToRemove)

	// See also _.capitalize and _.upperFirst
	const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

	const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

	const capitalize = str => _.startCase(_.toLower(str))

	// Strip HTML
	const stripHtmlTags = str => str.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '')

	// hex
	module.exports.isHexString = str => /[0-9A-Fa-f]{6}/g.test(str)

	string.charAt(index)

	// Left/Right
	'ABCDE'.slice(3) // = 'DE'
	'ABCDE'.slice(0,3) // = 'ABC'
	var firstChars = bigString.substr(0, bigString.length - n)
	var lastChars = bigString.substr(bigString.length - n) // or bigString.slice(n)

	doesStringContainX = (bigString.indexOf(x) !== -1)
	doesStringBeginWithX = (bigString.substring(0, x.length) === x)
	doesStringEndWithX = bigString.endsWith(x)
	upUntilString = bigString.substring(0, bigString.indexOf('_')) // up until '_'
	upUntilStringOrAll = (bigString.indexOf('_') !== -1) ? bigString.substring(0,bigString.indexOf('_')) : bigString
	upUntilLastString = bigString.substring(0, bigString.lastIndexOf('/'))
	fromStringToEnd1 = bigString.substring(bigString.indexOf('_')+1, bigString.length) // Note: first index of, can use lastIndexOf too
	fromStringToEnd1OrNone = (bigString.indexOf('_') !== -1) ? bigString.substring(bigString.indexOf('_')+1, bigString.length) : ''
	fromStringToEnd2 = bigString.split('_').pop() // only works if only one '_'
	fileExtension = filename.substring(filename.lastIndexOf('_')+1, filename.length)

	// Name splitting
	var nameSpacePosition = user.name.indexOf(' ')
	if (nameSpacePosition === -1) nameSpacePosition = user.name.length
	var firstName = user.name.substring(0, nameSpacePosition) // up until ' '
	var lastName = user.name.substring(nameSpacePosition + 1, user.name.length) // from ' '

	string.split(separator, limit) -> array
	array.join(', ') -> string

	var recipientArray = recipients.split(',')
	for (var i in recipientArray) {
		console.log(i + ": " + recipientArray[i])
	}

	newStr = str.replace('Google', 'Weld')  // first only
	newStr = str.replace(/Google/g, 'Weld') // all - 'g' is the key
	newStr = str.replace(new RegExp(variableToFind, 'g'), replaceText)

	const characterReplacements = {
	  ' ': '-'
	}

	const replaceAll = (str, dictionary, reverse = false) => Object.keys(dictionary).reduce((result, phrase, index) => {
	  const fromStr = reverse ? Object.values(dictionary)[index] : phrase
	  const toStr = reverse ? phrase : Object.values(dictionary)[index]
	  return result.replace(new RegExp(fromStr, 'g'), toStr)
	}, str)

	/** '{variable}' => 'value' */
	const replaceStrings = (template, stringsObj) => {
	  let newString = template
	  const keys = Object.keys(stringsObj)
	  for (let k in keys) {
	    newString = newString.replace(new RegExp(`{${keys[k]}}`, 'g'), stringsObj[keys[k]])
	  }
	  return newString
	}

	const getStringBetweenTags = (source, tag1, tag2) => {
		if (source === undefined || tag1 === undefined || tag2 === undefined) return
		let newText = source.substring(source.indexOf(tag1) + tag1.length, source.length)
		newText = newText.substring(0, newText.indexOf(tag2))
		return newText
	}

	const applyMethodToStringBetweenTags = (source, tag1, tag2, method) => {
		var position1 = 0, position2
		var newText = source
		do {
			position1 = newText.indexOf(tag1, position1)
			position2 = newText.indexOf(tag2, position1 + tag1.length)
			// If found matching text
			if (position1 !== -1 && position2 > position1) {
				// Cut it out
				var cutOutStr = newText.substring(position1 + tag1.length, position2)
				cutOutStr = method(cutOutStr)
				// Paste it back in
				newText = newText.substring(0, position1 + tag1.length) + cutOutStr + newText.substring(position2, newText.length)
				position1 = position2 + 1
			}
		}
		while (position1 !== -1)
		return newText
	}

	string.trim()
	string.toLowerCase()
	string.toUpperCase()
	parseInt(StringorNum)
	parseFloat(String)
	valueOf()

	const titleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

	String.prototype.toDash = function () {
		return this.replace(/([A-Z])/g, function ($1){return "-"+$1.toLowerCase()})
	}

	String.prototype.toCamelCase = function () {
		return this.replace(/(\-[a-z])/g, function ($1){return $1.toUpperCase().replace('-','')})
	}

	String.prototype.toSlug = function () {
		return this.trim().replace(/ /g,'-').replace(/[^\w-]+/g,'').toLowerCase()
	}

	// https://stackoverflow.com/a/52171480/449227
	const hashCode = str => {
	  let h
	  for (let i = 0; i < str.length; i++) {
	    h = Math.imul(31, h) + str.charCodeAt(i) | 0
	  }
	  return h
	}

### Regular Expressions in JavaScript / regex

	const regExp = /\w+\s?\*(\w+\s?\w+)/g
	const regExp = new RegExp('\w+', 'g')
	const regExpAsString = '\\w+\\s?\\*(\\w+\\s?\\w+)'

	// test: tests for a match in a string, returns true/false
	const isValid = regExp.test(str)

	// search: returns the position of the match or -1
	const index = str.search(regExp)

	// replace: replace a string
	const result = str.replace(regExp, newStr)
	const result = str.replace(new RegExp('\w+', 'g'), newStr)

	// match: executes a search for a match in a string, returns an array of information or null on a mismatch
	const regexpMatchArray = myString.match(/\d+(\.\d{1,15})?/g)

	// exec(str): executes a search for a match in a string, it returns an array of information

	const regex = /\w+/gm
	const str = `Hello`
	let m

	while ((m = regex.exec(str)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
					regex.lastIndex++
			}

			// The result can be accessed through the `m`-variable.
			m.forEach((match, groupIndex) => {
					console.log(`Found match, group ${groupIndex}: ${match}`)
			})
	}


### Encoding

	// base64: Encode the String
	var encodedString = btoa(string)
	// base64: Decode the String
	var decodedString = atob(encodedString)

	// URL encode
	encodeURIComponent('ÅÄÖ&') -> "%C3%85%C3%84%C3%96%26"
	decodeURIComponent('')

  // yarn add html-entities
	const Entities = require('html-entities').XmlEntities
	const entities = new Entities()
	entities.decode('&quotKeywords by Site&quot')


## Arrays and Lists

http://www.w3schools.com/jsref/jsref_obj_array.asp

	var myCars = new Array() // regular array (add an optional integer
	myCars[0] = "Saab"			 // argument to control array's size)
	myCars[1] = "Volvo"
	myCars[2] = "BMW"

	myCars.length

	var lastElement = myCars[myCars.length - 1]

	// Clone array
	newArray = oldArray.slice()

	// Get part of array
	newArray = oldArray.slice(startIndex, endIndexPlusOne)

### Searching

	var index = fruits.indexOf('Apple')
	fruits.includes('Apple')

### Sorting and reversing

	var fruits = ["Banana", "Orange", "Apple", "Mango"]
	fruits.sort()
	array.sort((a, b) => a - b)
	array.sort((a, b) => a > b)
	array.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
	array.reverse()

### Randomize/shuffle array

	const shuffleArray = array => {
		let currentIndex = array.length
		let temporaryValue
		let randomIndex
		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(randomizer() * currentIndex)
			currentIndex -= 1
			// And swap it with the current element.
			temporaryValue = array[currentIndex]
			array[currentIndex] = array[randomIndex]
			array[randomIndex] = temporaryValue
		}
		return array
	}

### Add

	newArray = [newItem, ...oldArray, newItem2]
	push() // add to end
	unshift // add to beginning
	array.splice(index, howmany, element1, …, elementX) // adds/removes items to/from an array, and returns the removed item(s), mutates original array
	var combined = list1.concat(list2)

### Remove

	pop() // get/remove last element
	shift()	// remove first element of an array, and returns that element
	slice(start, end) // returns the selected elements in an array, as a new array object
	array.splice(indexToRemove, 1) // remove 1 element, mutates original array
	array.filter((element, index) => index !== indexToRemove) // remove 1 element, non-mutating
	newArray = someArray.filter(user => user.name !== 'John')

	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function (from, to) {
		var rest = this.slice((to || from) + 1 || this.length)
		this.length = from < 0 ? this.length + from : from
		return this.push.apply(this, rest)
	}

### Other

	// Divide into pages. Note: pageNr = 1, 2, 3...
	const paginateArray = (array, pageSize = 100, pageNr = 1) => array.slice((pageNr - 1) * pageSize, pageNr * pageSize)
	const paginateObject = (object, pageSize, pageNr) => paginateArray(Object.keys(object), pageSize, pageNr).reduce((result, projectKey) => { result[projectKey] = object[projectKey]; return result }, {})

	// Split full name into first/lastname
	var allNames = fullname.split(' ')
	firstname = allNames[0]
	if (allNames.length > 1) {
		allNames.splice(0, 1)
		lastname = allNames.join(' ')
	}


## Collections/hashes/objects

	Object.keys(myObject).length // ECMAScript 5 required

	Object.size = function (obj) {
		var size = 0, key
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++
		}
		return size
	}


### JSON

	str = JSON.stringify(obj, null, 2) // value, replacerArrayOrFunction, spacer
	str = JSON.stringify(obj)
	obj = JSON.parse(str)

	const parseObject = obj => (typeof(obj) === 'string' && (obj.includes('{') || obj.includes('['))) ? JSON.parse(obj) : obj


## Dates & Time

	var todaysDate = new Date()
	var d = new Date(2014, 0, 1) // months are zero-based

	// From value
	new Date(1469433907836)
	new Date('2011-04-11')
	new Date('2011-04-11T11:51:00')

	getFullYear() // Get the four digit year (yyyy)
	getMonth() // Get the month (0-11)
	getDate() // Get the day as a number (1-31)
	getDay() // Get the weekday as a number (0-6)
	getHours() // Get the hour (0-23)
	getMinutes() // Get the minutes (0-59)
	getSeconds() // Get the seconds (0-59)
	getMilliseconds() // Get the milliseconds (0-999)
	getTime() // Get the time (milliseconds since January 1, 1970)

	Date.now() // = new Date().getTime()

	thisYear = (new Date()).getYear() + 1900

	const formatDate = dateObj => `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth()+1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`
	const formatTime = dateObj => `${dateObj.getHours()}:${dateObj.getMinutes()}`

	const formatDate = function (dateObj) {
		return (dateObj.getFullYear()
			+ "-" + ('0' + (dateObj.getMonth()+1)).slice(-2)
			+ "-" + ('0' + dateObj.getDate()).slice(-2)
		)
	}

	const formatDateAndTime = function (dateObj) {
		return (dateObj.getFullYear()
			+ "-" + ('0' + (dateObj.getMonth()+1)).slice(-2)
			+ "-" + ('0' + dateObj.getDate()).slice(-2)
			+ " " + dateObj.getHours()
			+ ":" + dateObj.getMinutes()
			+ ":" + dateObj.getSeconds()
		)
	}

	// Compare dates
	var diffInMillisecs = new Date() - oldDate

	// Add to date
	futureDate = new Date(startDate.getTime() + days*24*60*60*1000)
	oneYearFromNow = new Date((new Date()).getTime() + 365*24*60*60*1000)

	// Calculate difference between dates
	const daysBetweenDates = (date1, date2 = new Date()) => (date2.getTime() - date1.getTime()) / (24*60*60*1000)

	// Timestamp in milliseconds
	new Date().getTime() => 1390569315900
	var dateFromMillisecs = new Date(milliseconds)

	// UTC Timestamp
	Math.round(new Date().getTime() / 1000)


### Moment.js

	moment(dateObj)
	moment().toDate() // JS date obj
	moment().valueOf() // millisecs
	moment().unix() // seconds

	moment(value).fromNow() // “3 hours ago”

	const duration = momDate.diff(momDateNow)

	moment().subtract(7, 'days')
	moment().startOf('isoweek').add(2, 'weeks')

	moment().isoWeekday() // returns 1-7 where 1 is Monday and 7 is Sunday

	moment(dateObj).format('YYYY-MM-DD')
	moment(dateObj).format('YYYY-MM-DD HH:mm')
	moment(dateObj).format('dddd, MMMM Do YYYY HH:mm')


## Timers

Wait, Sleep etc

	// do once
	setTimeout(doInOneSecond, 1000)

	setTimeout(
		function () {
			console.log('setTimeout')
		},
		1000
	)

	// Repeat
	setInterval(doEverySecond, 1000)
	// Stop timer
	clearInterval(timerId)

	var timerId = setInterval(
		function () {
			console.log('setInterval')
		},
		1000
	)


	var doWithTimeoutIfNeeded = function (func, expression) {
		expression ? setTimeout(func) : func()
	}


## Drawing

1. DOM
2. Canvas
3. SVG


### Canvas

https://www.w3schools.com/tags/ref_canvas.asp
https://codepen.io/YOUR-USER-NAME/pen/Gdjrdx

	<canvas id="canvasElement" width="1080" height="1080" style="border:1px solid #ccc background-color: white"></canvas>

	var canvas = document.getElementById('canvasElement')
	var context = canvas.getContext('2d')

	context.fillStyle = 'deeppink'
	context.fillStyle = 'rgba(255, 255, 255, 0.5)' // alpha
	context.strokeStyle = 'slateblue'
	context.lineWidth = 5
	context.setLineDash([5, 3]) // dashes 5px, spaces 3px
	context.globalAlpha = 0.5 // alpha, works with images

	// Line
	context.strokeStyle = 'slateblue'
	context.beginPath()
	context.moveTo(20,20)
	context.lineTo(40,40)
	context.stroke()
	ctx.lineCap = "butt" || "round" || "square"

	// Rectangle
	context.fillStyle = 'deeppink'
	context.fillRect(20,200, 150,100) // also: strokeRect

	// Circle
	context.beginPath()
	context.arc(250, 50, 40, 0, 2*Math.PI) // x, y, radius, startAngle, endAngle, counterclockwise
	context.stroke()

	// Curve
	ctx.arcTo(150,20, 150,70, 50)

	// Text
	context.font = '30px Arial'
	context.fillText('Hello World', 10, 100) // also: strokeText

	// Create gradient
	var myGradient = context.createLinearGradient(200,0, 400,0) // x0,y0,x1,y1
	// context.createRadialGradient(75,50,5, 90,60,100) // x0,y0,r0,x1,y1,r1
	myGradient.addColorStop(0, 'red')
	myGradient.addColorStop(1, 'blue')
	context.fillStyle = myGradient
	context.fillRect(200,200, 150,80)

	const fillCanvas = function (canvas, context, color = 'white') {
		context.fillStyle = color
		context.fillRect(0, 0, canvas.width, canvas.height)
	}

	const fillCanvasGradient = function (canvas, context, colorInner = 'red', colorOuter = 'blue') {
		var gradient = context.createRadialGradient(canvas.width/2,canvas.height/2,10, canvas.width/2,canvas.height/2,canvas.width/2 * 1.414) // x0,y0,r0,x1,y1,r1
		gradient.addColorStop(0, colorInner)
		gradient.addColorStop(1, colorOuter)
		context.fillStyle = gradient
		context.fillRect(0, 0, canvas.width, canvas.height)
	}

	// Image
	var img = document.getElementById('imageElement')
	context.drawImage(img, 10,10)
	context.globalCompositeOperation = 'lighter'

	// Polygon - from https://stackoverflow.com/questions/18838202/fill-polygon-on-canvas/18838472#18838472
	const drawPolygon = function (context, body) {
		context.beginPath()
		context.strokeStyle = body.color || 'gray'
		context.fillStyle = body.color || 'gray'
		context.lineWidth = 10
		context.lineCap = 'round'
		for (var i = 0 i < body.vertices.length i++) {
			context.lineTo(body.vertices[i].x, body.vertices[i].y)
		}
		context.lineTo(body.vertices[0].x, body.vertices[0].y)
		context.closePath()
		context.fill()
		context.stroke()
	}

	// Shadows
	ctx.shadowBlur=10
	ctx.shadowOffsetX=20
	ctx.shadowColor="black"


### SVG

http://svgjs.com
http://svgjs.com/svg.draw.js/

http://codepen.io/YOUR-USER-NAME/pen/jyooRG (basic demo)
http://codepen.io/YOUR-USER-NAME/pen/ZBpoKW (drawing with mouse)

https://gionkunz.github.io/chartist-js/


## Sound

	<audio id="sound_pop" src="/assets/pop.mp3" preload="auto"></audio>

	document.getElementById('sound_pop').play()


## Local Storage, Session Storage, and Cookies

sessionStorage and localStorage

	localStorage.colorSetting = '#a4509b'
	localStorage['colorSetting'] = '#a4509b'
	localStorage.setItem('colorSetting', '#a4509b')

> “Stormpath recommends that you store your JWT in cookies for web applications, because of the additional security they provide, and the simplicity of protecting against CSRF with modern web frameworks. HTML5 Web Storage is vulnerable to XSS, has a larger attack surface area, and can impact all application users on a successful attack.”
– https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage

### Cookies in JS

	const getCookies = () => window.document.cookie.split('; ').reduce((result, str) => {
	  const keyValue = str.split('=')
	  result[keyValue[0]] = keyValue[1]
	  return result
	}, {})

	const setCookie = (name, value) => {
	  window.document.cookie = `${name}=${JSON.stringify(value)}`
	}

### js-cookie

	import Cookies from 'js-cookie'

	Cookies.get(COOKIE_NAME)
	const inOneWeek = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
	Cookies.set(COOKIE_NAME, user, { expires: inOneWeek })
	Cookies.remove(COOKIE_NAME)


## Pure Javascript (no framework)

	document.getElementById('myButton') // Note: can't be chained
	document.getElementsByClassName('myClass') // returns array
	document.getElementsByTagName('div') // returns array
	document.querySelectorAll('#mylink img') // all
	document.querySelector('#mylink img') // only FIRST
	document.getElementById('myButton').children[0]
	document.getElementById('myButton').parentNode
	// Chained:
	document.getElementById('mylink').getElementsByTagName('img')[0]

	element.id = 'elem1'
	element.value = '100'
	element.innerText = ''
	element.innerHTML = ''
	element.className = 'newClass'
	element.style.backgroundColor = 'rgb(169, 169, 169)'
	element.getAttribute('style')
	element.setAttribute('disabled', true)
	element.removeAttribute('disabled')
	element.offsetLeft // also offsetTop - both relative to parent
	element.offsetWidth // offsetHeight
	element.dispatchEvent(new Event('change'))

	var setElementDisabled = function (elementId, setDisabled) {
		setDisabled
			? document.getElementById(elementId).setAttribute('disabled', true)
			: document.getElementById(elementId).removeAttribute('disabled')
	}

	var appendHtml = function (element, htmlString) {
		var div = document.createElement('div')
		div.innerHTML = htmlString
		while (div.children.length > 0) {
			element.appendChild(div.children[0])
		}
	}
	var html = '<h1 id="title">Some Title</h1><span style="display:inline-block width=100px">Some arbitrary text</span>'
	appendHtml(document.body, html) // "body" has two more children - h1 and span.


### Events

	<button onclick="myFunction()">Click me</button>

	window.myFunction = function () {
		alert('Hello World')
	}

	document.getElementById('myButton').addEventListener('click', function (event) {
		console.log('Click!', event)
	})

	element.dispatchEvent(new Event('change'))
	element.addEventListener('change', myFunction)
	element.removeEventListener('change', myFunction) // no myFunction = remove all

#### preventDefault vs. stopPropagation

	event.preventDefault() // prevents the default action the browser makes on that event.
	event.stopPropagation() // stops the event from bubbling up the event chain.

#### Mouse events

Use `mouseenter`/`mouseleave` instead of `mouseover`/`mouseexit` (`mouseover` = trigger on childs)

#### Touch events: touchstart/touchmove/touchend

	// Get X/Y position from mouse or touch
	const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event

Tip: event handlers on `document` for move/end:

	window.document.addEventListener('mousemove', listeners.move)
	window.document.addEventListener('mouseup', listeners.end)

#### Create custom event

	var event = new Event('click')
	var event = new CustomEvent('build', { detail: { … } })
	element.addEventListener('build', function (evt) {})
	element.dispatchEvent(event) // send event

#### Document load event

	try {
		window.attachEvent('onload', whenDocumentHasLoaded)
	}
	catch (err) {
		console.error('Error:', err)
	}

### Client vs. Server

	// Run only in browser
	if (typeof(window) !== 'undefined') {
		// Do in-browser stuff
	}

### HTTP Get

	function httpGetAsync(url, callback) {
		var xmlHttp = new XMLHttpRequest()
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
				callback(xmlHttp.responseText)
		}
		xmlHttp.open('GET', url, true)
		xmlHttp.send(null)
	}

#### Fetch

	const domain = await fetch(url).then(res => res.json()) // or res.text() for HTML

	const userResponse = await fetch(`${API_URL}/api/users/${user}`)
	const userJson = await userResponse.json() // or text(), arrayBuffer(), blob(), formData()

	await fetch(`${config.appUrl}api/domains`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ domains: this.state.domains.split('\n') })
	})

### DOM / IFrame

	var newIframe = document.createElement('iframe')
	newIframe.src = 'about:blank'
	document.body.appendChild(newIframe)

	element.appendChild(document.createElement('p'))

### Windows & Frames

Open window:

	window.open(URL, name, specs, replaceUrlInHistory)
	window.open(pageURL, 'ts_window', 'width=300,height=600,scrollbars=no,titlebar=no,location=no,menubar=no,toolbar=no,status=no,resizable=no', false)

	window.close()

### History

	window.location.href

  window.history.pushState('object or string', 'Title', '/new-url')
  window.history.pushState(null, null, 'https://twitter.com/hello')

### Forms

	document.getElementById("xx").focus()
	document.getElementById("xx").disabled = true

	var email = document.getElementById('email').value
	if (email.length < 6 || email.split('@').length !== 2 || email.split('@')[1].indexOf('.') === -1) {
		alert('Please fill in a valid email address')
		return false
	}

## Web Workers

https://github.com/YOUR-USER-NAME/minimalistic-web-workers

https://www.w3schools.com/html/html5_webworkers.asp

	// Main code
	if (typeof(Worker) !== 'undefined') {
		// Yes! Web worker supported
		var myworker = new Worker('demo_workers.js')
		myworker.addEventListener('message', function (event) {
			console.log('Worker said: ', event.data)
		}, false)
		// Send data to our worker
		myworker.postMessage('Hello World')
	}
	else {
		// Sorry! No Web Worker support..
	}

	myworker.terminate()

	// demo_workers.js
	var i = 0

	var timedCount = function () {
		i = i + 1
		postMessage(i)
		setTimeout(timedCount, 500)
	}

	self.addEventListener('message', function (event) {
		console.log('Main app said: ', event.data)
		self.postMessage(event.data)
	}, false)

	timedCount()



## ECMAScript ES5/ES6

### ES5

https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/

### ES6

https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f

	// let and const instead of var (block scoped within {})
	let x = 1
	const Y = 1

	// let with multi-assign - destructured assignment
	let [one, two] = [1, 2]
	let {three, four} = {three: 3, four: 4}
	const { education: { degree:asNamedDegree } } = user
	console.log(asNamedDegree) //prints: Masters
	// Remove a property:
	const { children, ...propsWithoutChildren } = props

	// Arrow functions => (NOTE: doesn't have `this` or `arguments`, but bind() works for parameters)
	const doubleIt = a => a * 2 // similar to: var doubleIt = function (a) { return a * 2 }
	const addTwo = (a, b) => { return a + b } // similar to: var addTwo = function (a, b) { return a + b }
	p => ({ foo: 'bar' })

	// Chained arrow functions
	const middleware = store => next => action => {  
		next(action)
	}

	// Classes: class, constructor, extends, super, get
	class Prefixer extends otherClass {
		constructor(prefix) {
			super()
			this.prefix = prefix
		}
		prefixArray(arr) {
			return arr.map(x => this.prefix + x)
		}
	}

	// Function shorthand
	myObject: {
		url: '/api/kittens/:id',
		reducer (state, action) {}, // Instead of: reducer: function () {}
	}
	// Short function definitions (only inside classes)
	then() {
		this.setState({ loading: false })
	}

	// Default arguments
	function sayMsg(msg='Default message') {}

	// Rest arguments & Spread operator
	function myFunc(str, ...restArguments) {}

	let nums = [5, 4]
	myFunc(str, ...nums)
	{ ...state, visibilityFilter: action.filter } // merge <-- right-to-left

	// Destructuring parameters
	([a,b]) => a + b
	({crudify}, res, next) => {
		res.json(crudify.article)
		next()
	}gs
	for (var [key, value] of phoneBookMap) {}

	// for… of (value instead of index)
	for (let arrayValue of arr) {}

	// String templating with ``
	let person = {name: 'John Smith'}
	let tpl = `My name is ${person.name}.` // note the `` characters

	// Generators

	// Maps & Sets

	// Promises

	let promise = new Promise(function(resolve, reject) {
		!err ? resolve(value) : reject(err)
	})

	const promiseFunction = () => new Promise(function(resolve, reject) {
		resolve('a value')
	})

	// Pattern 1: catch
	p.then(onFulfilled)
		.catch(onRejected)
	// Pattern 2: two arguments
	p.then(onFulfilled[, onRejected])

	p.then(result => result.json())
		.then(onFulfilled) // will get JSON

	Promise.all(promiseArray)
		.then(...)
	Promise.race(promiseArray)
		.then(...)

	Promise.resolve(value)
	Promise.reject(err)

	async/await
	The await keyword can only be used inside functions defined with 'async'.
	(_Can_ use .then() but shouldn’t)

	let [items, contactlist, itemgroup] = await Promise.all([
		fetch('http://localhost:3000/items/get'),
		fetch('http://localhost:3000/contactlist/get'),
		fetch('http://localhost:3000/itemgroup/get')
	])

### Lodash in ES6 ("lodash6")

https://www.sitepoint.com/lodash-features-replace-es6/

	[1, 2, 3].forEach((n, index) => console.log(n))
	[1, 2, 3].map((n, index) => n * 3)
	[1, 2, 3].reduce((result, n) => result + n, 0)
	[1, 2, 3].filter((n, index) => n < 2)
	objs.sort((a, b) => (a.property > b.property) ? 1 : ((b.property > a.property) ? -1 : 0))
	const sortBy = (array, property) => array.sort((a, b) => (a[property] > b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0))

	Object.keys(obj)
	Object.values(obj)

	isEmpty = obj => Object.keys(obj).length === 0

	// head/tail
	const [head, ...tail] = [1, 2, 3]
	const [last, ...initial] = [1, 2, 3].reverse()
	const [firstLetter, ...restOfLetters] = 'ABCDE'

	// assign/merge
	Object.assign(target, ...sources) // returns target
	copy = Object.assign({}, o1) // shallow clone of o1
	Object.assign({}, o1, o2) // safe inheritance
	const merged = {...obj1, ...obj2}

	// Optional props
	const obj = {
		count: 1,
		true && {  }
	}

	// pick
	const { a, c } = { a: 1, b: 2, c: 3 }
	const keyToRemove = 'mykey'
	const { [keyToRemove]: 0, ...newState } = state

	get/set: no matching ES6

	// Function composition
	const add = a => b => a + b
	const add235 = add(235)
	add235(1) // =236

	// Pipeline
	const pipeline = [
		array => { array.pop() return array },
		array => array.reverse(),
	]
	pipeline.reduce((xs, f) => f(xs), [1, 2, 3])

	// pickMatch({ default: 1, week: 7, year: 365 }, periodName)
	const pickMatch = (options, key) => options[key] !== undefined ? options[key] : options.default

	// map(object) from Lodash
	const mapObject = (object, mapFunction) => Object.keys(object).reduce((result, key) => {
		result[key] = mapFunction(object[key], key)
		return result
	}, {})

	const queryObjectFromString = url => (url.split('?')[1] || url || '')
		.split('&')
		.reduce((result, propValue) => {
			if (propValue !== '') result[propValue.split('=')[0]] = decodeURIComponent(propValue.split('=')[1])
			return result
		}, {})

	const queryObjectToString = queryObject => Object.keys(queryObject).reduce((result, key) => result + (result.length ? '&' : '?') + key + '=' + queryObject[key], '')
	const queryObjectToStringIfNotUndefined = queryObject => Object.keys(queryObject).reduce((result, key) => (queryObject[key] === undefined) ? result : result + (result.length ? '&' : '?') + key + '=' + queryObject[key], '')
	// Lodash:
	const queryObjectToString = queryObject => _.reduce(queryObject, (result, value, key) => result + (result.length ? '&' : '?') + key + '=' + value, '')

	const addUrlParameters = (url, newParameters) => url.includes('http')
	  ? url.includes('?')
	    ? `${url}&${newParameters}`
	    : `${url}?${newParameters}`
	  : url

	const objectToCSS = obj => Object.keys(obj).reduce((result, key) => result + `${key}: ${obj[key]}; `, '')

	countObj = _.reduce(domains, function (previous, domain) {
		const keyName = domain.hostname
		previous[keyName] = previous[keyName] || 0
		previous[keyName] += 1
		return previous
	}, {})


## Babel / Browserify

https://github.com/babel/example-node-server
https://github.com/babel/babelify

	npm install -g browserify # Note: global
	npm install --save-dev babelify babel-preset-es2015 babel-preset-es2016 babel-preset-es2017
	npm install --save-dev nodemon

	browserify scripts/index.js -o bundle.js -t [ babelify --presets [ es2015 es2016 es2017 ] ]

package.json:

	"scripts": {
		"start": "nodemon scripts/index.js --exec browserify scripts/index.js -o bundle.js -t [ babelify --presets [ es2015 es2016 es2017 ] ]"
	}

With server:

	"scripts": {
		"start": "nodemon scripts/index.js --exec browserify scripts/index.js -o .tmp/browserify.js -t [ babelify --presets [ es2015 es2016 es2017 ] ] & python -m SimpleHTTPServer"
	},

Simple server:

	npm install node-static

index.js

	const static = require('node-static')
	const file = new static.Server()

	const portNr = process.env.PORT || 3000
	console.log(`Running server on localhost:${portNr}`)
	require('http').createServer(function(request, response) {
		request.addListener('end', function() {
			file.serve(request, response)
		}).resume()
	}).listen(portNr)


## Webpack

https://medium.com/@kimberleycook/intro-to-webpack-1d035a47028d

	yarn add webpack webpack-cli --dev
	touch webpack.config.js

`package.json`:

	"webpack": "webpack-cli",

`webpack.config.js`:

	module.exports = {
	  mode: 'production', // 'development'
	  entry: [
	    './src/public/js/clientUser.js'
	  ],
	  output: {
	    filename: 'index.js',
	    path: __dirname + '/dist'
	  },
	  module: {
	    rules: [ // formerly 'loaders'
	    ]
	  },
	  plugins: [
	    // new HtmlWebpackPlugin({
	    //   template: __dirname + '/src/views/campaigns/list.ejs',
	    //   filename: 'list.ejs'
	    // })
	  ]
	}


### Plugins: HTML/EJS

	yarn add html-webpack-plugin --dev


## Lodash / Underscore

https://lodash.com

Related:

* https://thestorefront.github.io/DataCollection.js/

### _() and _.chain()

	_(myObject).[...].value()
	var youngest = _
		.chain(users)
		.sortBy('age')
		.map(function(o) {
			return o.user + ' is ' + o.age
		})
		.head()
		.value()

	var result = _(myObject).omit(_.isUndefined).omit(_.isNull).value()

### Popular

	_.compact // remove all falsy values
	_.omit(collection, _.isUndefined) // remove undefined values
	_.uniq([2, 1, 2]) // → [2, 1]
	_.map(users, 'name.firstName') // → ['barney', 'fred'], formerly 'pluck'
	_.map(users, function (user) { return user.name })
	_.mapKeys(
		this.props.element.styles,
		(value, key) => !_.includes(invalidArray, key)
	)
	// _.mapValues = _.map for collections
	_.mapValues({ one: 1, two: 2, three: 3 }, function (v) {
		return v * 3
	})
	// pickBy/pick is like filter, but for collections
	_.pickBy(users, function (user, key) {
		return user.name !== undefined
	})
	_.pick(collection, ['email', 'name']) // → { email: , name: }
	_.omit/omitBy = opposite of pick
	_.sortBy(users, ['user', 'age'])
	_.orderBy(json, 'key', 'desc') // sortBy
	_.orderBy(users, ['user', 'age'], ['asc', 'desc'])
	_.reject() // inverted filter
	// filter: for collections, use pick
	_.filter(users, { 'age': 36, 'active': true })
	_.filter(users, 'active', false)
	_.filter([4, 5, 6], function (n) {
		return n % 2 == 0
	}) // → [4, 6]
	_.find // first element only
	_.findKey, _.findIndex
	_.slice(array, [start=0], [end=array.length])

	_.map(subscriptions, function (sub) {
		if (sub.checked) {
			return sub.id
		}
	})
	_.reduce([1, 2], function (result, item) {
		return result + item
	}, startValue)

	_.has($rootScope, 'currentUser.role')
	_.get($rootScope, 'currentUser.role', defaultValue)
	_.set(user, 'accessTokens.instagram', accessToken)
	_.set(user, ['accessTokens.instagram'], accessToken)
	_.includes([1, 2, 3], 1) // true, same as _.contains(videoURL, '?')
	_.includes('1,2,3', '1') // true
	_.every(['1', '2'], _.partial(_.has, myCollection)) // 'has' for multiple keys
	_.some
	_.isEmpty(changedUserProperties) // not _.empty

	_.assign(object, [sources]) (_.extend) = // shallow
	_.merge(object, [sources]) // deep - NOTE: for objects only, for arrays use concat()
	_.clone(object) // shallow
	_.cloneDeep(object) // deep

	// Extending Lodash:
	_.mixin({ 'myOwnFunction': myOwnFunction })
	// Then use myOwnFunction:
	_(myArray).map('services').flatten().uniq().myOwnFunction()

	// wrapAsArray: always return Array
	module.exports.wrapAsArray = objectOrArray => objectOrArray.constructor === Array ? objectOrArray : [objectOrArray]
	// objectLength: return length on Array or Object
	module.exports.objectLength = objectOrArray => objectOrArray.constructor === Array ? objectOrArray.length : 1
	// applyToAll(func, obj1) or applyToAll(func, [obj1, obj2, ...])
	module.exports.applyToAll = (func, objectOrArray) => objectOrArray.constructor === Array ? objectOrArray.map(func) : func(objectOrArray)
	// applyToAllAsync(promiseFunction, obj1) or applyToAllAsync(promiseFunction, [obj1, obj2, ...])
	module.exports.applyToAllAsync = async (promiseFunction, objectOrArray) => new Promise(async (resolve, reject) => {
		const objects = objectOrArray.constructor === Array ? objectOrArray : [objectOrArray]
		let errors, values
		for (let i = 0; i < objects.length; i++) {
			try {
				values = values || []
				values.push(await promiseFunction(objects[i]))
			} catch (err) {
				errors = errors || []
				errors.push(err)
			}
		}
		resolve({ errors, values })
	})
	// applyToAllOldAsync(functionWithCb(obj, cb), callback(err, results), obj1) or applyToAllOldAsync(functionWithCb(obj, cb), callback(err, results), [obj1, obj2, ...])
	module.exports.applyToAllOldAsync = (functionWithCb, callback, objectOrArray) => async.mapSeries((objectOrArray.constructor === Array ? objectOrArray : [objectOrArray]), functionWithCb, callback)

	// includesSome is NOT pickAny
	// includesSome(url, ['localhost', 'staging'])
	module.exports.includesSome = (parentObj, childObjects) => _.filter(childObjects, childObj => _.includes(parentObj, childObj))
	_.mixin({ 'includesSome': module.exports.includesSome })
	const includesSome = (parentObj, childObjects) => childObjects.filter(childObj => parentObj.includes(childObj))
	const startsWithSome = (parentObj, childObjects) => childObjects.filter(childObj => parentObj.startsWith(childObj))

	var doWhen = function (func, expressionFunc, failFunc, iterations) {
		iterations = iterations || 0
		failFunc = failFunc || function () { console.error('doWhen timed out') }
		iterations >= 100
			? failFunc()
			: expressionFunc()
				? func()
				: setTimeout(doWhen.bind(undefined, func, expressionFunc, failFunc, iterations + 1), 10)
	}

	// [{ reference: foo, .. }, { reference: bar, .. }] -> { foo: .., bar: .. }
	const arrayToCollection = (array, keyField='reference') => _.reduce(array, (collection, obj) => { collection[obj[keyField]] = obj return collection }, {})
	_.mixin({ 'arrayToCollection': arrayToCollection })

	// [{ _id: foo, .. }, { _id: bar, .. }] -> { foo: .., bar: .. }
	module.exports.arrayToCollection = function (array, keyField) {
		keyField = keyField || '_id'
		return _.reduce(array, function (collection, obj) {
			collection[obj[keyField]] = obj
			return collection
		}, {})
	}
	_.mixin({ 'arrayToCollection': arrayToCollection })

	// { foo: .., bar: .. } -> [{ _id: foo, .. }, { _id: bar, .. }]
	module.exports.collectionToArray = function (collection, keyField) {
		keyField = keyField || '_id'
		return _.map(collection, function (obj, key) {
			obj[keyField] = key
			return obj
		})
	}
	_.mixin({ 'collectionToArray': collectionToArray })

## `debounce` vs. `throttle`

	// debounce: waits timeInMs for repeated calls, then executes (“train waiting timeInMs for more passengers”)
	var myFunctionDebounced = _.debounce(myFunction, timeInMs, { leading: false, trailing: true, maxWait: X })
	// throttle: ignores repeated calls that happens within timeInMs limit (“train leaves each timeInMs no matter what”)
	var myFunctionThrottled = _.throttle(myFunction, timeInMs, { leading: true, trailing: true })


## AngularJS

* App
* Modules
* Controllers
* Services, Factories, Providers
* Directives
* Views

	angular.module('MyApp', []) // setter
	angular.module('MyApp') // getter


	// index.html
	<html ng-app="MyApp">
	<div ng-controller="MyCtrl">{{ testValue }}</div>

	// application.js
	function MyCtrl($scope) {
		$scope.testValue = 3.14
	}

	<ul>
	<li ng-repeat="item in items">
	{{item.description}}
	</li>
	</ul>

	<li ng-repeat="thing in awesomeThings">{{ thing }}</li>

	<a ng-repeat="tool in category.tools" ng-click="selectTool($index)" ng-class="{selected: $index==selectedToolIndex}" class="tool_button" id="tool_{{tool.id}}"><img alt="{{tool.label}}" src="../images/toolicon_rectangle.png"/><span class="tool_button_label">{{tool.label}}</span></a>

	<span ng:bind="name"></span> // display the value of ‘name’ inside the span

### HTML Templates

	<div ng-include src="template.url"></div>

### Services vs. Factory vs. Provider

Why use a Service?

* Persist and share data between Controllers.
* Abstract data access logic by creating an API that will be used by your controllers/directives/services.
* DRY (Don't repeat yourself).

	http://stackoverflow.com/questions/15666048/angular-js-service-vs-provider-vs-factory

	// Service definition
	app.service('testService', function () {
		this.sayHello = function (text) {
			return "Service says \"Hello " + text + "\""
		}		  
	})

// "I would say the benefit of using a FACTORY over a SERVICE is that it allows some control over access to properties - private & public per se whereas all of the properties of the service are by nature exposed."

### $resource

	{
		'query':  { method:'GET', isArray:true },
		'get':    { method:'GET' },
		'save':   { method:'POST' },
		'remove': { method:'DELETE' },
		'delete': { method:'DELETE' }
	}

### Scopes and Broadcasting

* One $rootScope per Application.
* By default, child scopes prototypically inherit from the parent scope, so you already have access to the parent controller's properties in the child.
* You can create an _isolate scope_ if you want reusable components that don't rely on parent scope.

	scope: {}, // isolate scope

* 1-Way/Text binding, prefix: @ - NOTE: constant
* 2-Way binding, prefix: =
* Method binding, prefix: &

	scope: {
		text: "@myText",
		twoWayBind: "=myTwoWayBind",
		oneWayBind: "&myOneWayBind"
	}


### $emit and $broadcast

	$emit('MyEvent') // to parent + self
	$broadcast('MyEvent') // to children + self

	// When parent/child receives an event
	$scope.$on('MyEvent', function () {
		$scope.count++
	})

### $apply and $watch

- $watch: Actively watch a model change.
- $apply: Force $watch:es to react.


## Polymer / Web Components

http://www.cheatography.com/jonathanberi/cheat-sheets/polymer-js/

	<template repeat="{{s in stories}}"></template>

	<template>
		<button on-click="{{onClick}}">Send hurt</button>
	</template>
	<script>
		Polymer({
			onClick: function () {
				this.fire('ouch', {msg: 'That hurt!'}) // fire(type, detail, targetNode, bubbles?, cancelable?)
			}
		})
	</script>


## React

### create-react-app

https://github.com/facebookincubator/create-react-app

	yarn create react-app my-app  # or npx create-react-app my-app, or npm init create-react-app my-app
	cd my-app
	yarn start

### Next.js (with Zeit Now):

	yarn create next-app my-app
	cd my-app
	now dev

### Directory structure

	/public
	/src
		/config
		/App
			/Components
		/Views
			/StartPage
				/Components

https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1

#### Folders

	mkdir components; mkdir pages; mkdir lib; mkdir static

* `components`: React components
* `pages`: Page components
* `lib`: data
* `static`: e.g. CSS files, images

#### Next.js Page written as functional component with React Hooks

	function MyPage ({ query }) {
	  const { data, loading, error } = useQuery(personQuery(query.slug))
	  if (loading) return 'Loading...'
	  if (error) return `Error! ${error.message}`
	  if (!data.person) return `Not found`
	  return <main>
	    <h1 className='capitalize'>{data.person.name}</h1>
	  </main>
	}

	MyPage.getInitialProps = async ({ req, res, pathname, asPath, query }) => {
	  return { query }
	}

	export default MyPage

#### Minimal app

	class MyApp extends React.Component {

		state = {
			isLoading: false
		}

		constructor (props) {
			super(props)
			this.state = { prop1: 'this prop' }
			this.handleClick = this.handleClick.bind(this)
		}

		handleClick (event) {
			event.stopPropagation()
			this.setState({ count: ++this.state.count })
		}

		handleClickArrow = event => {
			event.stopPropagation()
		}

		onInputChange(event) {
			this.setState({ searchText: event.target.value })
		}

		render: function () {
			return (
				{/* A JSX comment */}
				<div>
					<label>This button has been clicked {this.state.count} times:</label>
				<br/>
					<button onClick={this.handleClick}>Hello {this.props.name}</button>
				</div>
			)
		}

	}

	ReactDOM.render(
		<MyApp name="World" />,
		document.getElementById('container')
	)

React.createClass is deprecated

### Import components

	import { Link } from 'react-router-dom'
	import AppHeader from '../../components/AppHeader/AppHeader'

### Routing/multiple pages/views

react-router-dom:

* https://reacttraining.com/react-router/web/guides/quick-start
* https://github.com/ReactTraining/react-router

Code:

	import { BrowserRouter as Router, Route } from 'react-router-dom'

	export default () => (
	  <Router>
	    <div>
	      <Route path='/' component={Screen} />
	      <Route path='/gamepad' component={Gamepad} />
	    </div>
	  </Router>
	)

Push route:

	import { withRouter } from 'react-router-dom'

	console.log(this.props.location.pathname)
	this.props.history.push(`/path`)

#### Next.js: next-routes (better)

	// routes.js
	const routes = require('next-routes')
	const routesImplementation = routes()
	routesImplementation.add('myIdentifier', '/path/:slug', 'myNextjsPage')

	// Inside a view
	import { Link } from '../myRoutes'
	<Link route='/path/slug1'>
		<a>My link</a>
	</Link>

	// pushRoute
	import { Router } from '../myRoutes'
	// With route URL
	Router.pushRoute('/blog/hello-world')
	// With route name and params
	Router.pushRoute('blog', {slug: 'hello-world'})

#### Next.js: next/link (built in)

	import Link from 'next/link'

	<Link
		href='/aboutPage' // Internal Next.js URL
		as='/about' // Pretty URL visible for users
	>
		<a>My link</a>
	</Link>

### Components with JSX

Comparison:

	// Variant 1: Compact with arrow function - you can remove {return} for even more compact:
	const MyComponent = ({prop1}) => {
		return (
			<div>
					<h2>About {prop1}</h2>
				</div>
		)
	}
	export default DateValue

	// Variant 2: Class/extends with state etc
	export default class MyComponent extends React.Component {

		constructor(props) {
			super(props)
			this.state = { prop1: 'this prop' }
		}

		render() {
			console.log(this.props.prop1)
			return (
				<div>
					<h2>About {this.props.prop1}</h2>
				</div>
			)
		}

	}

#### Without JSX

	React.createElement('div', { styles: 'color: red' }, `Hello ${this.props.toWhat}`)
	React.createElement(Rectangle, { className: 'apply-styles' }, children)

	// All props
	<Button {...props} />

#### Clone children - add props to children

	const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(child, { myProp1, myProp2 }))

	// Only 1 child
	React.cloneElement(child, { myProp1, myProp2 })

### React Hooks

https://reactjs.org/docs/hooks-overview.html

- `useState(initialState)`: returns `[state, setState]`.
- `useEffect(fn, [deps])`: instead of componentDidMount. Empty deps = fire once, otherwise when deps change.
- `useContext`
- `useReducer(reducer, initialArg, init)` - returns `[state, dispatch]`. An alternative to useState.
- `useCallback(fn, [deps])`: returns a memoized version of the callback that only changes if one of the dependencies has changed. Use to prevent this passing a new function each render.
- `useMemo(() => computeExpensiveValue(a, b), [a, b])`: Returns a memoized value.
- `useRef(initialValue)`: returns a mutable ref object.
- `useImperativeHandle(ref, createHandle, [deps])`
- `useLayoutEffect(fn, [deps])`: identical to useEffect, but it fires synchronously after all DOM mutations.
- `useDebugValue(value)`: to display a label for custom hooks in React DevTools.

**Note:** never call Hooks inside loops, conditions, or nested functions – https://reactjs.org/docs/hooks-rules.html

#### React Context

https://reactjs.org/docs/context.html

- myContext = React.createContext(defaultValue)
- React.useContext(myContext) // hook
- myContext.Provider

#### styled-components

	import styled from 'styled-components'

	const MyComponent = styled.div`
		font-family: ${props => props.theme.fontName};
		color: ${weldTheme.blue};
		background-color:  'tomato';
	`

Inheritance:

	const OtherComponent = styled(MyComponent)`
		color: orange;
	`

or Theming:

	<MyComponent theme={{ color: 'orange' }}>

	const MyComponent = styled.div`
		color: ${props => props.theme.color || 'gray'};
	`

Attributes:

	const DivWithAttributes = styled.div.attrs({
		className: 'bootstrap-button',
		padding: props => props.size || '1em'
	})`
		color: palevioletred;
		padding: ${props => props.padding};
	`

Change element type:

	const PrimaryLink = PrimaryButton.withComponent('a')
	// or:
	<PrimaryButton as='a'/>

Refer to ${ChildComponent}:

	const PrimaryButton = styled.button`
		width: 48px;

		${Icon}:hover & {
			fill: rebeccapurple;
		}
	`;


#### styled-jsx

https://github.com/zeit/styled-jsx

	<div>My DIV</div>
	<style jsx>{`
		div { background-color: blue }
	`}</style>


	<style jsx>{`
		.weld-element :global(.apply-styles) {
		}
	`}</style>

	<style jsx global>

#### SVG

1) Import:

  "react-svg-inline": "^2.1.1",
  "svg-inline-loader": "^0.8.0"

2) webpack / next.config.js

	const config = {
	  webpack: (config, { dev, isServer }) => {
	    config.module.rules.push({
	      test: /\.svg$/,
	      loader: 'svg-inline-loader'
	    })
	    return config
	  }
	}
	module.exports = config

3) Use SVG:

	import SVGInline from 'react-svg-inline'

	<SVGInline svg={require('./icons/download.svg')} />

#### Lists = arrays of components

// Alt 1:

	const fonts = [
		<link rel="stylesheet" href="https://static.polarnopyret.se/skin/frontend/enterprise/popee/css/fonts.css"/>,
		<link rel="stylesheet" href="https://s3-eu-west-1.amazonaws.com/weld-design-kit/weld-fonts.css"/>,
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,regular,italic,600,600italic,700,700italic,800,800italic"/>,
	]
	return <div>{fonts}</div>

// Alt 2:

	const DateValues = ({metric, dateValues, handleAdd, handleRemove}) => {

		console.log('dateValues', dateValues)

		const dateValueList = _.map(
			dateValues,
			(dateValue, key) => <DateValue key={key} dateValue={dateValue} handleRemove={handleRemove}/>
		)

		return 	(
			<div>
				<button className="add" onClick={handleAdd}>+ Add value</button>
				{dateValueList}
			</div>
		)

	}

	export default DateValues

#### Fragments

	<React.Fragment>
	</React.Fragment>

or

	<></>

#### Lifecycle methods

* Rendering:
	* `render`
* Initialize:
	* `constructor(props)` (ES6) // same as getInitialState (React.createClass)
	* `componentWillReceiveProps(props)` // When URL changes, client-side
	* `getInitialProps` (only for Next.js pages)
	* `getDefaultProps` // only supported for classes created using React.createClass. Use a static property to define defaultProps instead.
* Mounting:
	* `componentWillMount` // client and server
	* `componentDidMount` // client-side only, great for state loading
	* `componentWillUnmount`
* Updating:
	* `shouldComponentUpdate`
	* `componentWillUpdate`
	* `componentDidUpdate`

### Data: props and state

https://medium.freecodecamp.com/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00

* `this.props` is immutable data - use a lot.
	* `this.props.children`: child elements.
* `this.state` is mutable data - keep it minimal.

setState:

	this.setState({ loading: false })

	<ListComponent items={this.state.list} remove={this.handleRemoveItem.bind(this)} />

HTML:

	<div dangerouslySetInnerHTML={{ __html: article.content }} />

Firebase + React: re-base

### Events

	<button onClick={this.handleClick}>Hello {this.props.name} {this.props.children}</button>

Optional event/props:

	{onAdd ? <button className='icon add' onClick={onAdd.bind(undefined, person)}>+</button> : null}


#### create-react-app on Heroku

	heroku create APP_NAME --buildpack mars/create-react-app

#### create-react-app on GitHub Pages

package.json:

	"homepage": "http://tomsoderlund.github.io/css-motion-toy",
	"scripts": {
		"predeploy": "yarn build",
		"deploy": "gh-pages -d build"
	},

Then:

	yarn add gh-pages --dev
	yarn deploy


### Gatsby.js

	yarn global add gatsby-cli   # npm install --global gatsby-cli

	gatsby new MYSITE https://github.com/gatsbyjs/gatsby-starter-default#v2

	gatsby develop
	gatsby build && gatsby serve


## Redux

https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f
https://egghead.io/courses/getting-started-with-redux

Firebase + Redux: https://github.com/prescottprue/react-redux-firebase

### Concepts

* Store
* Reducer
* Actions

### Organize

https://jaysoo.ca/2016/02/28/organizing-redux-application/

	todos/
		components/
		actions.js
		actionTypes.js
		constants.js
		index.js
		reducer.js
	projects/
		components/
		actions.js
		actionTypes.js
		constants.js
		index.js
		reducer.js
	index.js
	rootReducer.js


## JQuery

	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
	<script language="javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>

### HTTP

	var jqxhr = $.get('example.php', function () {
		alert('Success!')
	})

### Selectors

.find() and .children() methods are similar,
except that the latter only travels a single level down the DOM tree.

Classes:

	$("p").removeClass("myClass noClass").addClass("yourClass")

### Custom Jquery Plugins

http://stefangabos.ro/jquery/jquery-plugin-boilerplate-oop/

### Events

	$('#slider').on('click mousedown touchstart', clearInterval.bind(this, timerId))
	$("button").click(function (event) {
		alert(event.target.id)
	})
	$(document).ready(function () { alert('Document Ready') }) // When DOM is loaded
	$(window).load(function () { alert('Load') }) // When all images etc has been loaded

	$(document).ready(function () {
		$("a").click(function (event){
			alert("Thanks for visiting!")
		})
	})

	$(".icon_gift").hover(
		function (eventObject) {
			popover = $(this).find(".gift_popover")
			popover.show()
		},
		function (eventObject) {
			popover = $(this).find(".gift_popover")
			popover.hide()
		}
	)

### DOM

	var newElement = $('<p>Test</p>').appendTo('.parentClass')
	var parentElement = $('.parentClass').append('<p>Test</p>')

	$('#parentElement').empty()

### Position X/Y

	var getElementPosition = function (selector) {
		var elementPos = $(selector).position()
		return [elementPos.left, elementPos.top]
	}

	var setElementPosition = function (selector, pos) {
		$(selector).css({ left: pos[0] + 'px', top: pos[1] + 'px' })
	}

### Forms

	$('#firstname').focus()

	textboxValue = $('#mytextbox').val()

	if ($(this).attr('id') == "radiobutton_female") {
		$("#radiobutton_female").removeClass("radiobutton").addClass("radiobutton_selected")
	}

	$('form.edit_task').submit(checkForm)

	$("#task_notes").html("")
	.text()
	$('#task_notes').attr('value') == 'Notes'
	$('#task_notes').attr('value', '')
	$("#gender").val("female")

	$( "p:last" ).offset({ top: 10, left: 30 })
	$( "p:last" ).position({ top: 10, left: 30 })

### CSS

	$('#album1').css('left', this.x + 'px')

### Animations

	$(elementId).animate({
			top: '+=50',
			//width: ['toggle', 'swing']
		},
		1000,
		animateBack(elementId)
	)

	var animatePulse = function (elem, duration, easing, props_to, props_from, until) {
		elem.animate(props_to, duration, easing,
			function () {
				if (until() === false) {
					animatePulse(elem, duration, easing, props_from, props_to, until)
				}
			}
		)
	}

	var pulseCounter = 0
	animatePulse($('#user-register'), 500, 'linear', {opacity: 0.5}, {opacity: 1},
		function () {
			pulseCounter++	 
			return (pulseCounter >= 10)
		}
	)

### Drag & Drop

Note: include both JQuery and JQuery-UI!

Extending JQuery

	// Check if the element has a certain CSS property
	$.fn.hasCssProperty = function (wantedParameter) {
		if (this.cssProperty(wantedParameter))
			return true
		else
			return false
	}


## TinyColor

	yarn add tinycolor2

then:

	tinycolor(colorStr).toHexString()

	tinycolor.mix(color1, color2, amount = 50)
	lighten, darken

https://github.com/bgrins/TinyColor#methods


## Async

https://caolan.github.io/async/docs.html

	var function1 = function (callback) {
		callback(null, 'one', 'two')
	}

	var function2 = function (arg1, arg2, callback) {
		// arg1 now equals 'one' and arg2 now equals 'two'
		callback(null, 'three')
	}

	var function3 = function (arg1, callback) {
		// arg1 now equals 'three'
		callback(null, 'done')
	}

	var whenWaterfallDone = function (err, result) {
		// err truthy if err in any function
		// result now equals 'done'
		console.log('whenWaterfallDone', err, result)
	}

	async.parallel({
			obj1: function (cb) { cb(err, results) },
			obj2: function (cb) { cb(err, results) },
		},
		// When all done
		function (err, results) {}
	)

	async.series({
			obj1: function (cb) { cb(err, results) },
			obj2: function (cb) { cb(err, results) },
		},
		// When all done
		function (err, results) {}
	)

	async.waterfall([
			function1.bind(this, inputData),
			function2,
			function3
		],
		whenWaterfallDone
	)

	// See also map/mapSeries - similar but with results (below)
	// xSeries = 1 at a time!
	async.eachSeries/eachOfSeries[/each/eachOf](
		items,
		// For each
		function (item, cb) { // eachOf: function (item, itemKey, cb)
			cb()
		},
		// When all done
		function (err) {
		}
	)

	async.mapSeries(
		itemsCollection,
		// For each
		function (item, cb) {
			cb(err, results)
		},
		// When all done
		function (err, results) {
		}
	)

	async.reduce(
		[1,2,3],
		0,
		function (result, item, cb) {
			cb(null, result + item)
		},
		function (err, result) {
		}
	)

	// See also doWhilst/doDuring AND until/whilst/during
	async.doUntil(
		func(cb),
		testFunction,
		whenDone
	)


## Linting

### Standard JS

	yarn add standard --dev
	yarn add pre-commit --dev  # If you want Git commit check

package.json:

	"scripts": {
		"test": "echo 'Running Standard.js and Jasmine unit tests...\n' && yarn lint && yarn unit",
		"lint": "standard",
		"fix": "standard --fix",
		"unit": "jasmine"
	},
	"pre-commit": [
		"lint"
	],
	"standard": {
		"ignore": [
			".next"
		],
		"globals": [
			"beforeAll",
			"beforeEach",
			"describe",
			"expect",
			"it",
			"jasmine",
			"spyOn"
		]
	},

Ignore line:

	myCode() // eslint-disable-line no-useless-escape


### ESLint

	yarn add eslint --dev
	npm install eslint --save-dev

Config: `.eslintrc.js`

### Prettier

	yarn add prettier --dev --exact
	# or globally
	yarn global add prettier

Config: `.prettierrc`


## Documentation - JSDoc

http://usejsdoc.org

	/** This is a description of the foo function. */
	function foo() {
	}

	/**
	 * Represents a book.
	 * @constructor
	 * @param {string} title - The title of the book.
	 * @param {string} author - The author of the book.
	 */
	function Book(title, author) {
	}

Module:

	/**
	 * Shirt module.
	 * @module my/shirt
	 */

## Reserved Words

	break
	case
	catch
	class
	continue
	debugger
	default
	delete
	do
	else
	enum
	export
	extends
	false
	finally
	for
	function
	if
	implements
	import
	in
	instanceof
	interface
	let
	new
	null
	package
	private
	protected
	public
	return
	static
	super
	switch
	this
	throw
	true
	try
	typeof
	var
	void
	while
	with
	yield

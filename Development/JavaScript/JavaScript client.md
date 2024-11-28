# JavaScript

## JavaScript include

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
	// export default MyFunction = () => {}
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

	console.log
	console.warn
	console.error
	console.info

	console.log(event.fromElement.tagName) // works only in Firefox?
	process.stdout.write('no line')

	console.time('myFunction')
	console.timeLog('myFunction', 'current state...')
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

Print an object tree:

	function printObjectTree(
		obj: any,
		maxLevels: number = -1,
		skipKeys: string[] = [],
		currentLevel: number = 0
	): void {
		const indentStr = currentLevel > 0 ? `${'  '.repeat(currentLevel)}∟ ` : '';
		if (maxLevels !== -1 && currentLevel >= maxLevels) {
			return;
		}
		for (const key in obj) {
			if (skipKeys.includes(key)) {
				continue;
			}
			if (obj.hasOwnProperty(key)) {
				const textChildStr = typeof obj[key] === 'string' ? `: "${obj[key]}"` : '';
				console.log(indentStr + key + textChildStr);
				// If the value is another object, recursively print its keys
				if (typeof obj[key] === 'object' && obj[key] !== null) {
					printObjectTree(obj[key], maxLevels, skipKeys, currentLevel + 1);
				}
			}
		}
	}

Build a tree:

	interface TreeNode {
		[key: string]: any;
		children?: TreeNode[];
	}

	function buildObjectTreeFromArray(
		arrayOfObjects: TreeNode[],
		idField: string,
		parentIdField: string,
		parentId: number | string | null = null,
	): TreeNode[] {
		const tree: TreeNode[] = [];
		// Filter the array to get all objects with the current parentId
		const children = arrayOfObjects.filter((obj) => obj[parentIdField] === parentId);
		// Loop through the filtered children
		for (const child of children) {
			// Recursively build the tree for each child
			const childNode: TreeNode = {
				...child,
				children: buildObjectTreeFromArray(arrayOfObjects, idField, parentIdField, child[idField]),
			};
			// If no children are found, remove the empty children property
			if (childNode.children?.length === 0) {
				delete childNode.children;
			}
			// Add the built node to the tree
			tree.push(childNode);
		}
		return tree;
	}

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


## Object-Oriented (OOP): Classes & Instances

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

	// Simple, faster: 'object', 'string', 'number', 'boolean'
	typeof myObj

	myDateObj instanceof Date // true

	// Advanced: Object, Array, String, Number, Boolean, Function
	objectOrArray.constructor === Array

	objectOrArray && objectOrArray.constructor.name

	Array.isArray(objectOrArray)

	// Advanced, slower: '[object X]' where X can be Object, Array, String, Number, Boolean, Function
	Object.prototype.toString.call(myObj) === '[object Array]'

	isNaN(123) // false

### Custom classes

	/**
	 * A custom class: const myMyClass = new MyClass('foo')
	 *
	 * @constructor
	 * @param {number} myProperty A number for...
	 * @returns {MyClass} The new MyClass object
	 */
	function MyClass (myProperty) {
		// Private
		const privateVariable = myProperty * 2
		const privateMethod = function () {}
		// Public
		this.publicProperty = myProperty * 3
		this.publicPrivilegedMethodOnInstance = function () {}
		this.getPrivateVariable = function () { return privateVariable }
	}
	MyClass.prototype.publicMethod = function () { return this.getPrivateVariable() }

	const myMyClass = new MyClass('foo')


	WELD.clone = function (obj) {
		if (null == obj || "object" != typeof obj) return obj
		var copy = obj.constructor()
		for (var attr in obj) {
			// or Object.prototype.hasOwnProperty.call(obj, attr)
			if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
		}
		return copy
	}


## Loops

	for (const entry of array) {
	  console.log(entry)
	}

	for (const i in array) {
		console.log(`${i}: ${array[i]}`)
	}

	for (const key in object) {
		console.log(`${key}: ${object[key]}`)
	}

	const keys = ['apple', 'banana', 'citrus']
	for (const k in keys) {
		console.log(`${keys[k]}: ${object[keys[k]]}`)
	}

	for (let i = 0; i < array.length; i++) {
		console.log(`${i}: ${array[i]}`)
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
	const getRandomNumericString = (length = 5) => Math.round(Math.random() * Math.pow(10, length)).toString()
	const getRandomString = (length = 5) => window.btoa(Math.random().toString()).substring(-length).replace(/[^a-zA-Z]/g, '').split('').reverse().join('')
	const getRandomFromArray = (array) => array[Math.round(Math.random() * (array.length - 1))]
	// getRandomIndexFromWeightedArray([0.1, 0.3, 0.6]) --> returns index 0-2
	const getRandomIndexFromWeightedArray = (weightedArray) => {
	  const randomNr = Math.random()
	  let total = 0
	  for (var i = 0; i < weightedArray.length; i++) {
	    total += weightedArray[i]
	    if (total > randomNr) return i
	  }
	}
	const getRandomFromWeightedArray = (array, weightedArray) => array[getRandomIndexFromWeightedArray(weightedArray)]
	const getSerialFromArray = (array, index) => array[index % array.length]
	const otherNumber = (allNumbers, notNumber) => shuffleArray(allNumbers).filter(nr => notNumber !== nr)[0]

	// if (withProbability(0.33)) { ...then }
	const withProbability = (p) => Math.random() < p

	Seeded random: https://github.com/davidbau/seedrandom
	const seedrandom = require('seedrandom')
	const random = seedrandom('hello.')
	console.log(random()) // Always 0.9282578795792454

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
	const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

	parseInt(StringorNum) // to int
	parseFloat(StringorNum) // to float

	// Pad decimals
	number.toFixed(2)

	function padDigits (number, digits) {
		return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
	}

	const interpolate = function (fraction, min, max) {
	  const result = min + (fraction * (max - min))
	  // If min and max are integers, return integer
	  return (min % 1 === 0 && max % 1 === 0) ? Math.round(result) : result
	}

	const wrapPageNumber = (incr = 1) => (incr + pageNumber + numPages - 1) % numPages + 1

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

	const hypotenuse = (a, b) => Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

X/Y distances:

	const getDistance = (point1, point2) => Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2))
	const getVector = (point1, point2) => ([point2[0] - point1[0], point2[1] - point1[1]])
	const addVector = (vector1, vector2) => vector1.map((v, index) => v + vector2[index])
	const multiplyVector = (vector, multiplier) => vector.map(v => v * multiplier)

	Math.sign(-3) // -1

	const splitLine = (point1, point2, segmentLength) => {
	  const distance = getDistance(point1, point2)
	  const vector = getVector(point1, point2)
	  const segmentCount = Math.floor(distance / segmentLength)
	  const segmentVector = multiplyVector(vector, segmentLength / distance)
	  const segments = [
	    point1,
	    ...fillArray(segmentCount, index => multiplyVector(segmentVector, index + 1)),
	    point2
	  ]
	  return segments
	}

Vector to X/Y:

	const xySpeed = (speed, rotationDegrees) => ({
		x: Math.sin(rotationDegrees/180 * Math.PI) * speed,
		y: -Math.cos(rotationDegrees/180 * Math.PI) * speed,
	})

Get angle:

	const getAngle = function (x, y) {
		const angle = Math.atan2(y, x) // radians
		const degrees = 180 * angle / Math.PI // degrees
		return (360 + Math.round(degrees)) % 360 // round number, avoid decimal fragments
	}

Graph circle:

	const findNewPoint = (x, y, angle, distance) => ({
		x: Math.round(Math.cos(angle * Math.PI / 180) * distance + x),
		y: Math.round(Math.sin(angle * Math.PI / 180) * distance + y)
	})

Speed, Bounce and Gravity:

	const applyAcceleration = (position, speed, acceleration) => {
		for (let dim = 0; dim < position.length; dim++) {
			speed[dim] += acceleration[dim]
			position[dim] += speed[dim]
		}
	}

	const applyBounce = (position, speed, acceleration) => {
		if (position[Y] > 200) {
			speed[Y] = -speed[Y] * 0.9
			speed[ROTATION] = -speed[ROTATION] * 0.9
			position[ROTATION] = position[ROTATION] * 0.9
			position[Y] = 200
		}
	}

	const applyBlackHole = (position, acceleration, holePosition = [150, 150], gravity = 0.01) => {
		for (let dim = 0; dim < position.length; dim++) {
			acceleration[dim] = (holePosition[dim] - position[dim]) * gravity
		}
	}

Collisions

	function areTwoRectanglesColliding (
		obj1x: number,
		obj1y: number,
		obj1width: number,
		obj1height: number,
		obj2x: number,
		obj2y: number,
		obj2width: number,
		obj2height: number
	): boolean {
		return (
			obj1x < obj2x + obj2width &&
			obj1x + obj1width > obj2x &&
			obj1y < obj2y + obj2height &&
			obj1y + obj1height > obj2y
		)
	}

	function areCircleAndRectangleColliding (
		circleCenterX: number,
		circleCenterY: number,
		circleRadius: number,
		rectLeftX: number,
		rectTopY: number,
		rectWidth: number,
		rectHeight: number
	): boolean {
		const distX = Math.abs(circleCenterX - rectLeftX - rectWidth / 2)
		const distY = Math.abs(circleCenterY - rectTopY - rectHeight / 2)
		if (distX > (rectWidth / 2 + circleRadius)) return false
		if (distY > (rectHeight / 2 + circleRadius)) return false
		if (distX <= (rectWidth / 2)) return true
		if (distY <= (rectHeight / 2)) return true
		const dx = distX - rectWidth / 2
		const dy = distY - rectHeight / 2
		return (dx * dx + dy * dy <= (circleRadius * circleRadius))
	}

Geographic distance (latitude/longitude to distance):

	// Calculate geographic distance in meters – https://stackoverflow.com/a/21623206/449227
	export function geoDistance (lat1, lng1, lat2, lng2) {
	  const p = 0.017453292519943295 // Math.PI / 180
	  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 +
	    Math.cos(lat1 * p) * Math.cos(lat2 * p) *
	    (1 - Math.cos((lng2 - lng1) * p)) / 2
	  return Math.round(1000 * 12742 * Math.asin(Math.sqrt(a))) // 2 * R; R = 6371 km
	}


## Strings/Texts

http://www.w3schools.com/jsref/jsref_obj_string.asp

	string.length

	string.charCodeAt(index)
	String.fromCharCode(189, 43, 190, 61)

	console.log('String: “%s”, Integer: %d, Float: %f, Boolean: %s', myString, myInteger, myFloat, myBoolean)

### Make strings

	const makeStringOfLength = (char, length) => new Array(length + 1).join(char)

### String search/comparison

	string.indexOf(searchstring, start)
	string.lastIndexOf(searchstring, start)
	string.search() // for regular expressions

	s.startsWith('hello')
	s.endsWith('hello')

	const stringContains = (bigString, searchString) => bigString.toLowerCase().includes(searchString.toLowerCase())

	doesStringContainX = (bigString.indexOf(x) !== -1)
	doesStringBeginWithX = (bigString.substring(0, x.length) === x)
	doesStringEndWithX = bigString.endsWith(x)

	string.charAt(index)

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

	// replaceMultipleStrings(['This is $1', 'Sparta']) --> 'This is Sparta'
	const replaceMultipleStrings = (array, str) => (str || array[0]).replace(/(\$\d)/gm, strId => array[parseInt(strId.slice(1))])

	// "Hello {{value|My Default Value}}"
	const replaceTemplatePlaceholders = function (stringTemplate, keyValues) {
	  return stringTemplate
	    .replace(/{{([\w|||\s]+)}}/g, function (match, matchedString) {
	      const keyAndDefault = matchedString.split('|')
	      return keyValues ? keyValues[keyAndDefault[0]] || keyAndDefault[1] || '' : ''
	    })
	    .replace(/ {2}/g, ' ') // remove double spaces for missing variables
	}

### Cutting strings

	string.substr(start, length)
	string.substring(start, end) = string.slice(start, end)

	string.substr(nrOfInitialCharsToRemove) = string.substring(nrOfInitialCharsToRemove) = string.slice(nrOfInitialCharsToRemove)
	string.substr(-nrOfEndingCharsToKeep) = string.substring(-nrOfEndingCharsToKeep) = string.slice(-nrOfEndingCharsToKeep)
	string.slice(nrOfInitialCharsToRemove, -nrOfEndingCharsToRemove)

	// substr vs substring vs slice
	// One param:
	'ABCDE'.substr(1) === 'BCDE' // Remove initial
	'ABCDE'.substring(1) === 'BCDE'
	'ABCDE'.slice(1) === 'BCDE'

	'ABCDE'.substr(-1) === 'E' // Keep ending
	'ABCDE'.substring(-1) === 'ABCDE'
	'ABCDE'.slice(-1) === 'E'

	// Two params:
	'ABCDE'.substr(0, 2) === 'AB' // Keep initial
	'ABCDE'.substring(0, 2) === 'AB'
	'ABCDE'.slice(0, 2) === 'AB'

	'ABCDE'.substr(0, -1) === ''
	'ABCDE'.substring(0, -1) === ''
	'ABCDE'.slice(0, -1) === 'ABCD' // Remove ending

	'ABCDE'.substr(1, 2) === 'BC'
	'ABCDE'.substring(1, 2) === 'B'
	'ABCDE'.slice(1, 2) === 'B'

	'ABCDE'.substr(-1, 2) === 'E'
	'ABCDE'.substring(-1, 2) === 'AB'
	'ABCDE'.slice(-1, 2) === ''

	'ABCDE'.substr(1, -2) === ''
	'ABCDE'.substring(1, -2) === 'A'
	'ABCDE'.slice(1, -2) === 'BC'

	firstChars = bigString.substr(0, bigString.length - n)
	lastChars = bigString.substr(bigString.length - n) // or bigString.slice(n)

	upUntilString = bigString.substring(0, bigString.indexOf('_')) // up until '_'
	const upUntilStrings = (str, arrayOfStoppers, maxLength = 200) => str.substring(0, arrayOfStoppers.reduce((result, stopStr) => {
		const stopStrPos = Math.min(result, str.indexOf(stopStr))
		return stopStrPos > 0 ? stopStrPos : result
	}, maxLength))
	upUntilStringOrAll = (bigString.indexOf('_') !== -1) ? bigString.substring(0,bigString.indexOf('_')) : bigString
	upUntilLastString = bigString.substring(0, bigString.lastIndexOf('/'))
	fromStringToEnd1 = bigString.substring(bigString.indexOf('_')+1, bigString.length) // Note: first index of, can use lastIndexOf too
	fromStringToEnd1OrNone = (bigString.indexOf('_') !== -1) ? bigString.substring(bigString.indexOf('_')+1, bigString.length) : ''
	fromStringToEnd2 = bigString.split('_').pop() // only works if only one '_'

	fileExtension = filename.substring(filename.lastIndexOf('_')+1, filename.length)

	const stringMaxLength = (str, maxLength = 20) => (str && str.length > maxLength) ? str.substr(0, maxLength - 1) + '…' : str
	const getFirstSentence = str => str.replace(/[!?:;–]/g, '.').split('.')[0]

### Casing

- snake_case
- kebab-case
- camelCase
- PascalCase

	string.toLowerCase()
	string.toUpperCase()

	// See also _.capitalize and _.upperFirst
	const titleCase = str => str.replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())
	const titleCaseForced = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
	const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

	const toDash = str => str.replace(/([A-Z])/g, function ($1){return "-"+$1.toLowerCase()})

	// https://stackoverflow.com/a/2970667/449227
	const toCamelCase = (str) => str.replace(
	  /(?:^\w|[A-Z]|\b\w|\s+)/g,
	  (match, index) => (+match === 0)
	    ? '' // or if (/\s+/.test(match)) for white spaces
	    : (index === 0)
	      ? match.toLowerCase()
	      : match.toUpperCase())

	const snakeToCamel = str =>
		str.toLowerCase().replace(/([-_][a-z])/g, group =>
			group
				.toUpperCase()
				.replace('-', '')
				.replace('_', '')
		);
	const snakeToPascal = (str: string): string => str
    .split('_')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
    .join('')
	const snakeToKebab = (str: string): string => str.replace(/_/g, '-').toLowerCase()
	const camelToKebab = str => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
	const kebabToCamel = str => str.replace(/(-\w)/g, match => match[1].toUpperCase())

https://vladimir-ivanov.net/camelcase-to-snake_case-and-vice-versa-with-javascript/

	const snakeToCamel = str => str.replace(/(_\w)/g, match => match[1].toUpperCase())
	const camelToSnake = str => str.replace(/[\w]([A-Z0-9])/g, match => match[0] + '_' + match[1]).toLowerCase()

Slugs:

	const toSlug = str => str.trim().toLowerCase().replace(/ |_/g, '-').replace(/[^\w-]+/g, '')

	function toSlug (str, replaceInternationalChars = true) {
	  // Abort if not a proper string value
	  if (!str || typeof (str) !== 'string') { return str }
	  // For both
	  var newStr = str.trim()
	    .toLowerCase()
	    .replace(/ |_|\//g, '-') // space/underscore/slash to dash
	  // Remove ÅÄÖ etc?
	  if (replaceInternationalChars) {
	    newStr = newStr.replace(/[åäæâãáà]/g, 'a').replace(/[ëêéè]/g, 'e').replace(/[öøôõóò]/g, 'o').replace(/[üûúù]/g, 'u') // convert ÅÄÖÜ to Latin characters
	    newStr = newStr.replace(/[^\w-]+/g, '') // remove all other characters
	  } else {
	    newStr = newStr.replace(/[\t.,?;:‘’“”"'`!@#$€%^&§°*<>()[\]{}_+=/|\\]/g, '') // remove invalid characters but keep ÅÄÖ etc
	  }
	  // For both
	  newStr = newStr.replace(/---/g, '-') // fix for the ' - ' case
	    .replace(/--/g, '-') // fix for the '- ' case
	    .replace(/--/g, '-') // fix for the '- ' case
	  return newStr
	}

### Search/replace

	newStr = str.replace('Google', 'Weld')  // first only
	newStr = str.replace(/Google/g, 'Weld') // all - 'g' is the key
	// dynamic regex
	newStr = str.replace(new RegExp(variableToFind, 'g'), replaceText)
	// replace function (also: '$&' inserts the matched substring)
	newStr = str.replace(/([^\d]*)(\d*)([^\w]*)/, (match, p1, p2, p3, offset, string) => [p1, p2, p3].join(' - '))

- `$$`: Inserts a "$".
- `$&`: Inserts the matched substring.
- `$\``: Inserts the portion of the string that precedes the matched substring.
- `$'`: Inserts the portion of the string that follows the matched substring.
- `$n`: Where n is a positive integer less than 100, inserts the nth parenthesized submatch string, provided the first argument was a RegExp object. Note that this is 1-indexed.

	// replaceArray(['This is $1', 'Sparta'])
	const replaceArray = (array, str) => (str || array[0]).replace(/(\$\d)/gm, strId => array[parseInt(strId.slice(1))])

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
		if (!template) return template
	  let newString = template
	  const keys = Object.keys(stringsObj)
	  for (let k in keys) {
	    newString = newString.replace(new RegExp(`{${keys[k]}}`, 'g'), stringsObj[keys[k]])
	  }
	  return newString
	}

### Other

	// Strip HTML
	const stripHtmlTags = str => str.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '')

	string.split(separator, limit) -> array
	array.join(', ') -> string

	string.trim()
	parseInt(StringorNum)
	parseFloat(String)
	valueOf()

### Truncate/shorten string

	const truncate = (str, maxLength = 25) => (str.length > maxLength) ? str.substr(0, maxLength - 1) + '…' : str

### Sorting letters

	const shuffleString = (str) => shuffleArray(str.split('')).join('')
	const sortString = (str) => str.split('').sort().join('')

	const uniqueLetters = (str) => unique(str.toLowerCase().split('')).join('')
	const uniqueSortedLetters = (str) => sortString(uniqueLetters(str))

	const obfuscateString = (str, visible) => {
	  const showVisible = visible || Math.round(str.length / 3)
	  const positions = str.split('').map((char, index) => index)
	  const shuffledPositions = shuffleArray(positions).slice(showVisible)
	  const newString = str.split('').map((char, index) => shuffledPositions.includes(index) ? '•' : char).join('')
	  return newString
	}

	const vowelCount = (str) => unique(str.toLowerCase().split('')).reduce((result, char) => result + (VOWELS.includes(char) ? 1 : 0), 0)

### Contact info

	const anonymizeEmail = email => email.split('@').map((part, isDomain) => isDomain ? part : part[0] + new Array(part.length).join('•')).join('@')

### Regular Expressions in JavaScript / regex

	const regExp = /\w+\s?\*(\w+\s?\w+)/g
	const regExp = new RegExp('\w+', 'g')
	const regExpAsString = '\\w+\\s?\\*(\\w+\\s?\\w+)'

	// test: tests for a match in a string, returns true/false
	const isValid = regExp.test(str)
	// hex
	const isHexString = str => /[0-9A-Fa-f]{6}/g.test(str)

	// search: returns the position of the match or -1
	const index = str.search(regExp)

	// replace: replace a string
	const result = str.replace(regExp, newStr)
	const result = str.replace(new RegExp('\w+', 'g'), newStr)

	// match: executes a search for a match in a string, returns an array of information or null on a mismatch
	const regexpMatchArray = myString.match(/([a-z]*)/gi)

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
	var encodedString = window.btoa(string)
	// base64: Decode the String
	var decodedString = window.atob(encodedString)

	// URL encode
	encodeURIComponent('ÅÄÖ&') -> "%C3%85%C3%84%C3%96%26"
	decodeURIComponent('')

  // yarn add html-entities
	import { decode: decodeHtmlEntities } from 'html-entities'
	// const { decode: decodeHtmlEntities } = require('html-entities')
	decodeHtmlEntities('&quotKeywords by Site&quot')

	// yarn add striptags
	const striptags = require('striptags')
	striptags('Some text <b>and</b> text.')

	// yarn add string-strip-html
	const { stripHtml } = require('string-strip-html')
	stripHtml('Some text <b>and</b> text.').result

### Generate secret key

	require('crypto').randomBytes(48, function(err, buffer) { var token = buffer.toString('hex'); console.log(token); });

### Hash

	// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
	const cyrb53 = function (str, seed = 0) {
		let h1 = 0xdeadbeef ^ seed; let h2 = 0x41c6ce57 ^ seed
		for (let i = 0, ch; i < str.length; i++) {
			ch = str.charCodeAt(i)
			h1 = Math.imul(h1 ^ ch, 2654435761)
			h2 = Math.imul(h2 ^ ch, 1597334677)
		}
		h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
		h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
		return 4294967296 * (2097151 & h2) + (h1 >>> 0)
	}

	// https://stackoverflow.com/a/52171480/449227
	const hashCode = str => Array.from(str).reduce((result, char) => Math.imul(31, result) + char.charCodeAt(0), 0)

	const hashCode = str => {
	  let h
	  for (let i = 0; i < str.length; i++) {
	    h = Math.imul(31, h) + str.charCodeAt(i) | 0
	  }
	  return h
	}

	function generateShortHash(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char; // bitwise hash
			hash = hash & hash; // convert to 32-bit integer
		}
		return Math.abs(hash).toString(36); // convert to base36 for a shorter string
	}

## Arrays and Lists

http://www.w3schools.com/jsref/jsref_obj_array.asp

	let myCars = new Array() // regular array (add an optional integer)
	const justFloats = Array.from(new Float32Array(5))
	const itemList = Array.from(new Float32Array(5)).map((value, index) => `Item ${index + 1}`)

	const zeroPad = (count, str = '0') => Array(count).fill(str).join('')

	// TypeScript: const fillArray = (length: number, expression: (index: number) => any): any[] => [...Array(length)].map((_, index) => expression(index))
	const fillArray = (length, expression) => [...Array(length)].map((_, index) => expression?.(index))
	const fillMatrix = (columns, rows, expression) => [...Array(rows)].map((row, y) => [...Array(columns)].map((col, x) => expression ? (typeof expression === 'function' ? expression(x, y) : expression) : undefined))
	// fillMatrix previously called mapGrid
	const mapMatrix = (matrix, expression) => matrix.map((row, y) => row.map((value, x) => expression ? (typeof expression === 'function' ? expression(value, x, y) : expression) : undefined))

	myCars[0] = "Saab"  // argument to control array's size
	myCars[1] = "Volvo"
	myCars[2] = "BMW"

	myCars.length

	var lastElement = myCars[myCars.length - 1]
	pop() // get/remove last element
	shift()	// remove first element of an array, and returns that element

	// Clone array
	newArray = oldArray.slice()

	// Get part of array
	newArray = oldArray.slice(startIndex, endIndexPlusOne)

### Searching

	fruits.includes('Apple')
	fruits.indexOf('Apple') !== -1
	url.search(/api\/users\/(.+)/) !== -1

### Sorting and reversing

	var fruits = ["Banana", "Orange", "Apple", "Mango"]
	fruits.sort()
	array.sort((a, b) => a - b) // return 1, -1, or 0
	array.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

	array.reverse()
	newarray = array.slice().reverse()

### Randomize/shuffle array

	const nextInArray = ALL_VALUES[(ALL_VALUES.indexOf(currentValue) + 1) % ALL_VALUES.length]

	const shuffleArray = (array) => {
	  const shuffledArray = [...array]
	  let currentIndex = shuffledArray.length; let temporaryValue; let randomIndex
	  // While there remain elements to shuffle...
	  while (currentIndex !== 0) {
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex)
	    currentIndex -= 1
	    // And swap it with the current element.
	    temporaryValue = shuffledArray[currentIndex]
	    shuffledArray[currentIndex] = shuffledArray[randomIndex]
	    shuffledArray[randomIndex] = temporaryValue
	  }
	  return shuffledArray
	}

### Add

	newArray = [newItem, ...oldArray, newItem2]
	push() // add to end
	unshift() // add to beginning
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

	const firstThreeSummary = (array) => array.length ? array.slice(0, 3).map(item => item.name).join(', ') : ''

## Collections/hashes/objects

	Object.keys(myObject).length // ECMAScript 5 required

	Object.size = function (obj) {
		var size = 0, key
		for (key in obj) {
			// or Object.prototype.hasOwnProperty.call(obj, key)
			if (obj.hasOwnProperty(key)) size++
		}
		return size
	}

	const asObject = (stringOrObject) => ({
	  ...(typeof stringOrObject === 'object' && stringOrObject),
	  name: typeof stringOrObject === 'object' ? stringOrObject.name : stringOrObject,
	  value: typeof stringOrObject === 'object' ? stringOrObject.value : stringOrObject
	})

	// Deep search in a collection: see https://jsonpath.curiousconcept.com/
	const findInCollection = (collection, searchString, previousKeys = []) => {
	  const jsonPath = '$' + previousKeys.map(key => isNaN(key) ? `.${key}` : `[${key}]`).join('')
	  const allKeys = Object.keys(collection)
	  for (const key of allKeys) {
	    const dataValue = collection[key]
	    const wasFound = dataValue && JSON.stringify(dataValue).includes(searchString)
	    const dataPath = [...previousKeys, key]
	    if (wasFound) {
	      findInCollection(dataValue, searchString, dataPath)
	    } else if (previousKeys.length) {
	      console.log(`End of search: “${searchString}”:`, jsonPath)
	    }
	  }
	}

## JSON

	str = JSON.stringify(obj, null, 2) // value, replacerArrayOrFunction, spacer
	str = JSON.stringify(obj)
	obj = JSON.parse(str)

	const parseObject = obj => (typeof obj === 'string' && (obj.includes('{') || obj.includes('['))) ? JSON.parse(obj) : obj
	const stringifyObject = obj => typeof obj === 'object' ? JSON.stringify(obj) : obj.toString()

### JSON Schema

https://json-schema.org/

## Dates & Time

	Date.now() // = new Date().getTime()

	unixTimeStamp = Math.round(Date.now() / 1000)

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

	thisYear = new Date().getYear() + 1900

	// YYYYMMDD-HHMM
	const getDateTimeString = (date = new Date()) => {
		const year = date.getFullYear()
		const month = (`0${date.getMonth() + 1}`).slice(-2)
		const day = (`0${date.getDate()}`).slice(-2)
		const hours = (`0${date.getHours()}`).slice(-2)
		const minutes = (`0${date.getMinutes()}`).slice(-2)
		return `${year}${month}${day}-${hours}${minutes}`
	}

	const formatDate = (dateObj = new Date()) => `${dateObj.getFullYear()}-${`0${dateObj.getMonth() + 1}`.slice(-2)}-${`0${dateObj.getDate()}`.slice(-2)}`
	const formatTime = (dateObj = new Date()) => `${`0${dateObj.getHours()}`.slice(-2)}:${`0${dateObj.getMinutes()}`.slice(-2)}`
	const formatDateTime = (dateObj = new Date()) => `${dateObj.getFullYear()}-${`0${dateObj.getMonth() + 1}`.slice(-2)}-${`0${dateObj.getDate()}`.slice(-2)} ${`0${dateObj.getHours()}`.slice(-2)}:${`0${dateObj.getMinutes()}`.slice(-2)}`

	/** Timestamp e.g. '20241012-1308-4d5j' */
	const formatTimestamp = (dateObj = new Date()) => `${dateObj.getFullYear()}${`0${dateObj.getMonth() + 1}`.slice(-2)}${`0${dateObj.getDate()}`.slice(-2)}-${`0${dateObj.getHours()}`.slice(-2)}${`0${dateObj.getMinutes()}`.slice(-2)}-${Math.random().toString(36).substring(2, 6)}`

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

	const formatSqlDate = (new Date(date)).toISOString().slice(0, 19).replace('T', ' ')

	// Compare dates
	const diffInMillisecs = (oldDate, newDate = new Date()) => newDate - oldDate
	const diffInDays = (oldDate, newDate = new Date()) => (newDate - oldDate) / (24 * 60 * 60 * 1000)

	// Add to date
	const futureDate = (days = 7, startDate = new Date()) => new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000)
	const oneYearFromNow = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)

	// Calculate difference between dates
	const daysBetweenDates = (date1, date2 = new Date()) => (date2.getTime() - date1.getTime()) / (24*60*60*1000)

	// Timestamp in milliseconds
	new Date().getTime() => 1390569315900
	var dateFromMillisecs = new Date(milliseconds)

	// UTC Timestamp
	Math.round((new Date()).getTime() / 1000)

	// Date where hours/minutes/seconds are removed
	const todaysDateNoTime = new Date(Math.round((new Date()).getTime() / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24))

### Times in seconds/milliseconds

- 1 year in milliseconds: 365 * 24 * 60 * 60 * 1000 = 31536000000
- 1 year in seconds: 365 * 24 * 60 * 60 = 31536000
- 1 month in seconds: 30 * 24 * 60 * 60 = 2592000
- 1 week in seconds: 7 * 24 * 60 * 60 = 604800
- 1 day in seconds: 24 * 60 * 60 = 86400
- 1 hour in seconds: 60 * 60 = 3600

### dayjs

Use dayjs instead (smaller):

	import dayjs from 'dayjs'
	dayjs(myDate).format('YYYY-MM-DD')
	dayjs(myDate).format('HH:mm')
	dayjs(myDate).format('ddd, YYYY-MM-DD HH:mm:ss')
	dayjs().subtract(2, 'day').getDate()
	dayjs().diff('2018-06-05', 'day')

	dayjs('2019-01-25').unix() // Unix seconds 1548381600
	dayjs('2019-01-25').valueOf() // Unix milliseconds 1548381600000

Relative date:

	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime'
	dayjs.extend(relativeTime)
	dayjs(myDate).fromNow()

Helper functions:

	const formatReadableDate = (dateObj) => dayjs(dateObj).format('MMM D')

### Moment.js

	import moment from 'moment'

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
	moment().format('YYYYMMDDHHmm') // e.g. slug


## Timers

Wait, Sleep etc

	// do once
	setTimeout(doInOneSecond, 1000)
	setTimeout(doInOneSecond, 1000, param1, param2)
	setTimeout(() => console.log('setTimeout'), 1000)

	// async
	await new Promise((resolve) => setTimeout(resolve, 3000)) // sleep 3 seconds
	const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

	// Repeat
	setInterval(doEverySecond, 1000)
	setInterval(doEverySecond, 1000, param1, param2)

	const timerId = setInterval(function () { console.log('setInterval') }, 1000)
	// Stop timer
	clearInterval(timerId)

	var doWithTimeoutIfNeeded = function (func, expression) {
		expression ? setTimeout(func) : func()
	}

	animationFrameId = requestAnimationFrame(doInNextFrame)

## Images

	async function checkIfImageLoads (imageSrc: string): Promise<boolean> {
		return await new Promise((resolve) => {
			const img = new Image()
			img.onload = () => resolve(true)
			img.onerror = () => resolve(false)
			img.src = imageSrc
		})
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


## Sound

	<audio id="sound_pop" src="/assets/pop.mp3" preload="auto"></audio>

	document.getElementById('sound_pop').play()


## Local Storage, Session Storage, and Cookies

sessionStorage vs localStorage: sessionStorage is cleared when the page session ends

	// Save data to localStorage
	window.localStorage.setItem('key', 'string')

	// Get saved data from localStorage
	let data = window.localStorage.getItem('key')

	// Remove saved data from localStorage
	window.localStorage.removeItem('key')

	// Remove all saved data from localStorage
	window.localStorage.clear()

> “Stormpath recommends that you store your JWT in cookies for web applications, because of the additional security they provide, and the simplicity of protecting against CSRF with modern web frameworks. HTML5 Web Storage is vulnerable to XSS, has a larger attack surface area, and can impact all application users on a successful attack.”
– https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage

### Cookies in JS

	window.document.cookie // get all
	window.document.cookie = `key=value` // set one
	window.document.cookie = `key=value;max-age=` + (60 * 60 * 24 * 365) // one year

	const getAllCookies = () => window.document.cookie.split('; ').reduce((result, str) => {
	  const keyValue = str.split('=')
	  result[keyValue[0]] = keyValue[1]
	  return result
	}, {})

	const getCookie = (name, defaultValue) => getAllCookies()[name] || defaultValue

	const setCookie = (name, value, options = { maxAge: 365*24*60*60 }) => {
	  window.document.cookie = `${name}=${JSON.stringify(value)}${options.maxAge ? `;max-age=${options.maxAge}` : ''}`
	}

	const deleteCookie = (name) => setCookie(name, '', { maxAge: 0 })

### js-cookie

	import Cookies from 'js-cookie'

	Cookies.get(COOKIE_NAME)
	const inOneWeek = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
	Cookies.set(COOKIE_NAME, user, { expires: inOneWeek })
	Cookies.remove(COOKIE_NAME)


## Pure Javascript (no framework)

	document.querySelectorAll('#mylink img') // all
	document.querySelector('#mylink img') // only FIRST
	document.getElementsByTagName('div') // returns array
	document.getElementsByClassName('myClass') // returns array
	document.getElementById('myButton')  // returns ONE. Note: can't be chained
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
	element.appendChild
	item.replaceChild(newNode, container.childNodes[0])
	container.removeChild(container.childNodes[0])

	// Simple scraper:
	document.querySelectorAll('.my-class > a').forEach(e => console.log(e.innerText, e.getAttribute('href')))
	// Format multiple
	document.querySelectorAll('.my-class img').forEach(e => e.style.border = '1px solid red')

  function toggleClass (event, className) {
    const { target } = event
    const classStr = ' ' + className
    target.className = target.className.includes(classStr) ? target.className.replace(classStr, '') : target.className + classStr
  }

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

### createElement

	function createElement (elementType, props, children) {
		const element = document.createElement(elementType)
		for (const prop in props) {
			if (prop === 'style') {
				Object.keys(props.style).forEach(function (styleName) { element.style[styleName] = props.style[styleName] })
			} else if (prop.includes('data-')) {
				element.setAttribute(prop, props[prop])
			} else if (props[prop] !== null) {
				element[prop] = props[prop]
			}
		}
		if (children) {
			children.forEach(function (node) { element.appendChild(node) })
		}
		return element
	}

### Events

	<button onClick="myFunction()">Click me</button>

	window.myFunction = function () {
		alert('Hello World')
	}

	document.getElementById('myButton').addEventListener('click', function (event) {
		console.log('Click!', event, this)
	})
  document.querySelectorAll('.tag').forEach(element => element.addEventListener('click', function (event) {
    console.log('Click!', event, this)
  }))

	element.dispatchEvent(new Event('change'))
	element.addEventListener('change', myFunction)
	element.removeEventListener('change', myFunction) // no myFunction = remove all

#### Page events

Loading a page, in order:

1. readystatechange
2. load
3. pageshow

Back button:

1. popstate

MutationObserver (for SPA’s):

	const observer = new MutationObserver((mutationsList, observer) => {
		for (const mutation of mutationsList) {
			console.log('mutation:', mutation.type, mutation.target)
		}
	})
	observer.observe(document.querySelector('body'), { childList: true, subtree: true, attributes: true })
	// When done:
	observer.disconnect()

#### preventDefault vs. stopPropagation

	event.preventDefault() // prevents the default action the browser makes on that event.
	event.stopPropagation() // stops the event from bubbling up the event chain.
	event.stopImmediatePropagation() // plus other event handlers

#### Mouse events

Use `mouseenter`/`mouseleave` instead of `mouseover`/`mouseexit` (`mouseover` = trigger on childs)

#### Touch events: touchstart/touchmove/touchend

	// Get X/Y position from mouse or touch
	const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event

Tip: event handlers on `document` for move/end:

	window.document.addEventListener('mousemove', listeners.move)
	window.document.addEventListener('mouseup', listeners.end)

#### Media queries

	const mediaQueryTablet = window.matchMedia('(max-width: 600px)')
	mediaQueryTablet.addListener(event => {
		event.matches && console.log('tablet')
	})

	// Short:
  window.matchMedia('(max-width: 969px) and (min-width: 524px)')
  	.addListener(e => e.matches && console.log('tablet'))

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
	if (typeof window !== 'undefined') {
		// Do in-browser stuff
	}

	// Short version
	(typeof window !== 'undefined') && ...

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

	const domain = await window.fetch(url).then(res => res.json()) // or text(), blob(), arrayBuffer(), formData()

	const userResponse = await window.fetch(userUrl)
	const userJson = await userResponse.json() // or text(), blob(), arrayBuffer(), formData()

	await window.fetch(`${config.appUrl}api/domains`, {
		method: 'POST',
		mode: 'no-cors', // or Access-Control-Allow-Origin: *
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
		.then(async (res) => {
			if (!res.ok) {
				const json = await res.json()
				throw new Error(json.message || res.statusText)
			}
			return res.json()
		})

Axios: similar but URL is part of object

#### makeRestRequest

    const makeRestRequest = async (method = 'GET', url, data) => window.fetch(url, {
      method,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: data && JSON.stringify(data)
    })
      .then(async (res) => {
        if (!res.ok) {
          const json = await res.json()
          throw new Error(json.message || res.statusText)
        }
        return res.json()
      })

    export default makeRestRequest

### DOM / IFrame

	var newIframe = document.createElement('iframe')
	newIframe.src = 'about:blank'
	document.body.appendChild(newIframe)

	element.appendChild(document.createElement('p'))

### Windows & Frames

Open window:

	window.open(url) // new tab; will ask browser for permission
	window.open(URL, name, specs, replaceUrlInHistory)
	window.open(pageURL, 'ts_window', 'width=300,height=600,scrollbars=no,titlebar=no,location=no,menubar=no,toolbar=no,status=no,resizable=no', false)

	window.close()

### History

	window.location:

- href: "http://localhost:3301/accounts/create?wow=1#isahash"
- pathname: "/accounts/create"
- search: "?wow=1"
- hash: "#isahash"
- hostname: "localhost"
- host: "localhost:3301"
- protocol: "http:"
- origin: "http://localhost:3301"
- port: "3301"

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

Get all field values from form, 1 line:

	let form = document.forms[0]; let formValues = {}; for (let i = 0; i < form.elements.length; i++) { let element = form.elements[i]; if (element.name) formValues[element.name] = element.value; }; console.log(formValues);

Full version:

	let form = document.forms[0];
	let formValues = {};
	for (let i = 0; i < form.elements.length; i++) {
		let element = form.elements[i];
		if (element.name) formValues[element.name] = element.value;
	}
	console.log(formValues);

## Web Workers / Service Workers

|              | Web Workers  | Service Workers  |
|--------------|--------------|------------------|
| Instances    | Many per tab | One for all tabs |
| Lifespan     | Same as tab  | Independent      |
| Intended use | Parallelism  | Offline support  |

### Web Workers

https://github.com/tomsoderlund/minimalistic-web-workers

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

### Service Workers

	// From service-worker.js:
	const broadcastChannel = new BroadcastChannel('sw-messages')
	broadcastChannel.postMessage({ title: 'Hello from Service Worker' })

	// From your client pages:
	const broadcastChannel = new BroadcastChannel('sw-messages')
	broadcastChannel.addEventListener('message', event => console.log('Received', event.data))


## ECMAScript ES5/ES6

### ES5

https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/

### ES6

https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f

	// let and const instead of var (block scoped within {})
	let x = 1
	const Y = 1

	// let with multi-assign - destructured assignment (not deconstructing)
	let [one, two] = [1, 2]
	let {three, four} = {three: 3, four: 4}
	const { education: { degree: asNamedDegree } } = user
	// With both renaming AND default values
	const { account: accountId = null, team: teamId = null } = teamData
	console.log(asNamedDegree) // prints: Masters

	// Remove a property:
	const { children, ...propsWithoutChildren } = props

	// Default values
	function ParallelPool ({ idleTimeoutMillis = 30000 } = {}) {...}

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

Promise.all/race:

  const users = await Promise.all(userIds.map(userId => getUser(userId)))

  const usersPromises = userIds.map(userId => getUser(userId))
  const users = await Promise.all(usersPromises)

	Promise.all(promiseArrayOrObject)
		.then(...)
	Promise.race(promiseArrayOrObject)
		.then(...)

	Promise.resolve(value)
	Promise.reject(err)

	async/await
	The await keyword can only be used inside functions defined with 'async'.
	(_Can_ use .then() but shouldn’t)

	let [items, contactlist, itemgroup] = await Promise.all([
		window.fetch('http://localhost:3000/items/get'),
		window.fetch('http://localhost:3000/contactlist/get'),
		window.fetch('http://localhost:3000/itemgroup/get')
	])

Promise with timeout:

	// https://italonascimento.github.io/applying-a-timeout-to-your-promises/
	const promiseTimeout = function (milliseconds, promise) {
	  // Create a promise that rejects in specified milliseconds
	  const timeoutPromise = new Promise((resolve, reject) => {
	    const id = setTimeout(() => {
	      clearTimeout(id)
	      reject(new Error(`Timed out after ${milliseconds} milliseconds.`))
	    }, milliseconds)
	  })
	  // Returns a race between our timeout and the passed in promise
	  return Promise.race([promise, timeoutPromise])
	}

### Lodash in ES6 ("lodash6")

https://www.sitepoint.com/lodash-features-replace-es6/

	[1, 2, 3].forEach((n, index) => console.log(n))
	[1, 2, 3].map((n, index) => n * 3)
	[1, 2, 3].reduce((result, n) => result + n, 0)
	[1, 2, 3].filter((n, index, array) => n < 2) // return all matches
	[1, 2, 3].find((n, index, array) => n < 2) // return one (first) match
	[1, 2, 3].every((n, index, array) => n < 2) // true if all matches
	[1, 2, 3].some((n, index, array) => n < 2) // true if some matches
	array.sort((a, b) => parseFloat(a.property) - parseFloat(b.property))
	const sortByNumberAscending = (array, property) => array.sort((a, b) => parseFloat(a[property]) - parseFloat(b[property]))
	const sortByNumberDescending = (array, property) => array.sort((a, b) => parseFloat(b[property]) - parseFloat(a[property]))
	const sortByString = (array, property, descending = false) => descending
		? array.sort((a, b) => (a[property].toLowerCase() < b[property].toLowerCase()) ? 1 : ((a[property].toLowerCase() > b[property].toLowerCase()) ? -1 : 0))
		: array.sort((a, b) => (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : ((a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0))
	const sortByStringAscending = (array, property) => array.sort((a, b) => (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : ((a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0))
	const sortByStringDescending = (array, property) => array.sort((a, b) => (a[property].toLowerCase() < b[property].toLowerCase()) ? 1 : ((a[property].toLowerCase() > b[property].toLowerCase()) ? -1 : 0))

	Object.keys(obj)
	Object.values(obj)

	// Object forEach
	Object.keys(objects).forEach(objectId => {})

	// empty
	const empty = (obj) => obj && Object.keys(obj).length === 0 && obj.constructor === Object

	// Conditional/optional destructure/unpack object/array elements
	const obj = {
		a: 1,
		...(true && { b: 2 }),
		...(true ? [1,2,3] : [])
	}

	// Optional chaining
	const value = a?.[b]?.['myKey']?.c
	(event) => handleInputChange?.(event)

	// unique
	const unique = (values) => values.filter((value, index, array) => array.indexOf(value) === index)
	const uniqueBy = (values, propertyName) => values.reduce((res, item) => {
	  const exists = res.some((t) => (t[propertyName] === item[propertyName]))
	  if (!exists) res.push(item)
	  return res
	}, [])
	const uniqueByFunction = (values, selector = (item) => item) => {
		const map = new Map()
		values.forEach((item) => {
			const prop = selector(item)
			if (!map.has(prop)) map.set(prop, item)
		})
		return [...map.values()]
	}
	// compact
	export const removeUndefined = (values) => values.filter(value => value !== undefined)

	// Get keys and values
	Object.keys(collection).map(key => [key, collection[key]])
	
	// mapObject(collection, (object, key) => console.log(key, object))
	const mapObject = (object, mapFunction) => Object.keys(object).reduce((result, key) => ({ ...result, [key]: mapFunction(object[key], key) }), {})

	const removeUndefinedKeys = (collection) => Object.keys(collection).reduce((result, key) => (
		![undefined, null].includes(collection[key])
			? { ...result, [key]: collection[key] }
			: result
	), {})

	function removeUndefinedProps<T> (obj: T): Partial<T> {
		const result: Partial<T> = {} // Create a new object to hold the result
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				// Check if the property exists in the original object
				const value = obj[key]
				if (value !== undefined) {
					result[key] = value
				}
			}
		}
		return result
	}

	function removeUndefinedOrNullProps<T> (obj: T): Partial<T> {
		const result: Partial<T> = {} // Create a new object to hold the result
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				// Check if the property exists in the original object
				const value = obj[key]
				if (value !== undefined && value !== null) {
					result[key] = value
				}
			}
		}
		return result
	}


	// flatten
	array.flat()

	const isEmpty = (value: any): boolean => (
		value === null
		|| value === undefined
		|| (typeof value === 'object' && Object.keys(value).length === 0)
		|| (typeof value === 'string' && value.trim().length === 0)
	)

	// head/tail
	const [head, ...tail] = [1, 2, 3]
	const [last, ...initial] = [1, 2, 3].reverse()
	const [firstLetter, ...restOfLetters] = 'ABCDE'

	// assign/merge
	Object.assign(target, ...sources) // returns target
	copy = Object.assign({}, o1) // shallow clone of o1
	Object.assign({}, o1, o2) // safe inheritance
	const merged = {...obj1, ...obj2}

	// mergeEmpty
	type ValueOrNullOrUndefined = string | number | boolean | object | null | undefined
	type CollectionOfValueOrNullOrUndefined = Record<string, ValueOrNullOrUndefined>
	type OptionalCollectionOfValueOrNullOrUndefined = CollectionOfValueOrNullOrUndefined | undefined

	export default function mergeEmpty (...objects: OptionalCollectionOfValueOrNullOrUndefined[]): CollectionOfValueOrNullOrUndefined {
		const allKeys = unique(
			objects.reduce((keysResult: string[], object: OptionalCollectionOfValueOrNullOrUndefined) => {
				return [...keysResult, ...Object.keys(object ?? {})]
			}, [])
		)
		return allKeys.reduce((objectResult, key) => {
			const lastRealValue = objects.reduce((valueResult: ValueOrNullOrUndefined, object: OptionalCollectionOfValueOrNullOrUndefined) => {
				return (object?.[key] !== undefined && object?.[key] !== null && object?.[key] !== '') ? object?.[key] : valueResult
			}, undefined)
			return { ...objectResult, [key]: lastRealValue }
		}, {})
	}

	// pick
	const { a, c } = abcObject
	abcArray.map(({ a, c }) => ({ a, c }))
	const keyToRemove = 'mykey'
	const { [keyToRemove]: 0, ...newState } = state

	get/set: no matching ES6

	const get = (obj, key, defaultValue) => (obj && Object.prototype.hasOwnProperty.call(obj, key)) ? obj[key] : defaultValue

	/* Implementation of lodash.get function: https://gist.github.com/harish2704/d0ee530e6ee75bad6fd30c98e5ad9dab */
	function get (object, keys, defaultVal) {
	  keys = Array.isArray(keys) ? keys : keys.split('.')
	  object = object[keys[0]]
	  if (object && keys.length > 1) {
	    const newObject = get(object, keys.slice(1))
	    return newObject === undefined ? defaultVal : newObject
	  }
	  return object === undefined ? defaultVal : object
	}

	/* Implementation of lodash.set function */
	function set (object, keys, val) {
	  keys = Array.isArray(keys) ? keys : keys.split('.')
	  if (keys.length > 1) {
	    object[keys[0]] = object[keys[0]] || {}
	    return set(object[keys[0]], keys.slice(1), val)
	  }
	  object[keys[0]] = val
	}

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

	// queryObjectFromString / queryObjectToString

	// Node.js: use URLSearchParams, not querystring
	(new URLSearchParams(searchParams)).toString() // param1=A&param2=B
	new URLSearchParams(window.search.substr(1))

	const queryObjectFromString = url => (url.split('?')[1] || url || '')
		.split('&')
		.reduce((result, propValue) => {
			if (propValue !== '') result[propValue.split('=')[0]] = decodeURIComponent(propValue.split('=')[1])
			return result
		}, {})

	const queryObjectToString = queryObject => Object.keys(queryObject).reduce((result, key) => (queryObject[key] === undefined) ? result : result + (result.length ? '&' : '?') + key + '=' + queryObject[key], '')
	const queryObjectToStringIncludingUndefined = queryObject => Object.keys(queryObject).reduce((result, key) => result + (result.length ? '&' : '?') + key + '=' + queryObject[key], '')
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

	// applyToAll(obj1, func) or applyToAll([obj1, obj2, ...], func)
	export function applyToAll<T1, T2>(objectOrArray: T1 | T1[], func: (item: T1) => T2): T2 | T2[] {
		return Array.isArray(objectOrArray) ? objectOrArray.map(func) : func(objectOrArray);
	}
	// asArray(obj1) or asArray([obj1, obj2, ...])
	export function asArray<T>(objectOrArray: T | T[]) {
		return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
	}

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

	// includesSome (NOT pickAny/includesAny/hasAny/hasSome)
	// includesSome(url, ['localhost', 'staging'])
	// incl = includesSome(array1, array2).length > 0
  const includesSome = (array1, array2) => array2.filter(childObj => array1.includes(childObj))
  const includesSomeString = (longString, stringArray) => stringArray.reduce((result, smallString) => result || longString.includes(smallString), false)
  const startsWithSome = (collection1, collection2) => collection2load(childObj => collection1.startsWith(childObj))
  module.exports.includesSome = (collection1, collection2) => _.filter(collection2, childObj => _.includes(collection1, childObj))
  _.mixin({ 'includesSome': module.exports.includesSome })

	// allHaveValues(array): opposite of isEmpty
	function allHaveValues (array: any[]): boolean {
		return array.reduce((result: boolean, value: any) => result && (value !== undefined && value !== null && value !== ''), true)
	}

	var doWhen = function (func, expressionFunc, failFunc, iterations) {
		iterations = iterations || 0
		failFunc = failFunc || function () { console.error('doWhen timed out') }
		iterations >= 100
			? failFunc()
			: expressionFunc()
				? func()
				: window.setTimeout(doWhen.bind(undefined, func, expressionFunc, failFunc, iterations + 1), 10)
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
	const myFunctionDebounced = _.debounce(myFunction, timeInMs, { leading: false, trailing: true, maxWait: X })
	// throttle: ignores repeated calls that happens within timeInMs limit (“train leaves each timeInMs no matter what”)
	const myFunctionThrottled = _.throttle(myFunction, timeInMs, { leading: true, trailing: true })

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

## TinyColor

	yarn add tinycolor2

	import tinycolor from 'tinycolor2'

then:

	tinycolor(colorStr).toHexString()

	tinycolor.mix(colorStr, '#fff', percent).toHexString()
	lighten(0-100), darken(0-100), (brighten(0-100))

	const isDark = (color) => tinycolor(color).isDark()
	const contrastColor = (color) => (tinycolor(color).getBrightness() > 128) ? 'black' : 'white'

- isLight
- isDark
- getBrightness (0-255)
- getLuminance
- getAlpha
- setAlpha
- toHsl: { h, s, l, a }
- toHslString
- toHsv: { h, s, v, a }
- toHsvString
- toRgb
- toRgbString
- toPercentageRgb
- toPercentageRgbString
- toHex
- toHexString
- toHex8
- toHex8String
- toName

Color Modification

- darken(0-100)
- lighten(0-100)
- brighten(0-100)
- desaturate(0-100)
- saturate(0-100)
- greyscale()
- spin(0-360)

Color Combinations

- spin(0-360)
- analogous(, results = 6, slices = 30)
- complement
- splitcomplement
- monochromatic(, results = 6)
- triad
- tetrad
- random

Readability

- readability(c1, c2)
- isReadable


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

## RxJS

https://www.learnrxjs.io/

- Observable
- Subject: Observable that you can inject a new value in
- BehaviorSubject: Subject that remember the old value
- ReplaySubject: Subject with history of previous values
- pipe: 
- from: create Observable from a Promise
- of: create Observable from value
- Observable.value: get current value
- Observable.next: set the new value
- exhaustMap: like map but returns an Observable


## Immutable.js

https://immutable-js.github.io/immutable-js/docs/

- get(keyOrIndex)
- getIn(arrayPath)
- set(keyOrIndex, value)
- setIn(arrayPath, value)
- updateIn(arrayPath, value => { return value })

	  immutableCollection
	    .map(screen => ({
	      label: screen.get('name'),
	      value: screen.get('id')
	    }))
	    .toSet()
	    .toArray()


## Documentation - JSDoc

http://usejsdoc.org

	/** This is a description of the foo function. */
	function foo() {
	}

	/**
	 * A class representing a book.
	 * @constructor
	 * @param {string} title The title of the book.
	 * @param {Array<string>|Array<number>} authors A list of authors or author ID’s.
	 * @returns {Object<string, any>} The new Book object
	 * @throws {DivideByZero} Argument authors can’t be an empty list.
	 */
	function Book(title, authors) {
	}

Type:

	/**
	* @typedef {Object} User
	* @property {string} name - The user's name.
	* @property {string} email - The user's email.
	*/

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

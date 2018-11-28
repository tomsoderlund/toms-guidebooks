# Testing and QA


## TDD / BDD behavior-driven development

http://jrsinclair.com/articles/2016/gentle-introduction-to-javascript-tdd-intro/

1. Red: Write a test and make sure it fails.
2. Green: Write the simplest, easiest possible code to make the test pass.
3. Refactor: Optimise and/or simplify the application code, making sure that all the tests still pass.


## Unit testing

* Jasmine: no dependencies. Server unit testing etc.
* Karma: client unit testing
* Mocha: test framework running on Node.js and in the browser, https://mochajs.org
* Chai: a BDD/TDD *assertion* library for node and the browser that can be paired with any javascript testing framework.

https://www.smashingmagazine.com/2014/10/introduction-to-unit-testing-in-angularjs/


## Karma / Jasmine

describe('Test Suite Name', function () {
	it('should do something', function() {
		expect(receivedValue).toEqual('expected value');
	});
});

.toBe()
.toBeCloseTo()
.toBeDefined()
.toEqual()
spyOn(obj, 'method') // assumes obj.method is a function // How to spy on a method?
spyOn(obj, 'method').andCallThrough() // (and.callThrough() in Jasmine 2) How to have spied method also calls through to the real function?
spyOn(obj, 'method').andReturn('Pow!') // and.returnValue(value) // How do I fix the return value of a spy?
expect(obj.method).toHaveBeenCalled() // How to verify it was called?
expect(obj.method).toHaveBeenCalledWith('foo', 'bar') // How to verify it was called with specific arguments?
obj.method.callCount // How many times was it called?
obj.method.mostRecentCall.args // What were the arguments to the last call?
obj.method.reset() // How to reset all the calls made to the spy so far?
obj.method.argsForCall // How to get all arguments for all calls that have been made to the spy? (this is an array)

var dummy = jasmine.createSpy('dummy') // How to make a standalone spy function?
$('button#mybutton').click(dummy)


## Protractor testing

https://angular.github.io/protractor

grunt protractor:dev
grunt protractor-reload

# Find Selenium:
node_modules/protractor/bin/webdriver-manager update


## Ghost Inspector

# Execute Ghost Inspector suite via API and store results in JSON file
curl "https://api.ghostinspector.com/v1/suites/$GHOST_SUITE_CUSTOMER_PROJECTS/execute/?apiKey=$GHOST_API_KEY" > ghostinspector.json
# Check JSON results for failing tests
if [ $(grep -c '"code":"SUCCESS"' ghostinspector.json) -ne 0 ]; then cat ghostinspector.json; else cat ghostinspector.json; false; fi

--------

// Extract from JavaScript: Extract newElementId from last element drawn
var elementType = 'weld-custom-element';
var lastElementOfThatType = document.getElementsByClassName(elementType)[document.getElementsByClassName(elementType).length - 1];
return lastElementOfThatType.id;

Variable name: newElementId

// JavaScript returns true: Assert color is gray
//var correctColor = 'rgb(169, 169, 169)'; // standard gray
var correctColor = 'rgb(71, 226, 161)'; // green
var elementSelector = 'a.weld-element.weld-container.weld-rectangle';
var currentColor = $(elementSelector).css('background-color');
var hasCorrectColor = (currentColor === correctColor);
console.log('Color correct?', hasCorrectColor, currentColor);
return hasCorrectColor;

// Assert object has moved (step 1) - save object's old position
var elementSelector = 'a.weld-element.weld-container.weld-rectangle';
var $element = $(elementSelector);
var oldPosition = parseFloat($element.css('left'));
console.log('oldPosition', oldPosition, $element.css('left'), $element[0]);
return oldPosition;

// JavaScript returns true: Assert object has moved (step 2)
var elementSelector = 'a.weld-element.weld-container.weld-rectangle';
var $element = $(elementSelector);
var oldPosition = {{oldPosition}};
var newPosition = parseFloat($element.css('left'));
var objectHasMoved = (newPosition > oldPosition);
//console.log('objectHasMoved', objectHasMoved, newPosition, oldPosition);
return objectHasMoved;

// JavaScript returns true: Assert Image URL
var GHOST_INSPECTOR_FILENAME = 'fef35046';
var newElement = document.getElementById('{{newElementId}}');
var styleStr = newElement.getElementsByClassName('apply-styles')[0].getAttribute('style');
var hasCorrectImageUrl = (styleStr.indexOf(GHOST_INSPECTOR_FILENAME) !== -1);
return hasCorrectImageUrl;




// JavaScript returns true: Assert color is #aabbcc
var correctColor = 'rgb(71, 226, 161)'; // aabbcc
var elementSelector = '.weld-custom-element form input[type="submit"]';
var currentColor = $(elementSelector).css('background-color');
var hasCorrectColor = (currentColor === correctColor);
console.log('Color correct?', hasCorrectColor, currentColor);
return hasCorrectColor;


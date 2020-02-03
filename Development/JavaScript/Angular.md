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

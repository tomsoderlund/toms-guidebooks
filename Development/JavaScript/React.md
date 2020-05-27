# React and Redux

- @zeit/next-bundle-analyzer
- terser-webpack-plugin

## React

- React is just the View layer. **Flux** (incl. **Redux**) is the Model layer.
- **Relay** is an alternative data layer using GraphQL.
- React is more than front-end web; can be used to generate all sorts of views: DOM, HTML, native apps etc.
- React Native generates real native code.
- React supports isomorphic/universal apps: code on both server and client. User downloads rendered HTML, is then activated client-side.
- React can co-exist with other frameworks.
- React components combine controller + view in the same file.
- It’s recommended to use JSX (HTML in JS code) with React.
- Data: `this.props` is static data, `this.state` is dynamic - keep it minimal.
- Unidirectional data flow is encouraged.
- A React component is just an object, and can be passed as props.

## Redux

- One **Store** holds the entire **State** tree of your application. State is immutable. Create with `createStore(reducer, initialState, enhancer)`. Get the State with `getState()`.
- **Actions** change the state e.g. `{ type: 'CREATE_TODO' }`, where `type` is the only required property. Use `Store.dispatch(action)` to trigger a state change.
- A **Reducer** is just a _pure function*_ that takes State + Action and returns new State, e.g: `function todoReducer(state, action) {}`.  
*Pure function = no side effects, doesn’t modify arguments.
- Use one Store, but separate Reducers for each data model. One **Root Reducer** combines all the other reducers with `combineReducers()`.
- **Middleware** is a way to extend Redux. Use `applyMiddleware(...middleware)` ([returns a function](https://redux.js.org/docs/api/applyMiddleware.html#returns)). Each middleware receives Store’s `dispatch` and `getState` functions as named arguments, and returns a function.
- `redux-thunk` lets the action creators invert control by dispatching functions. They would receive `dispatch` and may call it asynchronously. Such functions are called **Thunks**.
- `react-redux` binds Redux to React components: `connectedTodoItem = connect(mapStateToProps, mapDispatchToProps)(TodoItem)`. **Provider** is the higher-order component provided by React Redux that lets you bind Redux to React.
- Redux’ State has nothing to do with React’s `this.state`.

https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f

https://egghead.io/courses/getting-started-with-redux

https://medium.com/@maxlynch/redux-is-the-pivotal-frontend-innovation-a406736552cb

### create-react-app

https://github.com/facebookincubator/create-react-app

    yarn create react-app my-app  # or npx create-react-app my-app, or npm init create-react-app my-app
    cd my-app
    yarn start

Removing non-necessary files:

    rm public/favicon.ico
    rm public/logo192.png
    rm public/logo512.png
    rm src/logo.svg
    rm src/App.css  # or index.css
    mkdir src/components
    mkdir src/pages

    # Optional:
    rm src/App.test.js
    rm src/serviceWorker.js
    rm src/setupTests.js
    git mv src/App.js src/pages/Start.js
    git mv src/App.css src/pages/Start.css

Adding nice extras:

    yarn add standard --dev
    yarn add react-router-dom
    yarn add styled-components

    "dev": "PORT=3123 react-scripts start",
    "test": "echo 'Running Standard.js and Jasmine unit tests...\n' && yarn lint && yarn unit",
    "lint": "standard",
    "fix": "standard --fix",
    "unit": "jasmine"

### Components with JSX

Comparison:

  // 1. Functional component: compact with arrow function - you can remove {return} for even more compact:
  const MyFunctionalComponent = ({ prop1 }) => {
    return (
      <div>
          <h2>About {prop1}</h2>
        </div>
    )
  }
  export default MyFunctionalComponent

  // 2. Class component: class/extends with state etc
  export default class MyClassComponent extends React.Component {

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

  React.createElement(typeFunctionOrString, props, children)

Examples:

  React.createElement('div', { styles: 'color: red' }, `Hello ${this.props.toWhat}`)
  React.createElement(Rectangle, { className: 'apply-styles' }, children)

#### All props

  <Button {...props} />

#### Clone children - add props to children

  const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(child, { myProp1, myProp2 }))

  // Only 1 child
  React.cloneElement(child, { myProp1, myProp2 })

### React Hooks

https://reactjs.org/docs/hooks-overview.html

- `useEffect(fn, [deps])`: instead of componentDidMount. Empty deps = fire once, otherwise when deps change.
- `useCallback(fn, [deps])`: returns a memoized version of the callback that only changes if one of the dependencies has changed. Use to prevent this passing a new function each render.
- `useMemo(() => computeExpensiveValue(a, b), [a, b])`: Returns a memoized value.
- `useState(initialState)`: e.g. `const [active, setActive] = useState(false)`.
- `useReducer(reducer, initialArg, init)` - returns `[state, dispatch]`. An alternative to useState.
- `useContext`: see below.
- `useRef(initialValue)`: returns a mutable ref object. See below.
- `useImperativeHandle(ref, createHandle, [deps])`
- `useLayoutEffect(fn, [deps])`: identical to useEffect, but it fires synchronously after all DOM mutations.
- `useDebugValue(value)`: to display a label for custom hooks in React DevTools.

**Note:** never call Hooks inside loops, conditions, or nested functions – https://reactjs.org/docs/hooks-rules.html

#### useRef

    const inputElement = useRef(null)
    useEffect(() => inputElement.current.focus(), [])

    <input ref={inputElement} type='text' />

### Forms with useState

    const [inputValues, setInputValues] = useState({
      firstName: '',
      lastName: ''
    })

    const handleInputValuesChange = (event) => {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
      setInputValues({
        ...inputValues,
        [event.target.name]: value
      })
    }

    <input
      name='firstName'
      value={inputValues.firstName}
      onChange={handleInputValuesChange}
    />

### Forms

    <form onSubmit={handleSubmit}>
      <label htmlFor='emailField'>Email:</label>
      <input id='emailField' type='email' autoComplete='email' placeholder='Your email' required />
      <button type='submit'>Submit</button>
    </form>

#### useCountdown hook

    import { useState, useEffect } from 'react'

    const INTERVAL = 1000

    export const useCountdown = function (startTimeLeft = 60000) {
      const [timeLeft, setTimeLeft] = useState(startTimeLeft)

      useEffect(() => {
        const timeoutID = window.setTimeout(() => {
          setTimeLeft(timeLeft - INTERVAL)
        }, INTERVAL)

        return () => window.clearInterval(timeoutID)
      })

      return [timeLeft, setTimeLeft]
    }
    export default useCountdown

    // import useCountdown from '../hooks/useCountdown'
    // const [timeLeft, setTimeLeft] = useCountdown(startTimeLeft)

#### SWR Hook

https://github.com/zeit/swr

    const { data, error } = useSWR('/api/user', fetcher)

#### Dynamic className

    <div
      className={[
        'big-package',
        ...(true ? ['selectable'] : []),
        ...(isActive ? ['selected'] : []),
        ...(false ? ['active'] : [])
      ].join(' ')}
      onClick={onClick}
    >

### React Context

Context is another way of sharing state, without using child props.
https://reactjs.org/docs/context.html

  export const MyContext = React.createContext('defaultValue') // outside hook

Set up Provider:

  <MyContext.Provider value={staticOrStateValue}>
    {/* provide context value to children further down */}
  </MyContext.Provider>

1) Use with Consumer:

  <MyContext.Consumer>
    {value => /* use the context value when rendering */}
  </MyContext.Consumer>

2) Use with hook:

  const value = React.useContext(MyContext)

#### Use Context with State

https://www.codementor.io/@sambhavgore/an-example-use-context-and-hooks-to-share-state-between-different-components-sgop6lnrd

  import React, { createContext, useState, useContext } from 'react'

  export const UserContext = createContext()

  export const UserContextProvider = props => {
    // Use State to keep the values. Initial values are obtained from UserContextProvider’s props.
    const [user, setUser] = useState(props.user)
    // Make the context object (or array)
    const userContext = [user, setUser]
    // Pass the value in Provider and return
    return <UserContext.Provider value={userContext}>{props.children}</UserContext.Provider>
  }

  export const { Consumer: UserContextConsumer } = UserContext

  export const useUser = () => useContext(UserContext)

  // Wrap your app/page with the Provider
  // NOTE: must be wrapped on higher level than where useUser is used

  import { UserContextProvider } from './useUser'
  <UserContextProvider user={1}>...</UserContextProvider>

  // Then to use (“consume”) inside component or hook:

  const [user, setUser] = useUser()


### Styling React

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

  <PrimaryButton as='a'/>
  // or, deprecated:
  const PrimaryLink = PrimaryButton.withComponent('a')
  
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
    div { background-color: ${props.theme.background}; }
  `}</style>

Global:

  <style jsx>{`
    .root :global(button:selected:hover) {
    }
  `}</style>

  <style jsx global>

#### SVG

1) Import:

  yarn add react-svg-inline svg-inline-loader

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

    const dateValueList = dateValues.map(
      (dateValue, key) => <DateValue key={key} dateValue={dateValue} handleRemove={handleRemove}/>
    )

    return  (
      <div>
        <button className='add' onClick={handleAdd}>+ Add value</button>
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

### Events

  <button onClick={this.handleClick}>Hello {this.props.name} {this.props.children}</button>

Optional event/props:

  {onAdd ? <button className='icon add' onClick={onAdd.bind(undefined, person)}>+</button> : null}

#### KeyDown

    const onKeyDown = (event) => {
      console.log('keyCode', event.keyCode)
    }

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


### Storybook

Install Storybook. Checks if you use React/Angular etc. Works with `yarn` too.

  npx -p @storybook/cli sb init


### React Games (react-game-kit)

- Loop: context.loop.(un)subscribe


## Redux

https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f
https://egghead.io/courses/getting-started-with-redux

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

## React Animations

https://github.com/digital-flowers/react-animated-css

https://popmotion.io/pose/  

### React Spring

  import { useSpring, animated } from 'react-spring'

  const [show, setShow] = useState(false)
  const props = useSpring({ opacity: show ? 1 : 0 }) // values can also be Arrays
  // Advanced: const [props, set, stop] = useSpring(() => ({ opacity: 1 }))
  return <animated.div style={props} onClick={() => setShow(!show)}>I will fade when clicked</animated.div>

  // styled-components
  const AnimatedBox = styled(animated.div)`/* CSS here */`

Methods:

- `useSpring`: basic
- `useSprings`: multiple, independent
- `useTrail`: multiple, follow the last one
- `useTransition`: when adding/removing to lists
- `useChain`: 

Config:

  useSpring({ config: { mass: 1.5 }, ... })

- `mass`: 1
- `tension`: 170
- `friction`: 26
- `clamp`: false
- `precision`: 0.01
- `velocity`: 0
- `duration`: undefined
- `easing`: t => t

### Drag & Drop

https://github.com/STRML/react-draggable

Note: `<Draggable>` must wrap a `<div>`.

- clientX/Y
- layerX/Y
- movementX/Y
- offsetX/Y
- pageX/Y
- screenX/Y
- x/y

https://github.com/atlassian/react-beautiful-dnd

### Debounce

    import { useDebouncedCallback } from 'use-debounce'
    const [onChangeTextDebounced] = useDebouncedCallback(onChangeText, 1000)

# React and Redux

- @zeit/next-bundle-analyzer
- terser-webpack-plugin

## React

- React is just the View layer. **Flux** (incl. **Redux**) is the Model layer.
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

    mkdir src/components
    mkdir src/pages
    mkdir src/hooks
    mkdir src/lib
    mkdir src/config

    rm src/logo.svg
    rm public/logo192.png
    rm public/logo512.png
    rm public/favicon.ico

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

Scripts:

    "dev": "yarn start",
    "new": "touch src/components/NewComponent.js; echo \"import React from 'react'\n\nconst NewComponent = () => {\n  return (\n    <div>\n      NewComponent\n    </div>\n  )\n}\n\nexport default NewComponent\" >> src/components/NewComponent.js; echo Now rename src/components/NewComponent.js to something else",
    "start": "PORT=3123 react-scripts start",
    "build": "react-scripts build",
    "test": "echo 'Running Standard.js and Jasmine unit tests...\n' && yarn lint && yarn unit",
    "unit": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "standard",
    "fix": "standard --fix"

baseUrl:

    echo '{
      "compilerOptions": {
        "baseUrl": "."
      }
    }' > jsconfig.json

### Components with JSX

Comparison:

1. Functional component: compact with arrow function - you can remove {return} for even more compact:

		const MyFunctionalComponent = ({ prop1 }) => {
			return (
			  <div>
				  <h2>About {prop1}</h2>
				</div>
			)
		}
		export default MyFunctionalComponent

2. Class component: class/extends with state etc
		
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

    React.createElement(
      onSubmit ? 'form' : 'div',
      {
        onSubmit: onSubmit
      },
      (
        <>
          {...}
        </>
      )
    )

#### All props

	<Button {...props} />

#### Clone children - add props to children

	const childrenWithProps = React.Children.map(this.props.children, child => React.cloneElement(child, { myProp1, myProp2 }))
	
	// Only 1 child
	React.cloneElement(child, { myProp1, myProp2 })

### PropTypes

    MyComponent.propTypes = {
      optionalNumber: PropTypes.number,
      mandatoryNumber: PropTypes.number.isRequired,
      isOptional: PropTypes.bool,
      complexObject: PropTypes.shape({
        before: PropTypes.string,
      })
    }

    MyComponent.defaultProps = {
      optionalNumber: undefined,
      isOptional: false,
      complexObject: {}
    }

### React Hooks

https://reactjs.org/docs/hooks-overview.html

- `useEffect(() => {}, [deps])`: instead of componentDidMount. Empty deps = fire once, otherwise when deps change.
- `useCallback(() => {}, [deps])`: returns a memoized version of the callback that only changes if one of the dependencies has changed. Use to prevent this passing a new function each render.
- `useMemo(() => computeExpensiveValue(a, b), [a, b])`: Returns a memoized value.
- `useState(initialState)`: e.g. `const [active, setActive] = useState(false)`. Can use an _updater function_ e.g. `setActive(a => !a)` (instead of `setActive(!a)`).
- `useReducer(reducer, initialArg, init)` - returns `[state, dispatch]`. An alternative to useState.
- `useContext`: see below.
- `useRef(initialValue)`: returns a mutable ref object. See below.
- `useImperativeHandle(ref, createHandle, [deps])`
- `useLayoutEffect(() => {}, [deps])`: identical to useEffect, but it fires synchronously after all DOM mutations.
- `useDebugValue(value)`: to display a label for custom hooks in React DevTools.

**Note:** never call Hooks inside loops, conditions, or nested functions – https://reactjs.org/docs/hooks-rules.html

#### useMemo vs. useCallback vs. useEffect

- `useMemo`: return value
- `useCallback`: return function
- `useEffect` + `useState`: if need async/await:

    const [stateValue, setStateValue] = useState()
    const getStateValue = async () => setStateValue(await somethingAsync())
    useEffect(() => getStateValue(), [])

#### useRef

    import { useRef } from 'react'

    const elementRef = useRef(null)
    <input ref={elementRef} />

Example: useFocus hook

    import { useRef, useEffect } from 'react'

    export default function useFocus () {
      const focusRef = useRef(null)
      useEffect(() => focusRef.current.focus(), [])
      return focusRef
    }

    // <input ref={focusRef} />

#### setTimeout/setInterval in a React Hook

    useEffect(() => {
      const timer = window.setTimeout(() => console.log('Hello, World!'), 3000)
      return () => window.clearTimeout(timer)
    }, [])

    useEffect(() => {
      const timer = window.setInterval(() => setSeconds(seconds => seconds + 1), 1000)
      return () => window.clearInterval(timer)
    }, [])

#### useCountdown hook

    import { useState, useEffect } from 'react'

    const INTERVAL = 1000

    export const useCountdown = function (startTimeLeft = 60000) {
      const [timeLeft, setTimeLeft] = useState(startTimeLeft)

      useEffect(() => {
        const timeoutID = window.setInterval(() => {
          setTimeLeft(timeLeft - INTERVAL)
        }, INTERVAL)

        return () => window.clearInterval(timeoutID)
      })

      return [timeLeft, setTimeLeft]
    }
    export default useCountdown

    // import useCountdown from '../hooks/useCountdown'
    // const [timeLeft, setTimeLeft] = useCountdown(startTimeLeft)

#### useSavedState hook (simple-browser-session)

    import { useState } from 'react'
    import { getSessionValue, setSessionValue } from 'simple-browser-session'

    const cookieName = 'makamap'

    export default function useSavedState (propertyName, defaultValue) {
      const storedValue = getSessionValue(propertyName, defaultValue, { cookieName })
      const [state, setState] = useState(storedValue)
      const setStateAndSaveIt = (value) => {
        setState(value)
        setSessionValue(propertyName, value, { updateStored: true, updatePath: true, cookieName })
      }
      return [state, setStateAndSaveIt]
    }

    // import useSavedState from '../hooks/useSavedState'
    // const [myState, setMyState] = useSavedState(propertyName)

#### useLocalStorage / useStoredState

    /*
      import useLocalStorage from 'hooks/useLocalStorage'
      const [value, setValue] = useLocalStorage(propertyName, defaultValue)
    */

    import { useState, useEffect } from 'react'

    export default function useLocalStorage (propertyName, defaultValue) {
      const [value, setValueInState] = useState(defaultValue)

      const setValueInLocalStorage = (propertyValue) => {
        setValueInState(propertyValue)
        const propertyValueObject = typeof propertyValue === 'object'
          ? JSON.stringify(propertyValue)
          : propertyValue
        window.localStorage.setItem(propertyName, propertyValueObject)
      }

      useEffect(() => {
        const propertyValue = window.localStorage.getItem(propertyName)
        const propertyValueObject = (propertyValue?.startsWith('{') || propertyValue?.startsWith('['))
          ? JSON.parse(propertyValue)
          : propertyValue
        setValueInState(propertyValueObject || defaultValue)
      }, [propertyName])

      return [value, setValueInLocalStorage]
    }

#### useDebounce

    // E.g. const debouncedSearchTerm = useDebounce(searchTerm, 500)
    // https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
    import { useState, useEffect } from 'react'

    type DebounceValue = string | number

    export default function useDebounce (value: DebounceValue, delay: number, onChange?: (value: DebounceValue) => void): DebounceValue {
      const [debouncedValue, setDebouncedValue] = useState(value)

      useEffect(
        () => {
          const handler = setTimeout(() => {
            setDebouncedValue(value)
            onChange?.(value)
          }, delay)
          return () => clearTimeout(handler)
        },
        [value]
      )

      return debouncedValue
    }

#### SWR hook

https://github.com/zeit/swr

    const { data, error } = useSWR('/api/user', fetcher)

`useSWRInfinite`

https://github.com/vercel/swr/blob/main/examples/infinite-scroll/pages/index.js

### Forms with useState

Simple:

    const [inputs, setInputs] = useState({ name: '' })

    const handleInputChange = ({ target }) => setInputs({ ...inputs, [target.name]: target.value })

Advanced:

    const DEFAULT_INPUTS = { firstName: '', lastName: '' }

    const [inputs, setInputs] = useState(DEFAULT_INPUTS)

    const handleInputChange = ({ target }) => {
      const value = target.type === 'checkbox' ? target.checked : target.value
      setInputs({ ...inputs, [target.name]: value })
      // setInputs(inputs => ({ ...inputs, [target.name]: value }))
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      doSomethingWithData(inputs)
    }

Form:

    <form onSubmit={handleSubmit}>
      <div className='fieldset'>
        <label htmlFor='emailField'>Email:</label>
        <input
          id='emailField'
          name='email'
          type='email'
          autoComplete='email'
          placeholder='Email'
          required
          value={inputs.email}
          onChange={handleInputChange}
          disabled={inProgress}
        />
      </div>

      <button type='submit'>Submit</button>
    </form>

Checkbox (`checked`):

    const Checkbox = ({ name = 'checkbox', label, value, onChange }: { name: string, label: string, value: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }): React.ReactElement => (
      <span className='checkbox-wrapper'>
        <input
          type='checkbox'
          name={name}
          id={name}
          checked={value}
          onChange={onChange}
        />
        <label htmlFor={name}>{label}</label>
      </span>
    )

Fieldset:

    /*
      <Fieldset label='Name'>
        <MyComponent />
      </Fieldset>
    */
    const Fieldset = ({ children, id, label, description }) => {
      return (
        <div className='fieldset' title={description}>
          <label htmlFor={id + 'Field'}>{label}: </label>
          {children}
        </div>
      )
    }

    /*
      <InputWithLabel
        id='name'
        label='Name'
        value={state.name}
        onChange={setName}
      />
    */
    const InputWithLabel = ({ id, label, description, placeholder, type = 'text', autoComplete = 'off', autoCapitalize = 'sentences', value, onChange, inProgress, required, disabled, className, children }) => (
      <Fieldset
        id={id}
        label={label}
        description={description}
      >
        <input
          id={id + 'Field'}
          name={id}
          type={type}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder || description || label}
          value={value || ''}
          onChange={onChange}
          required={required}
          disabled={disabled || inProgress}
          className={className}
        />
        {children}
      </Fieldset>
    )

#### Input: type, autoComplete, autoCapitalize

    <input name='name' type='text' autoComplete='name' autoCapitalize='words' />
    <input name='email' type='email' autoComplete='email' autoCapitalize='none' />
    <input name='website' type='url' autoComplete='url' autoCapitalize='none' />
    <input name='phone' type='tel' autoComplete='tel' />
    <input name='streetAddress' type='text' autoComplete='street-address' autoCapitalize='words' />
    <input name='postalCode' type='text' autoComplete='postal-code' autoCapitalize='characters' />
    <input name='city' type='text' autoComplete='address-level2' autoCapitalize='words' />

### Dynamic className

    <div
      className={['base-class', ...(props.className ? [props.className] : [])].join(' ')}
    />

    <div
      className={[
        'big-package',
        ...(true ? ['selectable'] : []),
        ...(isActive ? ['selected'] : []),
        ...(false ? ['active'] : [])
      ].join(' ')}
    />

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
	
	export const UserContextProvider = (props) => {
		// Use State to keep the values. Initial values are obtained from UserContextProvider’s props.
		const [user, setUser] = useState(props.user)
		// Make the context object (or array)
		const userContext = [user, setUser]
		// Pass the value in Provider and return
		return <UserContext.Provider value={userContext}>{props.children}</UserContext.Provider>
	}
	
	export const { Consumer: UserContextConsumer } = UserContext
	
	export const useUser = () => useContext(UserContext)

Wrap your app/page with the Provider.
NOTE: must be wrapped on higher level than where useUser is used.

	import { UserContextProvider } from './useUser'
	<UserContextProvider user={1}>...</UserContextProvider>
	
	// Then to use (“consume”) inside component or hook:
	
	const [user, setUser] = useUser()


### Styling React

#### style prop

    <div style={{ color: 'orange' }} />

#### styled-components

	import styled from 'styled-components'

	const MyComponent = styled.div`
		font-family: ${props => props.theme.fontName};
		color: ${weldTheme.blue};
		background-color: 'tomato';
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

  yarn add react-svg-inline raw-loader

2) webpack / `next.config.js`:

    module.exports = {
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
          test: /\.svg$/,
          loader: 'raw-loader'
        })
        return config
      }
    }

3) Use SVG:

  import SVGInline from 'react-svg-inline'
  import mySvgImage from './images/icon.svg'

  <SVGInline svg={mySvgImage} />

or:

  <SVGInline svg={require('./images/icon.svg').default} />

##### Custom SVG component

Note: see SVG usage above

    import React from 'react'
    import SVGInline from 'react-svg-inline'

    const DEFAULT_SIZE = '16'

    const Icon = ({ type = 'arrow', width = DEFAULT_SIZE, height = DEFAULT_SIZE, color = 'white', rotation }) => {
      return (
        <SVGInline
          svg={require(`public/images/icons/${type}.svg`).default}
          width={width}
          height={height}
          fill={color ? color : undefined}
          cleanup={color ? true : undefined}
          style={{
            display: 'inline-block',
            verticalAlign: 'text-top',
            transition: 'transform 0.3s',
            ...(rotation && { transform: `rotate(${rotation}deg)` })
          }}
        />
      )
    }
    export default Icon

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

Note: OLD maybe not use

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

https://react-spring.dev/

    import { useSpring, animated } from 'react-spring'

    const [show, setShow] = useState(false)
    const props = useSpring({ opacity: show ? 1 : 0 }) // values can also be Arrays
    // Advanced: const [props, set, stop] = useSpring(() => ({ opacity: 1 }))
    return (
      <animated.div
        style={props}
        onClick={() => setShow(!show)}
      >
        I will fade when clicked
      </animated.div>
    )

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

### Mouse/Touch/Pointer events

onMouseDown/onMouseEnter/onMouseLeave/onMouseMove/onMouseOut/onMouseOver/onMouseUp

    onMouseMove={e => console.log('onMouseMove', [e.clientX, e.clientY], [e.movementX, e.movementY])}
    onTouchMove={e => console.log('onTouchMove', e.touches[0])}


- clientX/Y
- pageX/Y
- screenX/Y
- movementX/Y

### Drag & Drop

#### Basic drag & drop

https://github.com/STRML/react-draggable

Note: `<Draggable>` must wrap a `<div>`.

- clientX/Y
- layerX/Y
- movementX/Y
- offsetX/Y
- pageX/Y
- screenX/Y
- x/y

#### “Trello-style” drag & drop

https://github.com/atlassian/react-beautiful-dnd

    import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    }

    function DragDropDemo () {
      const [items, setItems] = useState(['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry'])

      function onDragEnd(result) {
        if ((!result.destination) || (result.destination.index === result.source.index))
          return
        const newItems = reorder(items, result.source.index, result.destination.index)
        setItems(newItems)
      }

      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='list'>
            {provided => (
              <div className='droppable' ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {provided => (
                      <article
                        className='draggable'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item}
                      </article>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )
    }

#### Outline drag & drop

https://github.com/frontend-collective/react-sortable-tree

### Debounce

    import { useDebounce, useDebouncedCallback } from 'use-debounce'
    const [valueDebounced] = useDebounce(value, 1000)
    const onChangeTextDebounced = useDebouncedCallback(value => onChangeText(value), 1000)

### Links

  <a
    href={url}
    target='_blank'
    rel='noopener noreferrer'
  >
    Contact
  </a>

### Toast / Notifications

react-toastify

https://github.com/trustlinc/trustlinc-app/commit/a798ca1bd6dfb17bd728d9dc84e9b3c8c79aadac

### React Maps with react-map-gl

https://visgl.github.io/react-map-gl/

1. `yarn add react-map-gl`
2. You need a Mapbox API token: https://account.mapbox.com/
3. CSS for mapbox-gl: `import 'mapbox-gl/dist/mapbox-gl.css'`
4. React code:

Example code:

    import React, { useState } from 'react'
    import ReactMapGL, { Marker } from 'react-map-gl'

    import { config } from 'config/config'

    function MapPage () {
      const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 59.32003624836317,
        longitude: 18.06499608,
        zoom: 11 // higher = zoom in
      })

      return (
        <>
          <ReactMapGL
            {...viewport}
            onMove={evt => setViewport(evt.viewState)}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            mapboxAccessToken={config.mapboxPublicToken}
          >
            <Marker
              latitude={latitude}
              longitude={longitude}
              offset={[0, 0]}
            >
              <MyCustomMarkerComponent />
            </Marker>
          </ReactMapGL>
        </>
      )
    }

    export default MapPage

### Invalid hook call

   yarn list react # OR: npm ls react

### Optimize React and Next.js

https://reactjs.org/docs/optimizing-performance.html

https://nextjs.org/docs/advanced-features/measuring-performance

### Material UI (MUI, @mui/material)

- Basic:
  - **Box**: Basic wrapper for styling (i.e. a `div`).
  - **Container**: Centers content, limits width.
- Layouts:
  - **Stack**: For simple stacking of elements.
  - **Grid**: For complex, responsive 2D layouts.
- Elevated (“3D”):
  - **Paper**: Adds elevation to UI sections.
  - **Card**: like **Paper** but with sections for headers, content, actions.

Properties:

- `xs` (e.g. `<Grid item xs={4}>`): “X size”, where 12 is full width.

#### MUI `Typography`

- `h1`-`h5`: Headings
- `body1`: Default body text
- `body2`: Smaller body text
- `subtitle1`: Slightly larger than body text, often used for subheadings
- `subtitle2`: Smaller than `subtitle1`, also used for subheadings
- `caption`: Small text, often used for annotations or metadata
- `overline`: Small, often uppercase text, used for categories or metadata
- `button`: Text for buttons
- `inherit`: Inherits the styling from the parent component

## React

### create-react-app

https://github.com/facebookincubator/create-react-app

  yarn create react-app my-app  # or npx create-react-app my-app, or npm init create-react-app my-app
  cd my-app
  yarn start

### Next.js

  yarn create next-app my-app
  cd my-app
  now dev

#### Folders

* `pages`: Page components
* `public`: e.g. CSS files, images
* `components`: React components
* `lib`: data

#### Next.js Page written as functional component with React Hooks

  const MyPage => ({ query }) {
    const { data, loading, error } = useQuery(personQuery(query.slug))
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    if (!data.person) return `Not found`
    return <main>
      <h1 className='capitalize'>{data.person.name}</h1>
    </main>
  }

  MyPage.getInitialProps = async ({ req, res, pathname, asPath, query }) => {
    console.log({ pathname, asPath, query })
    return { query }
  }

  export default MyPage

#### Next.js export static HTML app

`package.json`:

  "scripts": {
    "build": "next build",
    "export": "next build && next export"
  }

`next.config.js`:

  module.exports = {
    exportPathMap: function () {
      return {
        '/': { page: '/' },
        '/about': { page: '/about' }
      }
    }
  }

Note: NODE_ENV becomes 'production', all scripts run client-side.

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

### Routing/multiple pages/views

react-router-dom:

* https://reacttraining.com/react-router/web/guides/quick-start
* https://github.com/ReactTraining/react-router

Routing setup:

  import React from 'react'
  import { BrowserRouter as Router, Route } from 'react-router-dom'

  export default () => (
    <Router>
      <div>
        <Route path='/' exact component={Screen} />
        <Route path='/gamepad' component={Gamepad} />
        <Route path='/withProps' render={(props) => <Dashboard {...props} isAuthed={true} />} />
      </div>
    </Router>
  )

Links:

  import { Link } from 'react-router-dom'
  <Link to='/users'>Users</Link>

Push route:

  import { withRouter } from 'react-router-dom'

  console.log(this.props.location.pathname)
  this.props.history.push(`/path`)

  withRouter(MyComponent)

Redirect:

  const RouteIfLoggedIn = props => isLoggedIn()
    ? <Route {...props} />
    : <Redirect from={props.from} to={ROUTE_LOGIN} />

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
    href='/people?peopleId=123' // Internal Next.js URL
    as='/people/123' // Pretty URL visible for users
  >
    <a>My link</a>
  </Link>

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

- `useEffect(fn, [deps])`: instead of componentDidMount. Empty deps = fire once, otherwise when deps change.
- `useCallback(fn, [deps])`: returns a memoized version of the callback that only changes if one of the dependencies has changed. Use to prevent this passing a new function each render.
- `useMemo(() => computeExpensiveValue(a, b), [a, b])`: Returns a memoized value.
- `useState(initialState)`: e.g. `const [active, setActive] = useState(false)`.
- `useReducer(reducer, initialArg, init)` - returns `[state, dispatch]`. An alternative to useState.
- `useContext`: see below.
- `useRef(initialValue)`: returns a mutable ref object.
- `useImperativeHandle(ref, createHandle, [deps])`
- `useLayoutEffect(fn, [deps])`: identical to useEffect, but it fires synchronously after all DOM mutations.
- `useDebugValue(value)`: to display a label for custom hooks in React DevTools.

**Note:** never call Hooks inside loops, conditions, or nested functions – https://reactjs.org/docs/hooks-rules.html

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

  import React, { createContext, useState } from 'react'

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

  // Wrap your app/page with the Provider:

  import { UserContextProvider } from './UserContext'
  <UserContextProvider user={1}>...</UserContextProvider>

  // Then to use (“consume”) inside component or hook:

  import { UserContext } from './UserContext'
  const [user, setUser] = useContext(UserContext)


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
    div { background-color: ${props.theme.background}; }
  `}</style>

Global:

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


### Storybook

Install Storybook. Checks if you use React/Angular etc. Works with `yarn` too.

  npx -p @storybook/cli sb init


### React Games (react-game-kit)

- Loop: context.loop.(un)subscribe

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

### React Animations

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

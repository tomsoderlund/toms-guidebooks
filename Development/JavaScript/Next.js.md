# Next.js

  yarn create next-app my-app
  cd my-app
  now dev

## Folders

* `pages`: Page components
* `public`: e.g. CSS files, images
* `components`: React components
* `lib`: data

## Next.js Page written as functional component with React Hooks

  const MyPage = ({ query }) => {
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

## Next.js export static HTML app

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

## Directory structure

  /public
  /src
    /config
    /App
      /Components
    /Views
      /StartPage
        /Components

https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1

## Routing/multiple pages/views

react-router-dom:

* https://reacttraining.com/react-router/web/guides/quick-start
* https://github.com/ReactTraining/react-router

Routing setup:

  import React from 'react'
  import { BrowserRouter as Router, Route } from 'react-router-dom'

  export default () => (
    <Router>
      <Route path='/' exact component={Start} />
      <Route path='/page2' component={Page2} />
      <Route path='/withProps' render={(props) => <Page3 {...props} isAuthed={true} />} />
    </Router>
  )

Links:

  import { Link } from 'react-router-dom'
  <Link to='/users'>Users</Link>

Push route (hook):

  import { useHistory, useLocation } from 'react-router-dom'
  const history = useHistory()
  history.push('/home')

  const location = useLocation()
  location.pathname

Push route (withRouter):

  import { withRouter } from 'react-router-dom'

  console.log(this.props.location.pathname)
  this.props.history.push(`/path`)

  withRouter(MyComponent)

Redirect:

  const RouteIfLoggedIn = props => isLoggedIn()
    ? <Route {...props} />
    : <Redirect from={props.from} to={ROUTE_LOGIN} />

## Next.js: next/link (built in)

  import Link from 'next/link'

  <Link
    href='/people?peopleId=123' // Internal Next.js URL
    as='/people/123' // Pretty URL visible for users
  >
    <a>My link</a>
  </Link>

Push route:

    import { useRouter } from 'next/router'
    const router = useRouter()
    router.push(href)

    import Router from 'next/router'
    Router.push(url, as, options)

## Next.js: next-routes

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

## Localization: next-i18next

    mkdir -p public/static/locales/en
    touch public/static/locales/en/common.json

    touch lib/i18n.js  # config

## Cookies: next-cookies

    import cookies from 'next-cookies'

    export default class MyApp extends App {
      static async getInitialProps ({ ctx }) {
        return {
          user: cookies(ctx)[COOKIE_NAME] || null
        }
      }

      render () { }
    }

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

# Next.js

    yarn create next-app [my-app]  # you can add --ts or --typescript
    cd my-app
    yarn dev

Nice-to-have’s:

    mkdir components
    mkdir lib
    mkdir hooks
    rm -rf pages/api; rm styles/Home.module.css

baseUrl:

    echo '{
      "compilerOptions": {
        "baseUrl": "."
      }
    }' > jsconfig.json

Standard.js

    yarn add standard --dev  # or ts-standard for TypeScript

package.json: port number etc

    "scripts": {
      "dev": "next dev -p 3666",
      "deploy": "vercel --prod",
      "lint": "standard",
      "fix": "standard --fix"
    }

## Build - blank project

HTML 3.44 kB, JS 65.1 kB

    Page                                                           Size     First Load JS
    ┌ ○ /                                                          3.44 kB        65.1 kB
    ├   └ css/9c4381274c2a4fd9d205.css                             669 B
    ├   /_app                                                      0 B            61.6 kB
    ├ ○ /404                                                       3.44 kB        65.1 kB
    └ λ /api/hello                                                 0 B            61.6 kB
    + First Load JS shared by all                                  61.6 kB
      ├ chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.e48df4.js  11.3 kB
      ├ chunks/framework.9116e7.js                                 41.8 kB
      ├ chunks/main.7eab65.js                                      7.31 kB
      ├ chunks/pages/_app.627518.js                                529 B
      ├ chunks/webpack.e06743.js                                   751 B
      └ css/381f5b9c92d1673af027.css                               203 B

## Folders

- `pages`: Page components
- `public`: e.g. CSS files, images
- `components`: React components
- `lib`: data

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
	  export default MyPage

## Code optimization

https://next-code-elimination.now.sh/

## Inherit another page (export/import)

	export { default } from './OtherPage'
	import { default as OtherPage } from './OtherPage'
	export { getStaticProps, getStaticPaths } from './OtherPage'
	
	export default OtherPage

## SSR and SSG

https://nextjs.org/docs/basic-features/data-fetching

Note: SSR → SSG: remove getServerSideProps

- `getStaticProps` (Static Site Generation): Fetch data at build time.
- `getStaticPaths` (Static Site Generation): Specify dynamic routes to pre-render based on data.
- `getServerSideProps` (Server-side Rendering): Fetch data on each request.

### SSG: getStaticProps/-Paths

    // Super simple version

    export const getStaticProps = () => ({
      props: {
        title: 'Logging in' // used in _app.js
      },
      revalidate: 60 * 60 * 12 // 12 hours
    })

    export const getStaticPaths = () => ({
      paths: [],
      fallback: true
    })

    // Extended version

    // pages/articles/[propNameThatMustBePartOfFolderStructure].js
    export async function getStaticProps({ params: { propNameThatMustBePartOfFolderStructure = 'defaultValue' }, locale = 'en' }) {
      const article = await getArticle(propNameThatMustBePartOfFolderStructure)
      return {
        props: {
          article
        },
        revalidate: 60 // Seconds. This refresh time could be longer depending on how often data changes.
      }
    }

    export async function getStaticPaths({ locales }) {
      // const paths = (await getPostsList()).map(({ slug }) => ({ params: { slug }, locale: 'en' }))
      return {
        paths: [
          { params: { propNameThatMustBePartOfFolderStructure: 'value' }, locale: 'en' }
        ],
        fallback: true // true -> build page if missing, false -> serve 404
      }
    }

#### SSG in TypeScript

    import { GetStaticProps, GetStaticPaths } from 'next'
    import { ParsedUrlQuery } from 'querystring'

    interface PageInputProps extends ParsedUrlQuery {
      productName: string
    }

    interface PageReturnProps {
      title: string
    }

    export const getStaticProps: GetStaticProps<PageReturnProps, PageInputProps> = async (context) => {
      const { productName } = context.params ?? {}
      return {
        props: {
          title: productName ?? ''
        }
      }
    }

    export const getStaticPaths: GetStaticPaths = async () => {
      return {
        paths: [{ params: { productName: 'test' } }],
        fallback: true
      }
    }

### SSR: getServerSideProps

    export async function getServerSideProps({ req, res, query }) {
      return {
        props: {
          article
        }
      }
    }

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

## Environment

`NEXT_PUBLIC_*` for client-side environment.

## Routing/multiple pages/views

https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes

    [...slug].js
    [...id].js // won't catch "no id" so index.js still needed

react-router-dom:

- https://reacttraining.com/react-router/web/guides/quick-start
- https://github.com/ReactTraining/react-router

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

LinkOut - smart internal/external link:

    import Link from 'next/link'

    /** Creates external link if href includes 'http' */
    const LinkOut = (props) => {
      const { href, ...otherProps } = props
      // No link
      if (!href) {
        return (
          <span
            {...props}
          />
        )
      }
      // External link
      if (href.includes('http')) {
        return (
          <a
            {...props}
            target='_blank'
            rel='noopener noreferrer'
          />
        )
      }
      // Internal link
      return (
        <Link href={href}>
          <a {...otherProps} />
        </Link>
      )
    }
    export default LinkOut

Optional link:

    const OptionalLink = (props) => {
      const { href, children } = props
      return (
        href ? (
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
          >
            {children}
            <style jsx>{`
              a {
                color: inherit;
                border-bottom: none;
              }
            `}
            </style>
          </a>
        ) : (
          children
        )
      )
    }

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
      href='/people/123'
    >
      <a>Person</a>
    </Link>

or:

    <Link
      href={{
        pathname: '/people/[personId]',
        query: { personId: 123 }
      }}
    >
      <a>Person</a>
    </Link>

### router props

	  asPath: '/categories/wellness?wow=true',
	  route: '/categories/[categorySlug]',
	  pathname: '/categories/[categorySlug]',
	  query: {
	    categorySlug: 'wellness',
	    wow: 'true'
	  }

### Push route:

    import Router from 'next/router'
    Router.push(url, as, options)

    import { useRouter } from 'next/router'
    const router = useRouter()
    const { query, pathname, asPath, locale } = router
    router.push(href)

## OLD: Next.js: next-routes

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

## Localization

`next.config.js`:

    module.exports = {
      i18n: {
        locales: ['en', 'sv'],
        defaultLocale: 'en'
      }
    }

Get locale:

    const { locale, locales, defaultLocale } = useRouter()

Switch locale:

    <Link href='/another' locale='fr'>
      <a>Go to /fr/another</a>
    </Link>

### next-i18next

    mkdir -p public/static/locales/en
    touch public/static/locales/en/common.json

    touch lib/i18n.js  # config

### JSON files

    {
      "Latest": "Senaste",
      "Show word list": "Visa funna ord"
    }

## Localization: custom lib/i18n.js

    const { useRouter } = require('next/router')

    const getLocaleFile = (locale) => require(`public/static/locales/${locale}/common.json`)

    const localeFiles = {
      en: getLocaleFile('en'),
      sv: getLocaleFile('sv')
    }

    // replaceMultipleStrings(['This is $1', 'Sparta']) --> 'This is Sparta'
    const replaceMultipleStrings = (array, str) => (str || array[0]).replace(/(\$\d)/gm, strId => array[parseInt(strId.slice(1))])

    const getTranslation = (stringKeyOrArray, locale) => {
      const stringKey = Array.isArray(stringKeyOrArray) ? stringKeyOrArray[0] : stringKeyOrArray
      if (!localeFiles[locale] || localeFiles[locale][stringKey] === undefined) return stringKey
      return Array.isArray(stringKeyOrArray)
        ? replaceMultipleStrings(stringKeyOrArray, localeFiles[locale][stringKey])
        : localeFiles[locale][stringKey]
    }

    // const t = tForLocale('sv')
    const tForLocale = (locale) => (stringKeyOrArray) => getTranslation(stringKeyOrArray, locale)

    // import { useI18N } from 'lib/i18n'
    // const { t } = useI18N()
    const useI18N = function useI18N () {
      const { locale } = useRouter()
      const t = (str) => getTranslation(str, locale)
      return { t }
    }

    module.exports = {
      t: getTranslation,
      tForLocale,

      useI18N
    }


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

### Next.js and Firebase

https://leerob.io/blog/nextjs-firebase-serverless

### Import

    import MyComponent from '@/components/MyComponent'

### next/image

    import Image from 'next/image'

    <Image
      src='/images/MyCompany_logo.svg'
      alt='MyCompany logo'
      title='MyCompany'

      width={size}
      height={size}
    />

or:

    <Image
      src='/images/MyCompany_logo.svg'
      alt='MyCompany logo'
      title='MyCompany'

      layout='fill'
    />


### SVG images

See React doc (`react-svg-inline`).


### API timeout

vercel.json:

    {
      "functions": {
        "pages/api/myFunction.js": {
          "maxDuration": 60
        }
      }
    }

### Dynamic loading

    import dynamic from 'next/dynamic'
    const FileUploader = dynamic(() => import('components/content/uploading/FileUploader'), { ssr: false, loading: FileUploaderTemporary })

    // Dynamically load fuse.js
    const Fuse = (await import('fuse.js')).default
    const fuse = new Fuse(names)

### Error page

    import ErrorPage from 'next/error'

    <ErrorPage
      title={error.message || error}
      statusCode='404'
    />

Customize /pages/_error.js

    // _error.js is only used in production. In development you'll get an error with the call stack to know where the error originated from.
    import React from 'react'

    const ErrorPage = ({ title, statusCode }) => (
      <>
        <h1>Error (code {statusCode})</h1>
        <p>Sorry, but there was an error (code {statusCode}).</p>
      </>
    )

    ErrorPage.getInitialProps = ({ res, err }) => {
      const statusCode = res
        ? res.statusCode
        : err
          ? err.statusCode
          : 404
      return { title: 'Error', statusCode }
    }

    export default ErrorPage

### Prepare data object for Next JSON format

    const prepareForJSON = (obj) => {
      if (obj !== undefined) {
        const newObj = { ...obj }
        Object.keys(newObj).forEach(key => {
          const objectType = typeof newObj[key]
          const objectClass = newObj[key] && newObj[key].constructor.name
          if (objectClass === 'Timestamp') {
            newObj[key] = newObj[key].toDate().toString()
          } else if (objectType === 'undefined' || objectClass === null) {
            newObj[key] = null
          } else if (objectType === 'object' && objectClass !== 'Timestamp') {
            newObj[key] = prepareForJSON(newObj[key]) // Recursion
          }
        })
        return newObj
      } else {
        return null
      }
    }

    export default prepareForJSON

### webpack config

    const nextConfig = {
      // For font support:
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
        })
        return config
      }
    }

### Markdown in React/Next.js

https://github.com/remarkjs/react-markdown

    import ReactMarkdown from 'react-markdown'
    <ReactMarkdown>
      # Hello, *world*!
    </ReactMarkdown>

Parse Markdown:

Install with `yarn add marked gray-matter`, then:

    import { marked } from 'marked'
    import matter from 'gray-matter'
    import path from 'path'
    import fs from 'fs'

    const MARKDOWN_FOLDER = 'content/blog'

    const getMarkdownFirstLine = (markdown: string): string | undefined => markdown.split('\n')[0]?.split('# ').pop()?.split('\n')?.[0]

    export const getMarkdownContent = async function (slug: string): Promise<any> {
      const fullPath = path.join(MARKDOWN_FOLDER, `${slug}.md`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      // Use gray-matter to parse the post metadata section
      const article = matter(fileContents)
      // Use marked to convert markdown into HTML string
      const contentHtml = marked.parse(article.content)
      // Combine the data with the slug and contentHtml
      return {
        ...article.data,
        slug,
        contentHtml,
        title: article.data.title ?? getMarkdownFirstLine(fileContents) ?? 'Untitled',
        description: article.data.description ?? null
        // dateFormatted: article.data.date ?? null,
        // category: article.data.categories?.[0] ?? 'articles',
        // excerpt,
        // coverImage,
      }
    }

    export const getMarkdownSlugList = async function (): Promise<string[]> {
      const postsFolder = path.join(process.cwd(), MARKDOWN_FOLDER)
      const slugs = (await fsPromise.readdir(postsFolder, { withFileTypes: true }))
        .filter((file: any) => file.isFile())
        .filter((file: any) => file.name.startsWith('.') === false)
        .map((file: any) => file.name.replace(/\.md$/, ''))
      return slugs
    }

MDX:

    yarn add @mdx-js/loader @next/mdx

    const withMDX = require('@next/mdx')({
      extension: /\.mdx?$/
    })
    nextConfig.pageExtensions = ['js', 'jsx', 'mdx']
    module.exports = withOffline(withMDX(nextConfig))

Page:

    LessonText = require(`../../content/lessons/${query.lesson}/index.mdx`).default

### Locales

    const nextConfig = {
      i18n: {
        locales: ['en', 'sv'],
        defaultLocale: 'en'
      }
    }

### Support for MJS modules

    webpack: (config) => {
      config.module.rules.push({
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      })
      return config
    }

## Deployment

### Next.js on Amazon AWS

One way is to use [AWS Amplify](https://aws.amazon.com/amplify/) to do this, take a look at the [Deploying a static Next.js app using Amplify](https://aws.amazon.com/blogs/mobile/ssr-support-for-aws-amplify-javascript-libraries/) document, which shows how you can deploy such application on the service.

SSR is just an additional feature which you can simply omit from your configuration when using AWS Amplify.

A good start here is to follow the Amplify tutorial which has an [SSG example](https://docs.amplify.aws/start/getting-started/data-model/q/integration/next/#api-with-incremental-static-site-generation-ssg) too.

Make sure to also follow the [hosting guide for SSG-only apps](https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/#deploy-and-host-an-ssg-only-app).

Deploy a Next.js application on AWS using CDK & Fargate: https://dev.to/zoun/deploy-a-next-js-application-on-aws-using-cdk-fargate-2dnh

Next.js can be deployed to any hosting provider that supports Docker containers: https://nextjs.org/docs/deployment#docker-image


## Migrate from Create-React-App (CRA)

- CRA: https://nextjs.org/docs/migrating/from-create-react-app
- react-router: https://nextjs.org/docs/migrating/from-react-router

Commands:

    yarn remove react-scripts react-router-dom react react-dom; yarn add next react react-dom
    echo '{\n  "framework": "nextjs"\n}' > vercel.json
    echo '{\n  "compilerOptions": {\n    "baseUrl": "."\n  }\n}' > jsconfig.json
    mkdir pages
    git mv src/App.js pages/_app.js

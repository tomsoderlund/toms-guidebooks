# Preact

Why use? See https://twitter.com/slightlylate/status/1240422104668897280

## Create project with preact-cli

https://github.com/preactjs/preact-cli

    yarn global add preact-cli
    npm install -g preact-cli

Then:

    preact create default my-project # Multi-page template
    preact create simple my-simple-project

Templates:

- `default`: Default template with all features.
- `simple`: The simplest possible preact setup in a single file
- `widget`: Template for a widget to be embedded in another website.
- `material`: material template using preact-material-components
- `netlify`: Netlify CMS template using preact.
- `typescript`: Default template implemented in TypeScript

### Next.js with Preact

https://github.com/developit/nextjs-preact-demo

    git clone https://github.com/developit/nextjs-preact-demo.git

## Good extras when setting up new project

Folders:

    mkdir -p src/pages/Start  # most likely multiple files
    mkdir -p src/components/common
    mkdir -p src/hooks
    mkdir -p lib  # both for client and server
    mkdir -p config  # both for client and server
    mkdir -p api  # for Vercel etc

Port:
    
    "dev": "PORT=3201 preact watch",

Packages:

    yarn add preact-router preact-helmet

StandardJS:

    yarn add standard --dev

    "scripts": {
      "test": "echo 'Running Standard.js and Jasmine unit tests...\n' && yarn lint && yarn unit",
      "lint": "standard",
      "fix": "standard --fix",
      "unit": "jasmine"
    },

Other:

- https://github.com/preactjs/awesome-preact

## CSS Styles

    import style from './style.css'

    <div className={style.innerBox} />

## Hooks

    import { useState } from 'preact/hooks'

## Router

    import { Router } from 'preact-router'

Typically keep shared components outside of `<Router>`:

    <div id='app'>
      <PageHead />
      <Header />

      <main>
        <Router>
          <Page1 path='/' />
          <Page2 path='/user' userProp='me' />
          <Page2 path='/user/:user' />
        </Router>
      </main>
    </div>

Redirects

    import { route } from 'preact-router'
    route('/mypage')

Lazy loading: https://github.com/preactjs/preact-router#lazy-loading

## preact.config.js (or webpack config)

    export default (config, env, helpers) => {
      config.resolve = {
        alias: {
          'react': 'preact/compat',
          'react-dom': 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils'
        }
      }
    }

## SSR - prerenderUrls

https://stackoverflow.com/a/63378770/449227

    "build": "preact build --prerenderUrls ./prerenderUrls.json"

prerenderUrls.json:

    [
      {
        "url": "/",
        "title": "Amazing Startup Guide"
      },
      {
        "url": "/namegenerator",
        "title": "Name Generator – Amazing Startup Guide"
      }
    ]

## Issues with using React components

    yarn add --dev preact-cli@rc
    yarn add preact@latest preact-router@latest preact-render-to-string@latest
    yarn remove preact-compat

Works (design-profile-generator-2):

  "devDependencies": {
    "eslint": "^6.0.1",
    "eslint-config-synacor": "^3.0.4",
    "preact-cli": "^3.0.0-rc.6",
    "sirv-cli": "^0.4.5"
  },
  "dependencies": {
    "preact": "^10.1.0",
    "preact-render-to-string": "^5.1.2",
    "react-draggable": "^4.3.1"
  }

# Preact

from https://twitter.com/slightlylate/status/1240422104668897280

## Create with preact-cli

https://github.com/preactjs/preact-cli

    yarn global add preact-cli
    npm install -g preact-cli

Then

    preact create default my-project

Templates:

- `default`: Default template with all features.
- `simple`: The simplest possible preact setup in a single file
- `widget`: Template for a widget to be embedded in another website.
- `material`: material template using preact-material-components
- `netlify`: Netlify CMS template using preact.
- `typescript`: Default template implemented in TypeScript

## Issues

    yarn add --dev preact-cli@rc
    yarn add preact@latest preact-router@latest preact-render-to-string@latest
    yarn remove preact-compat

## preact.config.js

    export default (config, env, helpers) => {
      config.resolve = {
        alias: {
          'react': 'preact/compat',
          'react-dom': 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils'
        }
      }
    }

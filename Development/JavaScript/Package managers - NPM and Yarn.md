# NPM and Yarn

| Command               | npm                                  | yarn                         |
|-----------------------|--------------------------------------|------------------------------|
| Update itself         | `npm update npm -g`                  | `npm install yarn@latest -g` |
| Get listed packages   | `npm install`                        | `yarn`                       |
| Install package       | `npm install [package]`              | `yarn add [package]`         |
| Install dev package   | `npm install --save-dev [package]`   | `yarn add --dev [package]`   |
| Uninstall package     | `npm uninstall [package]`            | `yarn remove [package]`      |
| Uninstall dev package | `npm uninstall --save-dev [package]` | `yarn remove [package]`      |

## NPM

### Update NPM

    npm update npm -g

### Install 'n' helper

    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
    sudo n 0.8.21 # specific version

### See versions

    npm view <package> versions
    0.8.3<package>@<version>

    npm view bcrypt versions
    npm install bcrypt@0.8.3

## List package

    yarn list
    npm ls

package.json

  npm install -g [package-name]
  -g = global

  npm view <package> versions //
  npm install <package>@<version> // npm install bcrypt@0.8.0

  npm install --save compass # update package.json
  npm install --save-dev grunt-bumpx
  --save = update package.json

  npm update -g yo

  npm update --save mongoose

### NPM from Git

  "mongoose-crudify": "git+https://github.com/ryo718/mongoose-crudify.git#0.2.0",

### Create NPM packages

Tokens: https://www.npmjs.com/settings/YOUR-USER-NAME/tokens

https://docs.npmjs.com/getting-started/publishing-npm-packages

Check if existing: go to https://npmjs.com/package/<package>

  npm init  # OR npm init --scope=weld-io

Author: Tom Söderlund <NAME@YOURWEBSITE.com> (http://www.YOURWEBSITE.com)

  npm whoami # check user
  npm login # OR npm adduser # OR create new on https://www.npmjs.com
  npm config ls # to ensure that the credentials are stored on your client.

Licenses:

  "license": "ISC",
  "license": "MIT",
  "license": "UNLICENSED",

Make local package (TGZ file):

  npm pack

Publish to NPM:

  npm publish ## will run prepublish if exists

Update:

  npm version [patch, minor, or major]
  npm publish

Rename package:

  npm deprecate old-project-name@"<= last-version-with-old-name" "WARNING: This project has been renamed, now install new-project-name instead."
  npm deprecate @weld-io/weld-crossplatform-libs@"<= 2.9.9" "WARNING: This project has been renamed, now install @weld-io/crossplatform-libs instead."

GitHub: no problem
Codeship: change git:// link

#### Ignore files (blacklist/whitelist)

- Excluding files in .gitignore or .npmignore, including files in package.json "files"
- Ignore files: https://zellwk.com/blog/ignoring-files-from-npm-package/

#### Create NPM package with React

##### New: use Webpack (DOESN’T WORK YET)

https://itnext.io/how-to-package-your-react-component-for-distribution-via-npm-d32d4bf71b4f

##### Old: only using Babel (but can’t bundle files)

- https://www.codementor.io/peterodekwo/create-a-simple-react-npm-package-in-simple-steps-using-cra-w966okagi

Add Babel and a preset:

  yarn add @babel/cli @babel/preset-react --dev ## or babel-preset-next

package.json:

    "main": "dist/index.js",
    "scripts": {
      "prepare": "rm -rf dist && mkdir dist && babel ./components -d dist --copy-files --presets=@babel/preset-react",
      "prepare": "rm -rf dist && for folder in {components,lib,config,public}; do mkdir -p dist/${folder} && babel ${folder} -d dist/${folder} --copy-files --presets=@babel/preset-env,next; done && cp package.json dist/",
    },
    "files": [
      "dist/"
    ],

#### prepare, prebuild, postbuild, prepublish

    "scripts": {
      "prebuild": "echo I run before the build script",
      "build": "cross-env NODE_ENV=production webpack",
      "postbuild": "echo I run after the build script"
    }

'prepare' used before building NPM package:

    "prepare": "rm -rf dist && mkdir dist && babel ./components -d dist --copy-files --presets=@babel/preset-react",

### All NPM lifecycle scripts/commands

NPM lifecycle scripts:

- Pack/Publish/Install
  - **prepare**: Runs before `npm pack`, `npm publish`, and `npm install` (for Git dependencies). Ideal for building the project.
- Install
  - **preinstall**: Runs before `npm install`.
  - **install**: Runs after `npm install`.
  - **postinstall**: Runs after the `install` script.
- Uninstall
  - **preuninstall**: Runs before `npm uninstall`.
  - **uninstall**: Runs during `npm uninstall`.
  - **postuninstall**: Runs after `npm uninstall`.
- Version
  - **preversion**: Runs before the `version` script.
  - **version**: Runs when `npm version` is executed.
  - **postversion**: Runs after `npm version`.
- Publish
  - **prepublish**: **Deprecated**. Replaced by `prepare`. Runs before a package is published.
  - **prepublishOnly**: Runs only before `npm publish` but not before `npm install`.
  - **postpublish**: Runs after `npm publish`.
- Start
  - **prestart**: Runs before the `start` script.
  - **start**: Runs when `npm start` is executed.
  - **poststart**: Runs after the `start` script.
- Stop
  - **prestop**: Runs before the `stop` script.
  - **stop**: Runs when `npm stop` is executed.
  - **poststop**: Runs after the `stop` script.
- Restart
  - **prerestart**: Runs before the `restart` script.
  - **restart**: Runs when `npm restart` is executed. By default, it triggers `npm stop` followed by `npm start`.
  - **postrestart**: Runs after the `restart` script.
- Test
  - **pretest**: Runs before the `test` script.
  - **test**: Runs when `npm test` is executed.
  - **posttest**: Runs after the `test` script.
- Build
  - **prebuild**: Runs before the `build` script.
  - **build**: Used to compile or build your project.
  - **postbuild**: Runs after the `build` script.

## Yarn

https://yarnpkg.com/en/docs/usage

Installing all the dependencies of project

  yarn / yarn install

Starting a new project

  yarn init

Adding a dependency

  yarn add [package] // [package]@[version/tag]
  yarn global add [package]

Adding a dependency to different categories of dependencies (devDependencies, peerDependencies, and optionalDependencies)

  yarn add [package] --dev / --peer / --optional

Upgrading a dependency

  yarn upgrade [package] // [package]@[version/tag]
  yarn upgrade-interactive

Removing a dependency

  yarn remove [package]
  yarn remove [package] && yarn add [package] --dev


## Bower

  npm install -g bower

  bower install # install from list
  bower install --save [plugin]
  bower uninstall socket.io-client

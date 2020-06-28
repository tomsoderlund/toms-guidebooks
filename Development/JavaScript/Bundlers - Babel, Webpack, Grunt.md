## Babel / Browserify

https://github.com/babel/example-node-server
https://github.com/babel/babelify

  npm install -g browserify # Note: global
  npm install --save-dev babelify babel-preset-es2015 babel-preset-es2016 babel-preset-es2017
  npm install --save-dev nodemon

  browserify scripts/index.js -o bundle.js -t [ babelify --presets [ es2015 es2016 es2017 ] ]

package.json:

  "scripts": {
    "start": "nodemon scripts/index.js --exec browserify scripts/index.js -o bundle.js -t [ babelify --presets [ es2015 es2016 es2017 ] ]"
  }

With server:

  "scripts": {
    "start": "nodemon scripts/index.js --exec browserify scripts/index.js -o .tmp/browserify.js -t [ babelify --presets [ es2015 es2016 es2017 ] ] & python -m SimpleHTTPServer"
  },

Example .babelrc:

    {
      "plugins": [
        "transform-react-jsx"
      ],
      "ignore": [
        "foo.js",
        "bar/**/*.js"
      ]
    }

or via package.json:

    {
      "name": "my-package",
      "version": "1.0.0",
      "babel": {
        "plugins": [
          "transform-react-jsx"
        ]
      }
    }

Simple server:

  npm install node-static

index.js

  const static = require('node-static')
  const file = new static.Server()

  const portNr = process.env.PORT || 3000
  console.log(`Running server on localhost:${portNr}`)
  require('http').createServer(function(request, response) {
    request.addListener('end', function() {
      file.serve(request, response)
    }).resume()
  }).listen(portNr)


## Webpack

https://medium.com/@kimberleycook/intro-to-webpack-1d035a47028d

  yarn add webpack webpack-cli --dev
  touch webpack.config.js

`package.json`:

  "prepare": "rm -rf dist && webpack-cli",

`webpack.config.js`:

  module.exports = {
    mode: 'production', // 'development'
    entry: [
      './src/components/index.js'
    ],
    output: {
      filename: 'index.js',
      path: require('path').join(__dirname, '/dist')
    },
    module: {
      rules: [ // formerly 'loaders'
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   template: __dirname + '/src/views/campaigns/list.ejs',
      //   filename: 'list.ejs'
      // })
    ]
  }


### Plugins: HTML/EJS

  yarn add html-webpack-plugin --dev

### CSS

	yarn add --dev style-loader css-loader

	module.exports = {
	  module: {
	    rules: [
	      {
	        test: /\.css$/i,
	        use: ['style-loader', 'css-loader'],
	      },
	    ],
	  },
	}

### SVG

@svgr/webpack included with create-react-app.

    {
      test: /\.svg$/,
      use: ['@svgr/webpack']
    }

    import IconSearch from '../../assets/icons/search.svg'

    <IconSearch />

## Grunt

## Yeoman

### Yeoman Angular

https://github.com/yeoman/generator-angular

  sudo npm update -g yo & sudo npm install -g generator-angular-fullstack

generator-angular
generator-angular-fullstack

  yo angular-fullstack [appname]
  npm install & bower install

### Yeoman Polymer

Use just bower instead!

  bower install --save Polymer/polymer#^1.0.0

Install element:

  bower install --save PolymerElements/paper-fab#^1.0.0

Yeoman way:

  sudo npm install -g generator-polymer
  mkdir -p my-project && cd $_

  yo polymer (aka polymer:app)
  yo polymer:element
  yo polymer:seed
  yo polymer:gh

### Yeoman Express

  sudo npm install -g yo # Make sure you have yo installed
  sudo npm install generator-express # Install the generator locally
  yo express # then run Yeoman and select Basic

# React Native

React Native is an easy way to build native iOS/Android (also Windows, macOS, web) using JavaScript and React.

With Expo (https://expo.io) the steps are easy:

(First: update `expo-cli` with `yarn global add expo-cli` or `npm install -g expo-cli`)

1. Create a new app (`expo init [project-name]`)
2. Run it on device or simulator (`expo start`)
3. Publish it to Expo.io (`expo publish`)
4. Bundle it as native iOS/Android app (`expo build:ios`/`expo build:android`)
5. Add extra packages (location) with `expo install` NOT npm/yarn.


## Read more

- Official getting started: https://facebook.github.io/react-native/docs/getting-started.html
- Guide: https://hackernoon.com/learning-react-native-where-to-start-49df64cf14a2
- Coding guidebook: http://www.reactnativeexpress.com


## Getting started

### Expo client

Install https://expo.io client on your device.

### How to run

	npm install -g expo-cli  # Does not work? yarn global add expo-cli (Upgrade: `yarn global upgrade expo-cli`)

	expo init MyReactNativeApp

Templates:

- **Managed workflow**: you only write JavaScript / TypeScript and Expo tools and services take care of everything else for you.
- **Bare workflow**: you have full control over every aspect of the native project, and Expo tools and services are a little more limited.

	cd MyReactNativeApp
	yarn start  # or: npm start, expo start

### New React Native project with Next.js

https://docs.expo.io/guides/using-nextjs/
https://github.com/expo/expo-cli/tree/master/packages/next-adapter

	npx create-next-app -e with-expo PROJECTNAME
	(Fails:) npx create-react-native-app -t with-nextjs PROJECTNAME

#### Run

	yarn next dev # start the Next.js project
	expo start # start the Expo project

#### H1, H2

    <Text
      accessibilityRole='header'
      aria-level={1}
    >
      This is H1
    </Text>

#### Issues

##### @expo/next-adapter/document.js: Missing class properties transform

yarn add babel-plugin-transform-class-properties --dev
Babel config

module.exports = {
  presets: ['@expo/next-adapter/babel'],
  plugins: ['@babel/plugin-proposal-class-properties']
}

##### React v17 issues, use v16.9

### Installing packages

NOTE: use `expo install` primarily (rather than yarn/npm), e.g:

	expo install react-native-svg
	expo install react-native-maps
	expo install expo-location

### Standard setup

Create standard folders and files:

	mkdir -p screens/StartScreen
	touch screens/StartScreen/index.js
	mkdir -p components/screen
	touch components/screen/Screen.js
	mkdir lib
	mkdir hooks
	mkdir config
	touch config/config.js

Install useful packages:

	yarn add standard --dev
	expo install expo-font
	yarn add @react-navigation/native

	Managed:
	expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

	https://docs.expo.dev/ui-programming/react-native-toast/

#### package.json

	"lint": "standard",
	"fix": "standard --fix",
	"screen": "mkdir -p screens/NewScreen && touch screens/NewScreen/index.js",
	"v+": "yarn version --patch",
	"v++": "yarn version --minor"

#### App.js

	import * as React from 'react'
	import { NavigationContainer } from '@react-navigation/native'
	import { createStackNavigator } from '@react-navigation/stack'

	import StartScreen from './screens/StartScreen'

	// const navigationPersistenceKey = 'NavigationState'

	const Stack = createStackNavigator()

	function App () {
	  return (
	    <NavigationContainer>
	      <Stack.Navigator>
	        <Stack.Screen name='My App Title' component={StartScreen} />
	      </Stack.Navigator>
	    </NavigationContainer>
	  )
	}

	export default App

### Web development (react-native-web)

	expo start --web

Get web viewport size:

	import { Dimensions } from 'react-native'
	const { width, height } = Dimensions.get('window')

## Components

### Structure

	import React from 'react'
	import { StyleSheet, Text, View, Button } from 'react-native'

	export default class App extends React.Component {
	  render () {
	    return (
	      <View style={styles.container}>
	        <Text>Welcome to My App</Text>
					<Image
	          source={require('/react-native/img/favicon.png')}
	        />
	        <MyCustomComponent />
	        <Button
	          onPress={this.handleGenerate.bind(this)}
	          title='Reshuffle the cards'
	          color='#841584'
	          accessibilityLabel='Restart the game'
	        />
	      </View>
	    )
	  }
	}

### Components:

https://reactnativeelements.com/docs/button/

- Avatar
- Badge
- Bottom Sheet
- Button
- ButtonGroup
- Card
- CheckBox
- Divider
- Header
- Icon
- Image
- Input
- ListItem
- Overlay
- Pricing
- Rating
- SearchBar
- Slider
- SocialIcon
- Text
- Tile
- Tooltip

### Styling

	const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    backgroundColor: '#fff',
	    alignItems: 'center',
	    justifyContent: 'center'
	  }
	})

### Lifecycle methods

There are 4 types of Lifecycle methods available in React Native:

Mounting methods:

- `constructor`
- `componentWillMount`
- `render`
- `componentDidMount`

Updating methods:

- `componentWillReceiveProps`
- `shouldComponentUpdate`
- `componentWillUpdate`
- `componentDidUpdate`

Unmounting methods:

- `componentWillUnmount`

Error handling methods:

- `componentDidCatch`

### Touch events

  <View
    onTouchStart={(e) => console.log('onTouchStart', [e.nativeEvent.locationX, e.nativeEvent.locationY])}
    onTouchMove={(e) => console.log('onTouchMove', [e.nativeEvent.locationX, e.nativeEvent.locationY])}
    onTouchEnd={(e) => console.log('onTouchEnd', [e.nativeEvent.locationX, e.nativeEvent.locationY])}
  />

## Responsive design

https://medium.com/@shanerudolfworktive/7-tips-to-develop-react-native-uis-for-all-screen-sizes-7ec5271be25c

- `aspectRatio` on styles.
- `flex: X`/`flex: Y` for proportions.

https://github.com/DaniAkash/react-native-responsive-dimensions

	import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
	// in styles:
	height: responsiveHeight(50), // 50% of screen height


## Development mode

`__DEV__` variable


## Modules

### Component libraries

- Material Design: https://github.com/callstack/react-native-paper
- Button: https://github.com/APSL/react-native-button

### Routing/Navigation

https://reactnavigation.org/docs/en/getting-started.html

#### AppNavigator

	import { createStackNavigator, createAppContainer } from 'react-navigation'

	const AppNavigator = createStackNavigator({
	  Screen1: {
	    screen: Screen1Screen
	  },
	  Screen2: {
	    screen: Screen2Screen
	  }
	},
	// Optional settings for all screens:
	{
	  headerMode: 'none',
	  navigationOptions: {
	    headerVisible: false,
	  }
	})

	export default createAppContainer(AppNavigator)

#### Navigate to other screen

	// navigate, push, replace. Also: dismiss, goBack, pop, popToTop, reset, setParams
	this.props.navigation.navigate('Screen2', { someParam: 'Test' })

#### Screen header config

	static navigationOptions = ({ navigation }) => {
	  return {
	    headerTitle: navigation.getParam('someParam', 'Default Title'),
	    headerRight: (
	      <Button
	        title='+1'
	        color='#fff'
	      />
	    )
	  }
	}

#### State management

	this.props.navigation.setParams({ myParam: 123 })
	this.props.navigation.getParam('myParam', 'Default value')
	this.props.navigation.state.params.myParam

Set state on another screen:

	import { NavigationActions } from 'react-navigation'

	const setParamsAction = NavigationActions.setParams({
		key: navigation.getParam('fromKey'),
		params: { myParam }
	})
	navigation.dispatch(setParamsAction)


### Save state

https://facebook.github.io/react-native/docs/asyncstorage

Save navigation state:

	<AppNavigator persistenceKey={'NavigationPersistenceKey'} />

### Animations

Animated/LayoutAnimation

### Fonts

https://docs.expo.io/versions/latest/sdk/font/

	import * as Font from 'expo-font'

	function App() {
	  const [fontsAreLoaded] = useFonts({
	    Montserrat: require('./assets/fonts/Montserrat.ttf'),
	  })

	  if (!fontsAreLoaded) return null

	  return <Text style={{ fontFamily: 'Montserrat' }} />
	}

### Platform-specific code

	import { Platform } from 'react-native'
	if (Platform.OS !== 'web') return null

### Sounds

expo.Audio

	import { Audio } from 'expo'

	const clickSound = new Audio.Sound()
	await clickSound.loadAsync(require('../assets/sounds/click.mp3'))
	await clickSound.replayAsync()


## Deploying an iOS app on App Store

1. Create your app on https://appstoreconnect.apple.com/
2. Enter the same app bundle ID in `app.json`
3. Build with `expo build:ios` (option: `--clear-provisioning-profile`)
4. Upload IPA file with Application Loader on macOS (might need app-specific password on https://appleid.apple.com/)
5. App Store Connect takes ~1 hour to process a new build, then you can use Testflight for testing.

### Apple Certificates

https://developer.apple.com/account/resources/certificates/list

### Apple ID (with Supabase)

- https://docs.expo.dev/versions/latest/sdk/apple-authentication/
- https://supabase.io/docs/guides/auth/auth-apple

Steps:

- App ID
	- https://developer.apple.com/account/resources/identifiers/list
	- `com.tomorroworld.myappname`
- Service ID
	- `com.tomorroworld.myappname.login`
	- Callback URL: https://lioz*****.supabase.co/auth/v1/callback
- Key
	- https://developer.apple.com/account/resources/authkeys/list

### Maps: react-native-maps

https://github.com/react-native-maps/react-native-maps

- [MapView](https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md)
	- showsUserLocation, followsUserLocation
- [Marker](https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md)
- [Callout](https://github.com/react-native-maps/react-native-maps/blob/master/docs/callout.md)
- [Polygon](https://github.com/react-native-maps/react-native-maps/blob/master/docs/polygon.md)
- [Polyline](https://github.com/react-native-maps/react-native-maps/blob/master/docs/polyline.md)
- [Circle](https://github.com/react-native-maps/react-native-maps/blob/master/docs/circle.md)
- [Overlay](https://github.com/react-native-maps/react-native-maps/blob/master/docs/overlay.md)
- [Heatmap](https://github.com/react-native-maps/react-native-maps/blob/master/docs/heatmap.md)
- [Geojson](https://github.com/react-native-maps/react-native-maps/blob/master/docs/geojson.md)

### Styles

https://reactnative.dev/docs/view-style-props

backfaceVisibility
backgroundColor
borderColor
  borderBottomColor, borderEndColor, borderLeftColor, borderRightColor, borderStartColor, borderTopColor
borderWidth
  borderBottomWidth, borderEndWidth, borderLeftWidth, borderRightWidth, borderStartWidth, borderTopWidth
borderStyle
  borderRadius, borderBottomEndRadius, borderBottomLeftRadius, borderBottomRightRadius, borderBottomStartRadius, borderTopEndRadius, borderTopLeftRadius, borderTopRightRadius, borderTopStartRadius
opacity
flex, flexBasis, flexDirection, flexGrow, flexShrink, flexWrap
alignContent, justifyContent
alignItems: flex-start, flex-end, center, stretch, baseline
alignSelf: auto, flex-start, flex-end, center, stretch, baseline
aspectRatio: number
direction
display
start, end
left, right
top, bottom
width, height
minWidth, maxWidth
minHeight, maxHeight
overflow
margin, marginBottom, marginEnd, marginHorizontal, marginLeft, marginRight, marginStart, marginTop, marginVertical
padding, paddingBottom, paddingEnd, paddingHorizontal, paddingLeft, paddingRight, paddingStart, paddingTop, paddingVertical
position
zIndex, elevation

-----

color
fontFamily
fontSize
fontStyle: normal, italic
fontVariant: small-caps, oldstyle-nums, lining-nums, tabular-nums, proportional-nums
fontWeight
includeFontPadding: true/false
letterSpacing
lineHeight
textAlign: auto, left, right, center, justify
textAlignVertical: auto, top, bottom, center
textDecorationColor
textDecorationLine
textDecorationStyle
textTransform
writingDirection

-----

shadowColor, shadowOffset, shadowRadius, shadowOpacity
textShadowColor, textShadowOffset, textShadowRadius

-----

backgroundColor
overlayColor
resizeMode
tintColor

# React Native

React Native is an easy way to build native iOS/Android (also Windows, macOS, web) using JavaScript and React.

With https://expo.io the steps are easy:

1. Update expo-cli with `npm install -g expo-cli`
1. Create a new app (`expo init`)
2. Run it on device or simulator (`expo start`)
3. Publish it to Expo.io (`expo publish`)
4. Bundle it as native iOS/Android app (`expo build:ios`/`expo build:android`)


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

	cd MyReactNativeApp
	yarn start  # or: npm start, expo start

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

expo.Font

	import { Font } from 'expo'

	async componentDidMount () {
	  await Font.loadAsync({
	    'vollkorn-regular': require('../assets/fonts/Vollkorn-Regular.ttf')
	  })
	  this.setState({ fontsLoaded: true })
	}

	{this.state.fontsLoaded ? <Text style={styles.headline}>My Headline</Text> : null}

	const styles = StyleSheet.create({
	  headline: {
	    fontFamily: 'vollkorn-regular'
	  }
	})

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

# React Native

React Native is an easy way to build native iOS/Android (also Windows, macOS, web) using React.

With https://expo.io the steps are easy:

1. Create a new app (`expo init`)
2. Run it on device or simulator (`expo start`)
3. Publish it to Expo.io (`expo publish`)
4. Bundle it as native iOS/Android app (`expo build`)


## Read more

- Official getting started: https://facebook.github.io/react-native/docs/getting-started.html
- Guide: https://hackernoon.com/learning-react-native-where-to-start-49df64cf14a2
- Coding guidebook: http://www.reactnativeexpress.com


## Getting started

### Expo client

Install https://expo.io client on your device.

### How to run

	yarn global add expo-cli  # or: npm install -g expo-cli

	expo init MyReactNativeApp

	cd MyReactNativeApp
	yarn start  # or: npm start, expo start


## Components

### Structure

	import React from 'react'
	import { StyleSheet, Text, View, Button } from 'react-native'

	export default class App extends React.Component {
	  render () {
	    return (
	      <View style={styles.container}>
	        <Text>Welcome to My App</Text>
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


## Modules

### Component libraries

- https://github.com/callstack/react-native-paper

### Routing/Navigation

https://reactnavigation.org/

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

	this.props.navigation.replace('Screen2')

#### Screen header config

	static navigationOptions = ({ navigation }) => {
	  return {
	    headerTitle: 'Title',
	    headerRight: (
	      <Button
	        title='+1'
	        color='#fff'
	      />
	    ),
	  }
	}

### Save state

https://facebook.github.io/react-native/docs/asyncstorage

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

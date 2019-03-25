# React Native

## Getting started

- Official getting started: https://facebook.github.io/react-native/docs/getting-started.html
- Guide: https://hackernoon.com/learning-react-native-where-to-start-49df64cf14a2
- Coding guidebook: http://www.reactnativeexpress.com

## Expo client

Install https://expo.io client on your device.

## How to run

	yarn global add expo-cli  # or: npm install -g expo-cli

	expo init MyReactNativeApp

	cd MyReactNativeApp
	yarn start  # or: npm start, expo start

## Component libraries

- https://github.com/callstack/react-native-paper

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

- constructor()
- componentWillMount()
- render()
- componentDidMount()

Updating methods:

- componentWillReceiveProps()
- shouldComponentUpdate()
- componentWillUpdate()
- componentDidUpdate()

Unmounting methods:

- componentWillUnmount()

Error handling methods:

- componentDidCatch()

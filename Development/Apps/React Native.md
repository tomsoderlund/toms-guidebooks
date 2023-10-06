# React Native

React Native is an easy way to build native iOS/Android (also Windows, macOS, web) using JavaScript and React.

With Expo (https://expo.io) the steps are easy:

(First: update `expo-cli`, see “Upgrade Expo” below)

1. Create a new app (`expo init [project-name]`)
2. Run it on device or simulator (`expo start`)
3. Publish it to Expo.io (`expo publish`)
4. Build it as native iOS/Android app with EAS
5. Add extra packages (location) with `expo install` NOT npm/yarn.


## Read more

- Official getting started: https://facebook.github.io/react-native/docs/getting-started.html
- Guide: https://hackernoon.com/learning-react-native-where-to-start-49df64cf14a2
- Coding guidebook: http://www.reactnativeexpress.com


## Getting started

### Expo client

Install https://expo.io client on your device.

### Upgrade Expo

	# npm install -g expo-cli
	yarn global add expo-cli

	yarn global add eas-cli

	expo upgrade

### How to run

Init app:

	expo init MyReactNativeApp

Templates:

- **Managed workflow**: you only write JavaScript / TypeScript and Expo tools and services take care of everything else for you.
- **Bare workflow**: you have full control over every aspect of the native project, and Expo tools and services are a little more limited.

	cd MyReactNativeApp
	yarn start  # or: npm start, expo start

### Nice-to-have’s after basic setup

Official TS Tabs template:

		mkdir assets
		mkdir -p components/__tests__
		mkdir constants
		mkdir hooks
		mkdir navigation
		mkdir screens

Tom’s:

		mkdir assets
		mkdir -p components/__tests__
		mkdir -p components/common
		mkdir screens
		mkdir -p screens/StartScreen
		touch screens/StartScreen/index.js
		mkdir navigation
		mkdir hooks
		mkdir lib
		mkdir config
		touch config/config.js
		mkdir types

#### Install useful packages

	yarn add standard --dev
	expo install expo-font
	yarn add @react-navigation/native

#### package.json

	"upgrade-expo": "npx expo-doctor; yarn; yarn api",
	"dev": "yarn start",
	"start": "expo start",
	"eject": "expo eject",
	"test": "echo 'Running Standard.js and Jasmine unit tests...\n' && yarn lint && yarn unit",
	"unit": "babel-node spec/run.js",
	"lint": "ts-standard",
	"fix": "ts-standard --fix",
	"news": "mkdir -p components/screens/New; cp components/screens/PlaceHolder.tsx components/screens/New.tsx; echo \"Now rename file 'components/screens/New.tsx' to whatever you want.\"",
	"newc": "cp components/common/Centered.tsx components/common/New.tsx; echo \"Now rename/move 'components/common/New.tsx' to whatever you want.\"",
	"newn": "cp components/navigators/OnboardingStackNavigator.tsx components/navigators/NewStackNavigator.tsx; echo \"Now rename/move 'components/navigators/NewStackNavigator.tsx' to whatever you want.\"",
	"pub": "expo publish",
	"build:ios": "eas build --platform ios",
	"build:android": "eas build --platform android",
	"submit:ios": "eas submit --platform ios --latest",
	"submit:android": "eas submit --platform android --latest",
	"submit:hotfix": "eas update",
	"api": "eval $(grep '^SUPABASE_URL' .env.local) && eval $(grep '^SUPABASE_API_KEY' .env.local) && npx openapi-typescript@5.4.0 ${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_API_KEY} --output types/supabase.ts"

### Installing packages

NOTE: use `expo install` primarily (rather than yarn/npm), e.g:

	expo install react-native-maps
	expo install expo-location
	expo install react-native-svg

	Managed:
	expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

	https://docs.expo.dev/ui-programming/react-native-toast/

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

#### Next.js issues

##### @expo/next-adapter/document.js: Missing class properties transform

yarn add babel-plugin-transform-class-properties --dev
Babel config

module.exports = {
	presets: ['@expo/next-adapter/babel'],
	plugins: ['@babel/plugin-proposal-class-properties']
}

##### React v17 issues, use v16.9

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

### Troubleshooting/issues

#### Fix Expo dependencies

	expo doctor --fix-dependencies

### Web development (react-native-web)

	expo start --web

Get web viewport size:

	import { Dimensions } from 'react-native'
	const { width, height } = Dimensions.get('window')


## Assets

- favicon.png: 48px
- icon.png: 1024px
- adaptive-icon.png: 1024px
- splash.png: 1284×2778px


## Components

### Structure

		import React from 'react'
		import { StyleSheet, Text, View, Button } from 'react-native'
		import logo from './assets/logo.png'

		export default class App extends React.Component {
			render () {
				return (
					<View style={styles.container}>
						<Text>Welcome to My App</Text>
						<Image source={logo} />
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

### Touch events

	<View
		onTouchStart={(e) => console.log('onTouchStart', [e.nativeEvent.locationX, e.nativeEvent.locationY])}
		onTouchMove={(e) => console.log('onTouchMove', [e.nativeEvent.locationX, e.nativeEvent.locationY])}
		onTouchEnd={(e) => console.log('onTouchEnd', [e.nativeEvent.locationX, e.nativeEvent.locationY])}
	/>


## Development mode

`__DEV__` variable: true/false


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

#### NavigationRoutes file

Purpose: avoid having unique strings in navigators and `navigate()`.

	enum NavigationRoutes {
		HomeScreen = 'HomeScreen',
		UserProfileScreen = 'UserProfileScreen'
	}

#### Navigate to other screen

	// navigate, push, replace. Also: dismiss, goBack, pop, popToTop, reset, setParams
	this.props.navigation.navigate(NavigationRoutes.UserProfileScreen, { someParam: 'Test' })

#### Header bar options and buttons

https://reactnavigation.org/docs/header-buttons/

		useLayoutEffect(() => {
			navigation.setOptions({
				headerShown: false,
				title: 'Edit glam',
				headerBackTitle: 'Back',
				headerStyle: { backgroundColor: COLOR_BLACK },
				headerTintColor: COLOR_WHITE,
				headerShadowVisible: false,
				headerLeft: null,
				headerRight: () => (
					<TextButton
						onPress={handleSaveGlam}
						title='Save'
						isPrimary
					/>
				)
			})
		}, [navigation])

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

https://reactnative.dev/docs/asyncstorage
-> https://github.com/react-native-async-storage/async-storage

	expo install @react-native-async-storage/async-storage

Code:

	import AsyncStorage from '@react-native-async-storage/async-storage'
	await AsyncStorage.setItem('@storage_Key', value)
	const value = await AsyncStorage.getItem('@storage_Key') // null if missing

Save navigation state:

https://reactnavigation.org/docs/state-persistence/

### Animations

Animated/LayoutAnimation

### Icons and SVGs

https://docs.expo.dev/ui-programming/using-svgs/

1. `Image` component
2. `import` SVG file from `assets` folder using https://github.com/kristerkari/react-native-svg-transformer
3. Inline:
	- Convert SVGs to React format using https://react-svgr.com/playground/?native=true
	- Use `react-native-svg`

Example 1: Image component

    <Image
      src='/images/logo.svg'
      alt='Logo'
      title='Logo'
      width={size}
      height={size}
    />

Example 2: SVG component

		import Logo from './assets/logo.svg'

		// Set fill="currentColor" in the SVG file
		<Logo width={120} height={40} color='black' />

Example 3: Inline

		import Svg, { Path } from 'react-native-svg'

		export default function TriangleDown() {
			return (
				<View style={styles.container}>
					<Svg
						width={20}
						height={20}
						viewBox='0 0 20 20'
					>
						<Path d='M16.993 6.667H3.227l6.883 6.883 6.883-6.883z' fill='#000' />
					</Svg>
				</View>
			)
		}

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

### Push notifications

- https://docs.expo.dev/push-notifications/overview/
- https://docs.expo.dev/push-notifications/faq/
- Old? https://blog.logrocket.com/create-send-push-notifications-react-native/

Test tool: https://expo.dev/notifications


## Deploying to app stores

### Deploying an iOS app on App Store with Expo Application Services (EAS)

https://expo.dev/eas

1. Install EAS: `yarn global add eas-cli && eas login`
2. Create `eas.json`
3. Create a new app on https://appstoreconnect.apple.com/apps – note the bundle ID (just characters, avoid underscore/dash, e.g. `com.mydomain.myappname`)
4. Update `app.json` to avoid “Missing Compliance” status in TestFlight: ```      "config": {
        "usesNonExemptEncryption": false
      }```
5. Set up and build with `eas build` (or `eas build -p ios`)
6. Submit with `eas submit` (or `eas submit -p ios`)

### `eas.json` – example

https://docs.expo.dev/build/eas-json/

	{
		"cli": {
			"version": ">= 0.53.0",
			"requireCommit": true
		},
		"build": {
			"development": {
				"developmentClient": true,
				"distribution": "internal"
			},
			"preview": {
				"distribution": "internal"
			},
			"production": {
			}
		},
		"submit": {
			"production": {
				"android": {
					"serviceAccountKeyPath": "./appstores/googleplay/pc-api-667.json",
					"track": "internal"
				},
				"ios": {
					"appleId": "[my appleid login-email]",
					"ascAppId": "[NUMERIC ID FROM appstoreconnect.apple.com]"
				}
			}
		}
	}

### Deploying an iOS app on App Store (OLD way with `expo build`)

1. Create your app on https://appstoreconnect.apple.com/
2. Enter the same app Bundle ID (also SKU) in `app.json`
3. Build with `expo build:ios` (option: `--clear-provisioning-profile`)
4. Upload IPA file with Application Loader on macOS (might need app-specific password on https://appleid.apple.com/)
5. App Store Connect takes ~1 hour to process a new build, then you can use TestFlight for testing.

#### Apple Certificates

https://developer.apple.com/account/resources/certificates/list

#### Apple ID (with Supabase)

- https://docs.expo.dev/versions/latest/sdk/apple-authentication/
- https://supabase.io/docs/guides/auth/auth-apple

Steps:

- App ID
	- https://developer.apple.com/account/resources/identifiers/list
	- `com.mydomain.myappname`
- Service ID
	- https://developer.apple.com/account/resources/identifiers/list (select "Service IDs" in top-right dropdown)
	- `com.mydomain.myappname.login`
	- Domain: [APP-ID].supabase.co
	- Return URLs: https://[APP-ID].supabase.co/auth/v1/callback
	- Callback URL: https://[APP-ID].supabase.co/auth/v1/callback
- Key
	- https://developer.apple.com/account/resources/authkeys/list


### Deploying an Android app on Google Play

- Docs: https://docs.expo.dev/submit/android/
- Set up your app on https://play.google.com/console/
- `app.json`: you need `expo.android.versionCode` (integer). Suggestion: version `0.4.3` -> `"versionCode": 1000004003`
- Set the Privacy Policy in Dashboard → Privacy Policy (old: Policy → App Content)
- First time: upload AAB file manually to Play Console

#### Service Account for EAS submissions

**Note:** You can use a **shared** service account for all your apps

- Create Service Account: https://expo.fyi/creating-google-service-account
- API Access: https://play.google.com/console/developers/[YOUR-ID]/api-access
- Set permissions and invite Service Account user
- Place JSON key in `mkdir -p appstores/googleplay` folder (optional: `.gitignore` this file)
- Update `eas.json`:

```
"submit": {
	"production": {
		"android": {
			"track": "internal",
			"releaseStatus": "draft",
			"serviceAccountKeyPath": "./appstores/googleplay/pc-api-9052926321037412225-601-6bf892805fe0.json"
		}
	}
}
```

#### Google Play: “No deobfuscation file”

> There is no deobfuscation file associated with this App Bundle. If you use obfuscated code (R8/proguard), uploading a deobfuscation file will make crashes and ANRs easier to analyze and debug. Using R8/proguard can help reduce app size.

https://stackoverflow.com/questions/73193134/obfuscate-an-expo-file

### Using GitHub Actions with Expo/EAS

https://github.com/marketplace/actions/expo-github-action

1. Verify you have set up `eas.json`
2. Create a `.github/workflows/production.yml` (see below)
3. Get a token on https://expo.dev/accounts/[account]/settings/access-tokens and add `EXPO_TOKEN` to repo settings → Secrets → Actions
4. Run EAS build non-interactive from command line the first time to set up accounts etc: `eas build --platform ios`
5. For `eas submit`, you need 1) an ASC API key and 2) an Issuer ID from: https://appstoreconnect.apple.com/access/api

		mkdir -p .github/workflows; touch mkdir -p .github/workflows/production.yml

Example `.github/workflows/production.yml`:

	# Commit to `production` branch → build with EAS

	on:
		push:
			branches:
				- production

	jobs:
		build:
			runs-on: ubuntu-latest
			steps:
				- name: 🏗 Setup repository
					uses: actions/checkout@v2

				- name: 🏗 Setup Node
					uses: actions/setup-node@v2
					with:
						node-version: 16.x
						cache: yarn

				- name: 🏗 Setup Expo and EAS
					uses: expo/expo-github-action@7.2.0
					with:
						expo-version: latest
						eas-version: latest
						token: ${{ secrets.EXPO_TOKEN }}

				- name: 📦 Install dependencies
					run: yarn install

				- name: 🚀 Publish app to Expo
					run: expo publish --non-interactive

				- name: 🛠️ Build app
					run: eas build --non-interactive --platform ios

				- name: 🚚 Submit app to TestFlight
					run: eas submit --latest --platform ios


## Running native libraries outside of Expo Go

Build Xcode project etc:

	npx expo prebuild --platform ios

### On Simulator

	npx expo run:ios

### On device

Start server:

	npx expo run:ios --device

## Styles

https://reactnative.dev/docs/view-style-props

### Flexbox

https://reactnative.dev/docs/layout-props

https://medium.com/wix-engineering/the-full-react-native-layout-cheat-sheet-a4147802405c

- `justifyContent`: primary axis
- `alignItems`: cross (secondary) axis
	- `alignContent`: bunches children together as if they were one element
	- `alignSelf`: overwrites parent’s `alignItems` property
- `flexDirection`: column*/row
- `flexWrap`: nowrap*/wrap

On children:

- `flex: 1`

Styles:

	flex, flexBasis, flexDirection, flexGrow, flexShrink, flexWrap
	alignContent, justifyContent
	alignItems: flex-start, flex-end, center, stretch, baseline
	alignSelf: auto, flex-start, flex-end, center, stretch, baseline

### Responsive design in React Native

https://medium.com/@shanerudolfworktive/7-tips-to-develop-react-native-uis-for-all-screen-sizes-7ec5271be25c

- `aspectRatio` on styles.
- `flex: X`/`flex: Y` for proportions.

https://github.com/DaniAkash/react-native-responsive-dimensions

	import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
	// in styles:
	height: responsiveHeight(50), // 50% of screen height


## Components and Libraries

### Open web links

	import * as WebBrowser from 'expo-web-browser'

	await WebBrowser.openBrowserAsync(url)

### Animations

React Native provides two complementary animation systems:

1. `Animated` for granular and interactive control of specific values
2. `LayoutAnimation` for animated global layout transactions

`Animated` example:

	// From: https://reactnative.dev/docs/animations
	import React, { useRef, useEffect } from 'react'
	import { Animated } from 'react-native'
	
	interface AnimationFadeInProps {
	  duration?: number
	  children: React.ReactNode
	  style?: any
	}
	
	const AnimationFadeIn = ({ duration = 2500, children, style }: AnimationFadeInProps): React.ReactElement => {
	  const fadeAnim = useRef(new Animated.Value(0)).current // Initial value for opacity: 0
	
	  useEffect(() => {
	    Animated.timing(
	      fadeAnim,
	      {
	        toValue: 1,
	        duration
	      }
	    ).start()
	  }, [fadeAnim])
	
	  return (
	    <Animated.View // Special animatable View
	      style={{
	        ...style,
	        opacity: fadeAnim // Bind opacity to animated value
	      }}
	    >
	      {children}
	    </Animated.View>
	  )
	}
	
	export default AnimationFadeIn

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

### 3D, VR, AR

3D:

- https://github.com/pmndrs/react-three-fiber

AR:

- https://arvrjourney.com/augmented-reality-with-react-native-15219f36e3f2
- https://github.com/expo/expo-three-ar
- https://github.com/pmndrs/react-xr → https://github.com/pmndrs/react-xr/discussions/156

### Payments with RevenueCat

- **iOS:**
	- Set up IAP products first in App Center, with Product ID e.g. “credits50”.
		- Make sure to fill out all fields including testing fields, so the status is “Ready for Review”.
- **Android:** Monetize → Products
- Then import into “Products” in RevenueCat
- Then create Offering with a **shared identifier** e.g. “credits”
	- Create new packages (e.g. “credits-50”) inside the Offering, and _attach_ the two Products for iOS/Android
- “Entitlements” is used for subscriptions

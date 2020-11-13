# Cordova/PhoneGap

https://cordova.apache.org/docs/en/latest/guide/cli/

## Install Cordova

  sudo npm install -g cordova
  sudo npm update -g cordova

## Create app

  cordova create weathertroll io.weld.weathertroll "Vädertrollet"
  cordova create hello com.example.hello HelloWorld

## Platforms

  cordova platform add ios --save
  cordova platform add android --save

  cordova platform remove android --save
  cordova platform update android --save # When done changes to global config

## Plugins

https://cordova.apache.org/plugins/

  cordova plugin add cordova-plugin-splashscreen --save # https://github.com/apache/cordova-plugin-splashscreen
  cordova plugin add cordova-plugin-camera --save
  cordova plugin add cordova-plugin-inappbrowser --save
  cordova plugin remove cordova-plugin-inappbrowser

https://github.com/phonegap/phonegap-plugin-push

### Browser for testing

  cordova platform add browser
  cordova platform remove ios
  cordova run browser

## Build app

  cordova build # =cordova prepare + cordova compile
  cordova emulate android # On emulator (including prepare & compile)
  cordova run android # On device (including prepare & compile)

  cordova prepare # Transforms config.xml metadata to platform-specific manifest files, copies icons & splashscreens, copies plugin files for specified platforms so that the project is ready to build with each native SDK.
  cordova compile # Only performs the compilation step without doing prepare

## Running in emulators

  cordova emulate ios --list

  cordova emulate ios --target="iPhone-5s, 10.2"
  cordova emulate ios --target="iPhone-7, 10.2"

  cordova emulate android --target="Nexus_S_API_24"
  cordova emulate android --target="Denver_tablet"

  cordova run android # reinstall, not restart emulator

## Running on device

  cordova run android --device
  cordova run ios --device

## Debugging

iOS: inspect via Safari desktop browser, Develop -> Simulator

Android: inspect via Chrome desktop browser, chrome://inspect

https://github.com/phonegap/phonegap/wiki/Debugging-in-PhoneGap

## Build release package

Release build signed .apk (Android) or .ipa (IOS):

  cordova build android --device --release --buildConfig=build-release.json
  cordova build ios --device --release --buildConfig=build-release.json

## Icons & Splash screen

  <icon src="res/icon.png" />


  cordova plugin add cordova-plugin-splashscreen --save # https://github.com/apache/cordova-plugin-splashscreen

  <platform name="android">
      <splash src="res/splash_madeinweld.png" />
  </platform>
  <platform name="ios">
      <splash src="res/splash_madeinweld.png" />
  </platform>

## Boilerplate code

### config.xml

<?xml version='1.0' encoding='utf-8'?>
<widget id="io.weld.codewriter" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
  <name>Codewriter</name>
  <description>Simple JavaScript code writer and tester.</description>
  <author email="tech@weld.io" href="https://www.weld.io">Weld team</author>
  <content src="index.html"/>
  <plugin name="cordova-plugin-whitelist" spec="1"/>
  <access origin="*"/>
  <allow-intent href="http://*/*"/>
  <allow-intent href="https://*/*"/>
  <allow-intent href="tel:*"/>
  <allow-intent href="sms:*"/>
  <allow-intent href="mailto:*"/>
  <allow-intent href="geo:*"/>
  <platform name="android">
    <allow-intent href="market:*"/>
  </platform>
  <platform name="ios">
    <allow-intent href="itms:*"/>
    <allow-intent href="itms-apps:*"/>
  </platform>
  <engine name="ios" spec="~4.3.1"/>
  <icon src="res/icon.png"/>
</widget>


### index.html

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <title>My App</title>
  </head>
  <body>
    <div class="app">
      <p>My App</p>
    </div>
    <script type="text/javascript" src="cordova.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
  </body>
</html>

### index.css

* {
  -webkit-tap-highlight-color: rgba(0,0,0,0); /* make transparent link selection, adjust last value opacity 0 to 1.0 */
}

body {
  -webkit-touch-callout: none;    /* prevent callout to copy image, etc when tap to hold */
  -webkit-text-size-adjust: none; /* prevent webkit from resizing text to fit */
  -webkit-user-select: none;      /* prevent copy paste, to allow, change 'none' to 'text' */
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: whitesmoke;
  color: darkslategray;
  font-family: 'HelveticaNeue-Light', 'HelveticaNeue', Helvetica, Arial, sans-serif;
  font-size: 16px;
}

/* Portrait layout (default) */
.app {
  width: 100%;
  height: 100%; 
  /* Flexbox: */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Landscape layout (with min-width) */
@media screen and (min-aspect-ratio: 1/1) and (min-width: 400px) {
  .app {
  }
}

### index.js

'use strict';

var app = {

  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  // Bind any cordova events here, e.g: 'pause', 'resume', etc.
  onDeviceReady: function() {
    console.log('My App: deviceready');
  },

};

app.initialize();

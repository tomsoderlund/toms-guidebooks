# React Native

1. Easy new way: create-react-native-app (then need to "eject" to make Xcode bundle)
2. Harder old way: react-native

## Install create-react-native-app

	npm install -g create-react-native-app
	yarn global add create-react-native-app

## Create new

	create-react-native-app MyApp
	cd MyApp
	yarn start

## Run

	// Starts the development server so you can open your app in the Expo app on your phone.
	yarn start

	// Starts the development server and loads your app in an iOS simulator.
	yarn run ios

	// Starts the development server and loads your app on a connected Android device or emulator.
	yarn run android

	// Starts the test runner.
	yarn test

	// Removes this tool and copies build dependencies, configuration files and scripts into the app directory. If you do this, you can’t go back!
	// Note that using `yarn start` will now require you to run Xcode and/or Android Studio to build the native code for your project.
	yarn run eject

## Add popular components

	yarn add react-navigation
	yarn add react-native-elements


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


------------------------------------------------------------------------


# HOW TO DEVELOP ON THE IPHONE

## Issues when installing on device:

Check that iPhone Profile has been installed (in the Organizer, Window menu -> Organizer).

Project properties (Project icon -> Get Info):
Check "Code Signing Identity", that the right iPhone Profile is selected.

Info.plist:
"Bundle identifier", should be:
	com.adifferentgame.${PRODUCT_NAME:identifier}

"Base SDK Missing"
Check targets -> info


## Xcode Templates

(in Xcode.app):
/Library/Developer/Xcode/Templates/


## Simulator

// Check of running on Simulator
#if !(TARGET_IPHONE_SIMULATOR)
	// Device
#else
	// Simulator
#endif


## Managed Object Accessor Methods

//.h
@property (nonatomic, retain) GameCharacter* selectedCharacter;
//.m
@synthesize selectedCharacter;

assign/retain/copy // "retain" will release old object
readonly/readwrite
nonatomic // for object types
strong // replacement for the retain attribute, as part of Objective-C Automated Reference Counting (ARC). In non-ARC code it's just a synonym for retain.
getter=newName
setter=setterName


## Remove ARC for files

-fno-objc-arc


## Program Flow, Loops etc

if (touchPoint.y < viewController.view.bounds.size.height * 1.0/3.0) {
		NSLog(@"Top");
}
else if (touchPoint.y > viewController.view.bounds.size.height * 2.0/3.0) {
		NSLog(@"Bottom");
}
else {
		NSLog(@"Middle");
}


switch (expression) {
	case match1: {
		statements
		break;
	}
	case match2:
		statements
		break;
	default:
		statements
		break;
}


int i = 10;
do
{
			 i--;
} while (i > 0)


while ( myCount < 100 )
{
			myCount++;
}


## Try and Catch

@try {
		a = [test characterAtIndex:index];
}
@catch (NSException *exception) {
		NSLog(@"%@", exception.reason);
}
@finally {
		NSLog(@"Char at index %d cannot be found", index);
		NSLog(@"Max index is: %d", [test length]-1);
}

## Nil & Null

nil (all lower-case) is a null pointer to an Objective-C object.
Nil (capitalized) is a null pointer to an Objective-C class.
NULL (all caps) is a null pointer to anything else.

if (title == (id)[NSNull null] || title.length == 0 ) title = @"Something";

// This doesn't work for null objects, only nil objects
if (!myobject)


## bool & BOOL

BOOL = Objective-C, bool = C


## Numbers

int myInt = (int) myFloat;
float myFloat = (float) myInt;

// Naive Min/Max
#define MIN(a,b)    ((a) < (b) ? (a) : (b))
#define MAX(a,b)    ((a) > (b) ? (a) : (b))

// Get random value between 0 and 99
int x = (arc4random() % 100);
// Get random number between 500 and 1000
int y = 500 + (arc4random() % 501);

__block int rowNr = 0;
// In loop:
rowNr += 1;


## Strings

length = [myString length];

[NSString stringWithFormat:@"%@, %@, %@", three, two, one];

if ([string hasSuffix:@"y"])
NSString *s = @"avant";
s = [s stringByAppendingString:@" - après"];
// or
[NSString stringWithFormat:@"%@/%@/%@", three, two, one];

NSString *lower = [myString lowercaseString];

if ([returnedString isEqualToString:@"thisString"])
		NSLog(@"Equal");
else
		NSLog(@"Not Equal");

// Substrings

str = [str substringToIndex: MIN(15, [str length])];
[@"abc xyz http://www.abc.com aaa bbb ccc" substringWithRange:NSMakeRange(8, 18)]

// Split:
NSString *string = @"oop:ack:bork:greeble:ponies";
NSArray *array = [string componentsSeparatedByString: @":"];
// Join
NSString *string2 = [array componentsJoinedByString: @":"];

// Search

// NSRange has location, length
NSRange searchRange = [bigString rangeOfString:stringToFind options:NSCaseInsensitiveSearch];
if (searchRange.location != NSNotFound) {
	// Found something!
}

// Backwards/reverse search
[@"abc def ghi abc def ghi" rangeOfString:@"abc" options:NSBackwardsSearch];

// Search & Replace
tempString = [tempString stringByReplacingOccurrencesOfString:@"oldText" withString:@"newText"];

NSRange endRange = [original rangeOfString:@"End."];
NSRange searchRange = NSMakeRange(0, endRange.location);
NSString *noBrackets = [original stringByReplacingOccurrencesOfString:@"\[" withString:@"" options:0 range:searchRange];


## Arrays

strings = [NSArray array];

array = [[NSMutableArray alloc] initWithCapacity:4];
array.count;

NSArray *array = [NSArray arrayWithObjects: @"NameRowA",@"NameRowB",@"NameRowC", nil];

obj = [array objectAtIndex:2];

insertObject:atIndex:
removeObjectAtIndex:
addObject: // [array addObject:@"Ett"];
removeLastObject
replaceObjectAtIndex:withObject:

__block int rowNr = 0;
for (NSObject* o in array1) {
	rowNr += 1;
	NSLog(@"%@", o);
}

## Hashtables/Dictionaries

NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
[dictionary setObject:anObj forKey:@"foo"];
[dictionary objectForKey:@"foo"];
[dictionary removeObjectForKey:@"foo"];
[dictionary release];


## Date & Time

// Get current date as string
NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
[dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
NSString* dateString = [dateFormatter stringFromDate:[NSDate date]];
[dateFormatter release];  // Remove if ARC. You might want to keep the formatter if you're doing this a lot.

// Rails
// 2012-07-25T12:32:28+02:00 -> remove colons first

// Date to String
NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
[dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
NSString *dateString=[dateFormatter stringFromDate:[NSDate date]];

// String to Date
NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
[dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
NSDate *myDate =[dateFormatter dateFromString:dateString];

// Rails date
NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
[dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZ"];
NSLog(@"DATE FORMAT:%@", [dateFormatter dateFromString:@"2008-12-29T00:27:42-0800"]);

// Time Zones
NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
[dateFormatter setTimeZone:[NSTimeZone timeZoneWithName:@"UTC"]];


## Class check

[myObject isKindOfClass:[NSString class]]

if (self == (MyClass*)0x5633b0)
	NSLog(@"Allocated object at address 0x5633b0");  // put a breakpoint on this line


#import <objc/runtime.h>

const char* className = class_getName([yourObject class]);
NSLog(@"Object is of class: %s", className);


## Methods

+ min:(int)a :(int)b;
...
[Utils min:a :b]


## Super Class

- (void)viewDidLoad {
	[super viewDidLoad];
}


## Class Properties & Methods

static NSString * const kAFIncrementalStoreExampleAPIBaseURLString = @"http://localhost:5000";


// Header
+ (SongAPIClient *)sharedClient;

// Implementation
+ (SongAPIClient *)sharedClient {
	static SongAPIClient *_sharedClient = nil;
	static dispatch_once_t onceToken;
	dispatch_once(&onceToken, ^{
		_sharedClient = [[self alloc] initWithBaseURL:[NSURL URLWithString:kAFIncrementalStoreExampleAPIBaseURLString]];
	});
	return _sharedClient;
}


## Constructors

- (id) init {
	self = [super init];
	if (self != nil) {
		// initializations go here.
	}
	return self;
}


## Protocols

@protocol NewsViewController <NSObject>
//@optional
- (void) newDataAvailable:(NSArray*)data;
@end


## Exceptions

[NSException raise:@"Invalid foo value" format:@"foo of %d is invalid", foo];


## IBOutlet and IBAction

### MyViewController.h

@interface FirstViewController : UIViewController

@property (strong, nonatomic) NSMutableArray* allExistingPlayersData;
@property (nonatomic, retain) IBOutlet UITextField* searchTextField;
@property (nonatomic, retain) IBOutlet UIButton* searchButton;
@property (nonatomic, retain) IBOutlet UILabel *statusLabel;
@property (weak, nonatomic) IBOutlet UIButton *startButton;

- (IBAction) doActionEvent:(id)sender;

@end


### MyViewController.m

@synthesize searchTextField;
@synthesize searchButton;

- (IBAction) doActionEvent {
	// Do something
}


## UI elements - UIView

targetView.hidden = YES;

urlField.text = @"Hello!";

[CLName setStringValue:name];

// Position and Size
viewController.view.bounds.position.x
viewController.view.bounds.size.height


## Selectors

[newSprite runAction:[CCSequence actions: action, [CCCallFuncN actionWithTarget:self selector:@selector(myCustomMethod:)], nil]];

-(void)myCustomMethod: (id)node {
}

runAction:[CCSequence actions: action, [CCCallFuncN actionWithTarget:self selector:@selector(removeRing:)], nil]


## Events


## Timers

updateTimer = [NSTimer scheduledTimerWithTimeInterval:1.5 target:self selector:@selector(onTimerUpdate:) userInfo:nil repeats:YES];

- (void)onTimerUpdate:(NSTimer*)timer {
}

[updateTimer invalidate];
updateTimer = nil;


## Animations

// Simple
[UIView beginAnimations:nil context:NULL];
[UIView setAnimationDuration:2];
[view1 setAlpha:0.00];
[UIView commitAnimations];

// Linked
- (void) fadeOut:(NSString *)animationID finished:(NSNumber *)finished context:(void *)context {
		[UIView beginAnimations:nil context:NULL];
		[UIView setAnimationDuration:2];
		[UIView  setAnimationDelegate:self];
		if(animationRunning){
				[UIView setAnimationDidStopSelector:@selector(fadeIn:finished:context:) ];
		}
		[view1 setAlpha:0.00];
		[UIView commitAnimations];
}

- (void) fadeIn:(NSString *)animationID finished:(NSNumber *)finished context:(void *)context {
		[UIView beginAnimations:nil context:NULL];
		[UIView setAnimationDuration:2];
		[UIView  setAnimationDelegate:self];
		if(animationRunning){
				[UIView setAnimationDidStopSelector:@selector(fadeOut:finished:context:) ];
		}
		[view1 setAlpha:1.00];
		[UIView commitAnimations];
}

[self fadeOut:nil finished:nil context:nil];


## Images - UIImage

[countDownImage setImage:[UIImage imageNamed:@"firstLaunch.png"]];


## CAF Sound Files

afconvert -f caff -d ima4 in.wav out.caf
//afconvert -f caff -d LEI16@44100 -c 1 in.wav out.caf


## User Preferences/Settings

// Read
NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
NSString *userName = [prefs stringForKey:@"userName"];

// Write
NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
[prefs setObject:userName forKey:@"userName"];
[prefs synchronize];

NSInteger myInt = [prefs integerForKey:@"integerKey"];
float myFloat = [prefs floatForKey:@"floatKey"];

[prefs setInteger:42 forKey:@"integerKey"];
[prefs setDouble:3.1415 forKey:@"doubleKey"];
[prefs setFloat:1.2345678 forKey:@"floatKey"];


## Memory management: Alloc, Release, Dealloc

alloc <-> release
For every 'alloc', a 'release' - 'dealloc' happens automatically.
http://stackoverflow.com/questions/3342129/iphone-release-dealloc

Memory leaks happens when a code does a “new”, “malloc”, or “alloc”,
but never does a corresponding “delete”, “free” or “release” respectively.
http://mobileorchard.com/find-iphone-memory-leaks-a-leaks-tool-tutorial/

create object (alloc, new, copy): retain count = 1
retain: retain count +1
release: retain count -1
autorelease: retain count -1 at some stage in the future
retain count = 0 --> deallocated


## Pragma Marks

#pragma mark CCGLView - Mouse events


##  Debugging

http://www.cocoadev.com/index.pl?DebuggingTechniques

NSLog(@"Current object: %@", self);


### Debugging spurious retains/releases in 3 easy steps
http://stackoverflow.com/questions/3791302/why-is-my-objective-c-object-being-deallocated
 
 1. Override -retain, -release, and -autorelease for the class you are interested in. Make them log a message (NSLog(@"%@ %s", self, sel_getName(_cmd))) and super-call.
 2. Breakpoint all these methods (at the super-call, i.e. after the log message so you know which object it is). Edit the breakpoint; add the command "bt" and check the auto-continue box (or just use two commands "bt", "continue").
 3. Clear the log. Run the app. Print out the log. Stick it to a whiteboard. Draw some arrows until you find the spurious release/autorelease.

- (id)retain {
	NSLog(@"%@ %s", self, sel_getName(_cmd));
	return [super retain];
}

- (oneway void)release {
	NSLog(@"%@ %s", self, sel_getName(_cmd));
	return [super release];
}

- (id)autorelease {
	NSLog(@"%@ %s", self, sel_getName(_cmd));
	return [super autorelease];
}


### GDB Debugging

print-object anObj
print-object [anObj description]
print-object [nsStr stringByAppendingString:@" yes"]
print (int) [@"John Galt" length]
print (char *) [nsStr UTF8String]

other commands:
bt - backtrace
call [exp]: Calls the function
set [var] = [exp]
whatis [variable]: print details about variable
help
info symbol 0x5633b0
info malloc-history 0x5633b0
More: http://www.freebsd.org/doc/en/books/developers-handbook/debugging.html


---------------

# Web Development

NOTE: replace on with live in older JQuery

// Disable iOS Safari links: http://stackoverflow.com/questions/2898740/iphone-safari-web-app-opens-links-in-new-window
$(document).ready(function(){
		if (("standalone" in window.navigator) && window.navigator.standalone) {
			// For iOS Apps
			$('a').on('click', function(e){
				e.preventDefault();
				var new_location = $(this).attr('href');
				if (new_location != undefined && new_location.substr(0, 1) != '#' && $(this).attr('data-method') == undefined){
					window.location = new_location;
				}
			});
		}
});


# Icons & Splash

<!-- iOS Device Startup Images -->
<!-- iPhone/iPod Touch Portrait – 320 x 460 (standard resolution) -->
<link rel="apple-touch-startup-image" href="images/ios/apple-startup_320x460.png" media="screen and (max-device-width: 320px) and (-webkit-min-device-pixel-ratio: 1)" />
<!-- iPhone/iPod Touch (high-resolution) Portrait – 640 x 920 pixels -->
<link rel="apple-touch-startup-image" href="images/ios/apple-startup_640x920.png" media="screen and (max-device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)" />
<!-- iPad Landscape 1024x748 -->
<link rel="apple-touch-startup-image" sizes="1024x748" href="images/ios/apple-startup_1024x748.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio: 1)" />
<!-- iPad Portrait 768x1004 -->
<link rel="apple-touch-startup-image" sizes="768x1004" href="images/ios/apple-startup_768x1004.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait) and (-webkit-min-device-pixel-ratio: 1)"/>
<!-- iPad (high-resolution Landscape – 2048 x 1496 pixels ) -->
<link rel="apple-touch-startup-image" sizes="2048x1496" href="images/ios/apple-startup_2048x1496.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio: 2)" />
<!-- iPad (high-resolution) Portrait – 1536 x 2008 pixels -->
<link rel="apple-touch-startup-image" sizes="1536x2008" href="images/ios/apple-startup_1536x2008.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio: 2)" />

<!-- iOS Icons -->
<link rel="apple-touch-icon" href="images/ios/icon-57.png" />
<link rel="apple-touch-icon" sizes="72x72" href="images/ios/icon-72.png" />
<link rel="apple-touch-icon" sizes="114x114" href="images/ios/icon-114.png" />
<link rel="apple-touch-icon" sizes="144x144" href="images/ios/icon-144.png" />

---------------

Objective-C

http://developer.apple.com/documentation/Cocoa/Conceptual/ObjectiveC/

Cocoa

http://developer.apple.com/referencelibrary/GettingStarted/GS_Cocoa/
http://developer.apple.com/reference/Cocoa/

iPhone API Reference

http://www.cocoadev.com/index.pl?UIKit
http://iphonedevdocs.com/forum/archive/index.php/f-3.html
http://ericasadun.com/iPhoneDocs/hierarchy.html
http://www.lucasnewman.com/iphone/


Hello World example

http://iphone.fiveforty.net/wiki/index.php/UIKit_Hello_World


More Examples

http://phonedev.tumblr.com


Icons

http://blog.jotlet.net/?p=47


Fonts

* American Typewriter + Condensed
* Arial
* Arial Rounded MT Bold
* Courier New
* Georgia
* Helvetica
* Marker Felt
* Times New Roman
* Trebuchet MS
* Verdana
* Zapfino

http://daringfireball.net/misc/2007/07/iphone-osx-fonts


# iPhone Usability



https://developer.apple.com/iphone/library/documentation/UserExperience/Conceptual/MobileHIG/DesigningNativeApp/chapter_5_section_4.html

Platform Differences:
	1. Compact Screen Size
	2. Memory is Not Unlimited
	3. One Window at a Time
	4. One Application at a Time
	5. Minimal User Help

Extra:
Use a minumum of text
Save where you were: save the current state when stopping, at the finest level of detail possible. For example, if your application displays scrolling data, save the current scroll position.


Game = "Immersive Application"


Human Interface Principles: Creating a Great User Interface:

Metaphors: e.g. playback controls, tapping controls to make things happen, sliding on-off switches.
Direct Manipulation: result of the user’s action is immediately apparent.
See and Point: presenting choices or options in list form, so users can easily scan them and make a choice.
Feedback: users need immediate feedback when they operate controls and ongoing status reports during lengthy operations.
User Control: allow users, not your application, to initiate/control/stop actions.
Aesthetic Integrity: in an immersive application, users expect a beautiful appearance that promises fun and encourages discovery.



Incorporate Characteristics of Great iPhone Applications:
- Build in Simplicity and Ease of Use
- Focus on the Primary Task
- Communicate Effectively 

Support Gestures Appropriately
	Drag	To scroll or pan.
	Flick	To scroll or pan quickly.
	Swipe	In a table-view row, to reveal the Delete button.
	Double tap	To zoom in and center a block of content or an image. To zoom out (if already zoomed in).
	Pinch open	To zoom in.
	Pinch close	To zoom out.
	Touch and hold	In editable text, to display a magnified view for cursor positioning.

GUI items:
	The Status Bar: can be hidden, but then users won't see battery status etc.
	Navigation Bars
	Toolbars
	Tab Bars

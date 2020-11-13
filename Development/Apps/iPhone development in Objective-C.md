# iPhone development in Objective-C

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

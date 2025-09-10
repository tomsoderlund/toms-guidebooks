# iPhone development in Swift

## Templates

Apps:

- SwiftUI newer
- UIKit older

Game:

- SpriteKit: Best for 2D games, bitmap or vector.
- SceneKit: Best for simple 3D.
- RealityKit: Best for AR.
- Metal: Lowest-level, for pros who need max performance and custom rendering.

## `import`

Key Concepts of import in Swift

1. Swift Standard Library is always available

You don’t need to import Foundation, CoreGraphics, or Swift explicitly just to use things like CGPoint, String, Array, etc.

2. Implicit imports in SwiftUI apps

When you import SwiftUI, you automatically get access to:
- Swift (standard library)
- Foundation
- CoreGraphics
- Combine
- UIKit (on iOS)
- Other system frameworks needed for building UIs

## Images and resources in Xcode

- In Xcode, press “Assets” group
- You should see AppIcon, AccentColor
- See the “+” button below

### Other files: sounds, fonts

Add it with right-click and Add files to “(project-name)”.

### Fonts

Add to folder and also `Info.plist`:

	<key>UIAppFonts</key>
	<array>
		<string>PlayfairDisplay-Bold.ttf</string>
	</array>

## Multi-touch

Key:

    self.view.isMultipleTouchEnabled = true
    self.view.isExclusiveTouch = false

Also:

- Do not use UITapGestureRecognizer, UILongPressGestureRecognizer, etc. — they don’t play well with multitouch.
- Stick with SceneKit’s raw touchesBegan/Moved/Ended.
- SceneKit (and SpriteKit) allow full multitouch per scene, not per view.
- Don’t divide the screen using multiple views. Instead, use screen regions inside your scene.

## Splash screens

UILaunchScreen in Info.plist

## Data storage

- None (in-memory only)
  - 🟢 Fastest, simplest
  - 🔴 Data lost when app restarts
  - ✅ Good for prototypes, games, toys
- UserDefaults
  - 🟢 Great for small key–value data (e.g. theme, username)
  - 🔴 Not suited for structured or large data
  - ✅ Super easy to use, built-in
- File system (Codable + JSON)
  - 🟢 Full control over file format
  - 🟡 More code needed for read/write
  - ✅ Good for storing objects, backups, exports
- SwiftData
  - 🟢 Modern, declarative (great with SwiftUI)
  - 🟡 iOS 17+ only, limited migration control
  - ✅ Best choice for new SwiftUI apps needing persistence
- Core Data
  - 🟢 Mature, powerful, flexible
  - 🔴 Verbose, more setup
  - ✅ Good for large datasets, syncing, advanced queries
- CloudKit
  - 🟢 Built-in sync across devices (iCloud)
  - 🔴 More complexity, Apple ecosystem only
  - ✅ Ideal for syncing user data securely
- SQLite / Realm
  - 🟢 Fast, powerful, cross-platform
  - 🔴 Requires external library or custom setup
  - ✅ Best for performance, complex queries, multi-platform apps


# App Store and TestFlight

## Disable encryption

    INFOPLIST_KEY_ITSAppUsesNonExemptEncryption = NO;

## Testing

Internal testing:

- Make sure added on https://appstoreconnect.apple.com/access/users (e.g. role Customer Support)
- Must also be added to app

External testers:


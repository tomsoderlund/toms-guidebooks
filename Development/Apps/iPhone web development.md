# iPhone Web Development

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

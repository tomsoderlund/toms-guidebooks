

## Dynamic Content

http://kb.mailchimp.com/merge-tags/all-the-merge-tags-cheat-sheet

http://blog.mailchimp.com/conditional-dynamic-content-in-mailchimp/

*|INTERESTED:Special Groups:Female Designers 1|*
*|ELSE:INTERESTED|*
*|END:INTERESTED|*

Case: LOWER, UPPER

*|TITLE:YOUR_MERGETAG|*


*|IF:LANGUAGE=Swedish|*
Hejsan!
*|ELSE:|*
Hello!
*|END:IF|*

*|IF:TB_ORG|*
What are you planning to build at *|TB_ORG|*?
*|ELSE:|*
What are you planning to build?
*|END:IF|*

*|IF:REFERENCE|*
Weld (referens: *|REFERENCE|*)
*|ELSE:|**|COMPANY|* + Weld / samarbete*|END:IF|*

*|IF:TB_NAME|**|IF:TB_ORG|* at *|END:IF|**|END:IF|*


*|IF:FNAME|*Hello *|FNAME|*!*|ELSE:|*Hello!*|END:IF|*

*|IF:GREETING|*
*|GREETING|*
*|END:IF|*

*|IF:REFERENCE|*
I got your name via *|REFERENCE|*.
*|END:IF|*


### A/B Testing

*|GROUP:A|*
This block of content/graphics will show only for group A recipients
*|END:GROUP|*

*|GROUP:B|*
This block of content/graphics will show only for group B recipients
*|END:GROUP|*


## Templates

http://templates.mailchimp.com/getting-started/template-language/

mc:edit="header" - used to name the header of your email.
mc:edit="header_image" - used to name an editable header image.
mc:edit="sidecolumn" - used to name an editable left- or right-side column.
mc:edit="main" - used to name the main content space of your email.
mc:edit="footer" - used to name the footer of your email.

--------------------

<img mc:edit="postcard" style="max-width:600px;"/>
<img mc:edit="header_image" mc:allowdesigner mc:allowtext />

--------------------

Repeatable

<div class="article" mc:repeatable>
	<h3 mc:edit="article_title">Title</h3>
	<p mc:edit="article_content">Content</p>
</div>

<div mc:repeatable="Columns" mc:variant="Left Column"></div>
<div mc:repeatable="Columns" mc:variant="Right Column"></div>

NOTE:

* The variants will appear in the _same order_ as defined in the template = think about ordering.
* When adding a new content block, variant 1 will be used = think about which variant is nr 1.
* The variant will have the default content from the template = think about default, reusable content.

--------------------

Hide: provide a hide/show action

<div mc:edit="content" mc:hideable>
</div>



## Google Analytics

http://www.dreamlords.com/Home.action?utm_source=Pressrelease&utm_medium=email&utm_campaign=LaunchRelease&utm_content=HeaderImage

Campaign Source: * (referrer: google, citysearch, newsletter4)
Campaign Medium: * (marketing medium: cpc, banner, email)
Campaign Term: (identify the paid keywords)
Campaign Content: (use to differentiate ads)
Campaign Name*: (product, promo code, or slogan)

?utm_source=Mailchimp&utm_medium=email&utm_campaign=FocusUsersUnity3dMeetup&utm_content=ReadMore


## Social Media

https://twitter.com/intent/follow?screen_name=Weld_io


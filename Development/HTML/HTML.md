## Base HTML

<!DOCTYPE>
<html lang="en">
<head>
<title>{TITLE}</title>
<meta name="description" content="{DESCRIPTION}"/>
<meta charSet="utf-8"/>
<meta http-equiv="content-language" content="en"/>
<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
<meta property="og:title" content="{TITLE}"/>
<meta property="og:description" content="{DESCRIPTION}"/>
<meta property="og:image" content="https://screen.tomorroworld.com/?url={IMAGE_URL}"/>
<meta property="og:locale" content="en_US"/>
<link rel="shortcut icon" type="image/x-icon" href="./icon.png"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600i&display=swap"/>
<style type="text/css">
</style>
</head>
<body>
<script src="http://code.jquery.com/jquery-latest.js" type="text/javascript" charset="utf-8" async defer></script>
<script type="text/javascript">
</script>
</body>
</html>

<!-- comment -->

<input type="button">
<input type="checkbox">
<input type="color">
<input type="date">
<input type="datetime-local">
<input type="email">
<input type="file">
<input type="hidden">
<input type="image">
<input type="month">
<input type="number">
<input type="password">
<input type="radio">
<input type="range">
<input type="reset">
<input type="search">
<input type="submit">
<input type="tel">
<input type="text">
<input type="time">
<input type="url">
<input type="week">

<input type="range" id="hue" min="0" max="360"/>

input[type="range"] {
}

----------

Toggle Switch:

.toggle-switch-container {
  position: relative;
  display: inline-block;
}
.toggle-switch-container > input {
  display: none;
}
.toggle-switch-container > label {
  display: block;
  width: 48px;
  height: 1.5em;
  text-indent: -150%;
  clip: rect(0 0 0 0);
  color: transparent;
  user-select: none;
}
.toggle-switch-container > label:before, .toggle-switch-container > label:after {
  content: "";
  display: block;
  position: absolute;
  cursor: pointer;
}
.toggle-switch-container > label:before {
  width: 100%;
  height: 100%;
  background-color: gray;
  border-radius: 1.5em;
  transition: background-color 0.25s ease;
}
.toggle-switch-container > label:after {
  top: 0;
  left: 0;
  width: 1.5em;
  height: 1.5em;
  border-radius: 1.5em;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  transition: left 0.25s ease, box-shadow 0.1s;
}
.toggle-switch-container > label:hover:after {
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.5);
}
.toggle-switch-container > input:checked + label:before {
  background-color: #00CED1;
}
.toggle-switch-container > input:checked + label:after {
  left: calc(100% - 23px);
}

----------


input[type="radio"] {
	position: absolute;
	opacity: 0;
	+ .radio-label {
	&:before {
		content: '';
		background: $color_radio_background;
		border-radius: 100%;
		border: 2px solid darken($color_radio_background, 25%);
		display: inline-block;
		width: 1.4em;
		height: 1.4em;
		position: relative;
		top: -0.2em;
		margin-right: 1em;
		vertical-align: top;
		cursor: pointer;
		text-align: center;
		transition: all 250ms ease;
	}
	}
	&:checked {
	+ .radio-label {
		&:before {
		background-color: $color_radio_active;
		box-shadow: inset 0 0 0 4px $color_radio_background;
		}
	}
	}
	&:focus {
	+ .radio-label {
		&:before {
		outline: none;
		border-color: $color_radio_active;
		}
	}
	}
	&:disabled {
	+ .radio-label {
		&:before {
		box-shadow: inset 0 0 0 4px $color_radio_background;
		border-color: darken($color_radio_background, 25%);
		background: darken($color_radio_background, 25%);
		}
	}
	}
	+ .radio-label {
	&:empty {
		&:before {
		margin-right: 0;
		}
	}
	}
}

<div class="radio-wrapper">
	<input id="radio-1" name="radio" type="radio" checked>
	<label for="radio-1" class="radio-label">Checked</label>
</div>


## HTML5 Semantic Tags

<main>
<nav>
<section>
<article> # independent, self-contained content
<header>
<footer>

main, section, article, aside, header, footer, nav, figure, figcaption, time, mark.
http://caniuse.com/#feat=html5semantic

<aside> // content aside from the content it is placed in.

<figure>
<figcaption>



## IFrame

<iframe src="https://renderer-production-weld.freetls.fastly.net/embed/-LG0SMxKSC6BzBcXD8r7?width=1000&dpr=2" width="100%" height="100%" frameborder="0" style="height: 560px;"></iframe>
<iframe src="https://www.weld.io/comviq-hero-test/" width="100%" height="100%" frameborder="0" style="height: 560px;"></iframe>
<iframe src="about:blank" width="100%" height="100%" frameborder="0" style="height: 560px;"></iframe>


## TEXT AND LINKS

<h1>Heading 1</h1>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
<h2>Heading 2</h2>
<p>Lorem ipsum dolor sit amet, <a href="#">consectetuer adipiscing</a> elit.</p>
<h3>Heading 3</h3>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>


## FORMS

<form name="MyForm" method="post" action="" onSubmit="updateView(this);">
<p>Search discussion topics: <input type="text" name="searchtext" value="" class="formfield" size="15">
<input name="searchButton" value="Search" type="button" class="formbutton"></p>
</form>

<fieldset></fieldset>


## FORM FIELDS

http://www.w3schools.com/html/html_forms.asp


Text: <input type="text" name="searchtext" value="" class="formfield" size="15">
		<textarea name="searchtext" class="formfieldsmall" cols="35" rows="2">value</textarea>

Radio:
<input type="radio" name="sex" value="male" checked>
<input type="radio" name="gender" value="female"/> Female

Checkbox:
<input type="checkbox" name="vehicle" value="Bike">

Button:
<button>Button</button>
<input type="button" name="searchButton" value="Search" class="formbutton">

Select:

<select>
	<option value="sam">Sam Lowry</option>
	<option value="harry" selected>Harry Tuttle</option>
	<option value="ida">Ida Lowry</option>
</select>

Hidden: <input type="hidden" name="hiddenVar" value="value">


## TABLES

<table>
	<thead>
		<tr>
			<th>Month</th>
			<th>Savings</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>January</td>
			<td>$100</td>
		</tr>
		<tr>
			<td>February</td>
			<td>$80</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<td>Sum</td>
			<td>$180</td>
		</tr>
	</tfoot>
</table>

## Images

<img class="black" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAADa6r/EAAAADUlEQVQIHWNgYGD4DwABBAEAHnOcQAAAAABJRU5ErkJggg==" />
<img class="white" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAADa6r/EAAAAC0lEQVQIHWP4DwQACfsD/Qy7W+cAAAAASUVORK5CYII=" />
<img class="red" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAADa6r/EAAAADUlEQVQIHWP4z8DwHwAFAAH/yA9iFgAAAABJRU5ErkJggg==" />
<img class="blue" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAADa6r/EAAAADUlEQVQIHWNgYPj/HwADAgH/p+FUpQAAAABJRU5ErkJggg==" />
<img class="green" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAADa6r/EAAAADUlEQVQIHWNg+M/wHwAEAQH/MH0Y7gAAAABJRU5ErkJggg==" />

## Meta Tags

### Icons

<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="http://www.google.com/images/spreadsheets/favicon.ico"/>

### RSS Feeds

<link rel="alternate" type="application/rss+xml" title="Smashing Magazine Full RSS Feed" href="http://www.smashingmagazine.com/feed/"/>


# HTTP Error codes

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300

100 Continue
101 Switching Protocols
102 Processing (WebDAV; RFC 2518)
200 OK
201 Created
202 Accepted
203 Non-Authoritative Information (since HTTP/1.1)
204 No Content
205 Reset Content
206 Partial Content (RFC 7233)
207 Multi-Status (WebDAV; RFC 4918)
208 Already Reported (WebDAV; RFC 5842)
226 IM Used (RFC 3229)
2xx Success
300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other (since HTTP/1.1)
304 Not Modified (RFC 7232)
305 Use Proxy (since HTTP/1.1)
306 Switch Proxy
307 Temporary Redirect (since HTTP/1.1)
308 Permanent Redirect (RFC 7538)
3xx Redirection
400 Bad Request
401 Unauthorized (RFC 7235)
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required (RFC 7235)
408 Request Timeout
409 Conflict: duplicate resource or resource already exists
410 Gone
411 Length Required
412 Precondition Failed (RFC 7232)
413 Payload Too Large (RFC 7231)
414 URI Too Long (RFC 7231)
415 Unsupported Media Type
416 Range Not Satisfiable (RFC 7233)
417 Expectation Failed
418 I'm a teapot (RFC 2324)
421 Misdirected Request (RFC 7540)
422 Unprocessable Entity (WebDAV; RFC 4918)
423 Locked (WebDAV; RFC 4918)
424 Failed Dependency (WebDAV; RFC 4918)
426 Upgrade Required
428 Precondition Required (RFC 6585)
429 Too Many Requests (RFC 6585)
431 Request Header Fields Too Large (RFC 6585)
451 Unavailable For Legal Reasons (Internet draft)
4xx Client Error
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates (RFC 2295)
507 Insufficient Storage (WebDAV; RFC 4918)
508 Loop Detected (WebDAV; RFC 5842)
510 Not Extended (RFC 2774)
511 Network Authentication Required (RFC 6585)
5xx Server Error

## Language

	<html lang="en">
	<html lang="en-us">

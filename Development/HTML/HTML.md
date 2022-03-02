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
<input type="tel">
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
<input type="text">
<input type="time">
<input type="url">
<input type="week">

  <input
    type='range'
    min={min}
    max={max}
    step={step}
  />

/* Range input */

input[type="range"] {
  background: none;
  width: 100%;
  -webkit-appearance: none;
}

input[type="range"]:focus {
  outline: none;
}

/* Chrome/Safari */
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 1.75em;
  cursor: pointer;
  transition: all .2s ease;
  background: #c4c4c4;
  border: 0 solid #000;
  border-radius: 1.75em;
}
input[type="range"]::-webkit-slider-thumb {
  height: calc(1.75em - 4px);
  width: calc(1.75em - 4px);
  margin-top: 2px;
  border-radius: 1.75em;
  border: none;
  background: #f4f4f4;
  cursor: pointer;
  -webkit-appearance: none;
  box-shadow: 0 0.2em 0.2em rgba(0,0,0, 0.3);
}
input[type="range"]::-webkit-slider-thumb:hover {
  box-shadow: 0 0.3em 0.3em rgba(0,0,0, 0.5);
}

/* Firefox */
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 1.75em;
  cursor: pointer;
  transition: all .2s ease;
  background: #c4c4c4;
  border: 0 solid #000;
  border-radius: 1.75em;
}
input[type="range"]::-moz-range-thumb {
  height: calc(1.75em - 4px);
  width: calc(1.75em - 4px);
  border-radius: 1.75em;
  border: none;
  background: #f4f4f4;
  cursor: pointer;
  box-shadow: 0 0.2em 0.2em rgba(0,0,0, 0.3);
}
input[type="range"]::-moz-range-thumb:hover {
  box-shadow: 0 0.3em 0.3em rgba(0,0,0, 0.5);
}
input[type="range"]::-moz-focus-outer {
  border: 0;
}

/* Microsoft */
input[type="range"]::-ms-track {
  width: 100%;
  height: 1.75em;
  cursor: pointer;
  transition: all .2s ease;
  background: transparent;
  border-color: transparent;
  border-width: 1.75em 0;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  border: 0 solid #000;
  border-radius: 1.75em;
}
input[type="range"]::-ms-fill-upper {
  background: #c4c4c4;
  border: 0 solid #000;
  border-radius: 1.75em;
}
input[type="range"]::-ms-thumb {
  height: calc(1.75em - 4px);
  width: calc(1.75em - 4px);
  border-radius: 1.75em;
  background: #f4f4f4;
  cursor: pointer;
  box-shadow: 0 0.2em 0.2em rgba(0,0,0, 0.3);
}
input[type="range"]::-ms-thumb:hover {
  box-shadow: 0 0.3em 0.3em rgba(0,0,0, 0.5);
}

----------

Toggle Switch:

    <span class="toggle-switch">
      <input id="toggle-switch-1" type="checkbox" />
      <label for="toggle-switch-1" />
    </span>

.toggle-switch {
  position: relative;
  display: inline-block;
}
.toggle-switch > input {
  display: none;
}
.toggle-switch > label {
  display: block;
  text-indent: -150%;
  clip: rect(0 0 0 0);
  color: transparent;
  user-select: none;
}
.toggle-switch > label,
.toggle-switch > label:before {
  width: 4em;
  height: 2.2em;
}
.toggle-switch > label:before,
.toggle-switch > label:after {
  content: "";
  display: block;
  position: absolute;
  cursor: pointer;
}
/* Container */
.toggle-switch > label:before {
  border-radius: 1.7em;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.1s ease;
}
/* Handle */
.toggle-switch > label:after {
  top: 0.1em;
  left: 0.1em;
  width: 2em;
  height: 2em;
  border-radius: 2em;
  background-color: white;
  transition: left 0.1s ease;
}
.toggle-switch > input:checked + label:before {
  background-color: rgba(0, 0, 0, 0.9);
}
.toggle-switch > input:checked + label:after {
  left: calc(100% - (4em / 2) - 0.1em);
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
  <input type="radio" name="fruit" id="apple" value="apple">
  <label for="apple">Apple</label><br>
  <input type="radio" name="fruit" id="banana" value="banana">
  <label for="banana">Banana</label>
</div>


## HTML5 Semantic Tags

https://www.w3schools.com/tags/

<main>
<nav>
<section>
<article> # independent, self-contained content
<header>
<footer>

main, section, article, aside, header, footer, nav, table, figure, figcaption, time, mark

http://caniuse.com/#feat=html5semantic

<aside> // content aside from the content it is placed in.

<figure>
<figcaption>


preamble/ingress/subheading: <summary>



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

### Target _blank

    target="_blank" rel="noopener noreferrer"

## Images

- background-image: url("paper.gif");
- background-size: cover;
- background-position: center;
- background-repeat: no-repeat;

    backgroundImage: `url("https://picsum.photos/seed/react-zeroconfig-components-${index}/320/240")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',

object-size: cover;


## Forms

    <form action="/endpoint">
      <fieldset>
        <legend>User info:</legend>
        <label for="emailField">Email:</label>
        <input id="emailField" type="email" autocomplete="email" placeholder="Your email" required />
        <button type="submit">Submit</button>
      </fieldset>
    </form>

### input type

- button
- checkbox
- color
- date
- datetime-local
- email
- file
- hidden
- image
- month
- number
- password
- radio
- range
- reset
- search
- submit
- tel
- text
- time
- url
- week

### autocomplete

autocomplete="email"

- off
- on
- name
- organization
- organization-title
- honorific-prefix
- given-name
- additional-name
- family-name
- honorific-suffix
- nickname
- email
- username
- new-password
- current-password
- one-time-code
- street-address
- address-line1, address-line2, address-line3
- address-level1
- country
- country-name
- postal-code
- cc-name
- cc-given-name
- cc-additional-name
- cc-family-name
- cc-number
- cc-exp
- cc-exp-month
- cc-exp-year
- cc-csc
- cc-type
- transaction-currency
- transaction-amount
- language
- bday
- bday-day
- bday-month
- bday-year
- sex
- tel
- tel-country-code
- tel-national
- tel-area-code
- tel-local
- tel-extension
- impp
- url
- photo

## FORM FIELDS

http://www.w3schools.com/html/html_forms.asp


Text: <input type="text" name="searchtext" value="" class="formfield" size="15">
		<textarea name="searchtext" class="formfieldsmall" cols="35" rows="2">value</textarea>

Radio:
<input type="radio" name="sex" value="apple" checked>
<input type="radio" name="fruit" value="banana"/> Banana

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

## data:

    data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7

    data:text/html;<body>Hello World</body>

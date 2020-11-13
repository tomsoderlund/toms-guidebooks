# CSS

## CodePen Starting Point

body {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10%;
  box-sizing: border-box; /* content-box */

  font-size: 5vmin;
  font-family: 'Helvetica Neue', sans-serif;
  background: whitesmoke;
  /*
  background: #444;
  box-shadow: inset 0 0 4em 1em rgba(0,0,0, 0.8);
  */
  color: darkslategray;

  /* Flexbox: */
  display: flex; /* inline-flex */
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* flex-wrap: wrap; */
}

.box {
  width: 5em;
  height: 5em;
  display: inline-block;
  margin: 0.2em;
  background: gray;
  border-radius: 0.1em;
}

## Nice & Simple CSS objects

### Main

/* #NiceAndSimple: Main - margin:auto */
main {
  margin: 0.5em auto;
  width: 80%;
  max-width: 600px;
}

@media only screen and (max-width: 480px) {
  main {
    width: 95%;
    max-width: none;
  }
}

### Links

/* #NiceAndSimple: Links */
a {
  color: dodgerblue;
  text-decoration: none;
  border-bottom: 1px dotted rgba(30, 143, 255, 0); /* dodgerblue transparent */
  transition: all 0.2s;
}
a:hover {
  opacity: 0.8;
  border-bottom: 1px dotted dodgerblue;
}

### Label

/* #NiceAndSimple: Label flex */
label {
  max-width: 20em;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
label input {
  width: auto;
  flex: 1;
}

/* #NiceAndSimple: Label float */
label {
  float: left;
  width: 6em;
  text-align: right;
}

### Button

/* #NiceAndSimple: Button - https://codepen.io/tomsoderlund/pen/qqyzqp */
button,
.button {
  position: relative;
  background-color: dodgerblue;
  color: white;
  border-radius: 0.2em;
  border: none;
  box-shadow: 0 0.125em 0.125em rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  font-family: inherit;
  font-size: inherit;
  line-height: normal;
  font-weight: bold;
  text-align: center;
  outline: none;
  padding: 0.6em;
  margin: 0.2em;
  transition: all 0.1s;
  min-width: 15em;
}
button:focus:not(:disabled),
.button:focus:not(:disabled) {
  filter: brightness(125%);
}
button:hover:not(:disabled),
.button:hover:not(:disabled) {
  filter: brightness(125%);
  top: -0.1em;
  box-shadow: 0 0.2em 0.1em rgba(0, 0, 0, 0.2);
}
button:hover:active,
.button:hover:active {
  top: 0.1em;
  box-shadow: 0 0.02em 0.125em rgba(0, 0, 0, 0.4);
  transition: all 0.05s;
}
button:disabled,
.button:disabled {
  cursor: initial;
  filter: grayscale(100%);
}
a.button {
  text-decoration: none;
}

button.primary:not(:disabled) {
  background-color: #FF3E00;
}

### Input/Select

/* #NiceAndSimple: Input and Dropdown Menu - https://codepen.io/tomsoderlund/pen/GNBbWz */
input,
.input,
textarea,
select {
  -webkit-appearance: none;
  background-color: white;
  color: inherit;
  outline: none;
  resize: none;
  box-sizing: border-box;
  border-radius: 0.2em;
  border: 1px solid lightgray;
  box-shadow: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  padding: 0.6em;
  margin-right: 0.6em;
  min-width: 15em;
}
input::placeholder,
textarea::placeholder {
  color: lightgray;
}
input:hover:not(:disabled):not(:focus),
.input:hover:not(:disabled):not(:focus),
textarea:hover:not(:disabled):not(:focus),
select:hover:not(:disabled):not(:focus) {
  border-color: silver;
}
input:focus,
.input:focus,
textarea:focus,
select:focus {
  border-color: darkgray;
}
input:read-only,
textarea:read-only {
  color: darkgray;
}
input:disabled,
.input:disabled,
textarea:disabled,
select:disabled {
  background-color: whitesmoke;
  color: darkgray;  
}

### Tag/Token

/* #NiceAndSimple: Tag */
.tag {
  display: inline-block;
  cursor: pointer;
  padding: 0.6em 1em;
  background-color: deepskyblue;
  color: white;
  font-size: 0.9em;
  padding: 0.2em 0.7em;
  margin-right: 0.2em;
  border-radius: 2em;
  border: 1px solid rgba(0,0,0, 0.2);
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.2s;
}
.tag:hover:not(:disabled) {
  opacity: 0.8;
}
.tag.new {
  background-color: limegreen;
}

### List

/* #NiceAndSimple: List
ol {
  list-style-type: decimal;
  list-style-position: inside;
}

### Table

/* #NiceAndSimple: Table - https://codepen.io/tomsoderlund/pen/mmZrRR */
table {
  border-collapse: collapse;
}

td, th {
  border: 1px solid #ddd;
  padding: 0.5em;
  vertical-align: top;
}

thead tr {
  background-color: #ccc;
}

tr:nth-child(2n+0) {
  background-color: #eee;
}

### Horisontal rule (HR)

/* #NiceAndSimple: Horisontal rule */
hr {
  border: 0;
  height: 1px;
  margin: 0.3em 0;
  background: rgba(0,0,0, 0.2);
}

### Radio button

/* #NiceAndSimple: Radio Button */
$color_radio_background: white;
$color_radio_active: dodgerblue;

.radio-wrapper {
  margin: 0.2em;
}

## Three Zone Navigation System

/* #ThreeZoneNavigationSystem: https://codepen.io/tomsoderlund/pen/YzXNdpZ */

.nav-circle {
  position: fixed;
  z-index: 100;
  user-select: none;
  -webkit-user-select: none;
  font-size: 2vh;
  width: 4em;
  height: 4em;
  top: 1em;
  left: 1em;
  border-radius: 50%;
  background-color: darkturquoise;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}
.nav-circle.right {
  left: initial;
  right: 1em;
}
.nav-circle.bottom {
  top: initial;
  bottom: 1em;
}

/* States */

.nav-circle:hover:not(.open) {
  opacity: 0.7;
  transform: scale(1.1);
}
.nav-circle.open {
  background-color: rebeccapurple;
}

/* Icon */

.nav-circle i {
  font-size: 1.8em;
}

/* Menu */

.nav-circle:not(.open) .menu {
  height: 0;
  padding: 0;
  opacity: 0;
}

.menu {
  background-color: rebeccapurple;
  z-index: -1;
  overflow: hidden;
  transition: all 0.2s;
  width: 10em;
  height: 18em;
  opacity: 1;
  position: absolute;
  left: 0;
  top: 2em;
  padding: 1em;
  border-radius: 0.5em;
  display: flex; /* inline-flex */
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.menu a {
  font-size: 1.5em;
  color: white;
  text-decoration: none;
}

/* Can grow/shrink vertically */
.collapsable {
  transition: all 0.5s;
  max-height: 0;
  overflow: hidden;
}
.collapsable.open {
  max-height: 20em;
}


## Reference

### before/after

:before
:after

button.inProgress:after {
  content: '...';
}

### last-child

    div {
      margin-right: 1em;
      margin-bottom: 1em;
    }
    div:last-child {
      margin-right: unset;
      margin-bottom: unset;
    }

### Reset

https://meyerweb.com/eric/tools/css/reset/

### Flexbox

.flex-parent {
  display: flex;
  flex-direction: row; /* DIRECTION: "row" is default. "column" -> create rows */
  justify-content: space-between; /* PRIMARY AXIS: flex-start (default) / flex-end / center / space-between / space-around */
  align-items: center; /* SECONDARY AXIS: stretch (default) / flex-start / flex-end / center / baseline */
  flex-wrap: wrap; /* Wrap to columns, set child width e.g. 33.33% */

  .flex-child {
    display: flex;
    flex: 0 1 auto; /* flex-grow (flex-shrink flex-basis), default 0 1 auto */
    justify-content: center;
    align-items: center;
  }
}

### Grid

    .parent {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: 1fr 1fr 1fr;
      grid-gap: 1em;
      justify-content: space-evenly;
      align-content: space-evenly;
    }

    .child.two-rows {
      grid-row: 1 / 3;
      grid-column: 2;
    }

Named areas: https://codepen.io/tomsoderlund/pen/YzqpbEo

    .container {
      display: grid;
      /* 2 columns * 3 rows = 6 areas */
      grid-template-columns: 1fr 3fr;
      grid-template-rows: 1fr 4fr 1fr;
      grid-template-areas: "header header" "sidebar content" "footer footer";
    }

    .header {
      grid-area: header;
    }

Scrolling grid views: add `min-height: 0;` to parent: https://stackoverflow.com/questions/64216285/why-does-this-css-grid-child-need-a-max-height-to-enable-scrolling

### Viewport units

vw, vh, vmin, vmax - Web Design Weekly

### Other

/*

Special Effects in CSS

http://www.1stwebdesigner.com/css/advanced-css-text-effects-web-typography-tips/

*/

margin: vertical horizontal
margin: top right bottom left (TRBL - TuRBuLence, or clockwise from top)

// hls, hsl, hsv

/* Hue 0-360¹, Saturation 0-100%, Lightness 0-100%, Alpha 0-1.
   ¹Red=0, Green=120, Blue=240. */
hsl(360, 100%, 50%);
hsla(360, 100%, 50%, 0.4);
hsla(0,0,0, 0.4);
/* Red, Green, Blue */
rgb(0,0,0);
rgba(0,0,0, 0.3)

### Selectors

`>` = child
`*` = grandchild or later
`+` = adjacent sibling
`~` = general sibling

div:nth-child(1) {}
div:nth-child(4n+1) {}
div:nth-child(odd) {}

div:nth-child(3n+1) { background-color: darkturquoise; }
div:nth-child(3n+2) { background-color: rebeccapurple; }
div:nth-child(3n+3) { background-color: salmon; }

/* Universal */
* {
  margin: 0px;
  padding: 0px;
}

### Borders

none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset;

### Typography

  font: 30px/300px Helvetica, Arial, sans-serif;

  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  font-style: italic; /* normal */
  text-decoration: underline;
  text-transform: uppercase; /* capitalize, sentence */

  letter-spacing: normal; /* 1em */
  word-spacing: normal;
  line-height: 1em;

#### Default fonts for fast loading

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

Code: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif

### Word wrap and whitespace

  white-space: nowrap;
  word-wrap: break-word; /* break words that overflow their container */
  word-break: break-all; /* breaks all words at the end of a line */
  overflow-wrap: break-word;
  hyphens: auto;
  text-overflow: ellipsis; /* Need overflow: hidden; too */
  overflow: hidden;

### Select text

  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;

### Images

.photo {
  background-image: url("background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  object-fit: cover;
  display: block;
  width: 400px;
  height: 300px;
}

### Shiny Button

https://codepen.io/tomsoderlund/pen/GRROEGL

.shiny-button {
  transition: all 0.5s;
  background: white;
  background: linear-gradient(135deg, $color_button_background 0%, $color_button_background 45%, $color_gradient_start 55%, $color_gradient_end 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$color_gradient_start', endColorstr='$color_gradient_end', GradientType=1);
  background-size: 400% 100%;
  background-position: 0% 50%;
}
.shiny-button:focus:not(:disabled) {
  border-color: $color_gradient_end;
}
.shiny-button:hover:not(:disabled) {
  border-color: $color_gradient_start;
  color: white;
  background-position: 100% 50%;
}
.shiny-button:active:hover {
  transition: all 0.1s;
  border-color: $color_gradient_start;
  background: $color_gradient_start;
  color: white;
}
.shiny-button:disabled {
  cursor: initial;
  border-color: silver;
  color: silver;
}

### In Progress Button

https://codepen.io/tomsoderlund/pen/WNvbzXp

  .progress-button {
    background: linear-gradient(
      90deg,
      $color_button_foreground 0%,
      $color_button_foreground 50%,
      $color_button_background 50%,
      $color_button_background 100%
    );
    background-size: 400% 100%;
    background-position: 70% 50%;
  }
  .progress-button.in-progress {
    animation: animation-progress 3s 1 ease-out;
  }
  .progress-button.done {
    background-position-x: 30%;
    color: $color_button_background;
  }
  @keyframes animation-progress {
    from {
      background-position-x: 70%;
    }
    to {
      background-position-x: 30%;
      color: $color_button_background;
    }
  }

### Filters

    filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
    filter: alpha(opacity=50);
    filter: blur(20px) grayscale(20%);
    filter: blur(20px);
    filter: blur(20px);”. Wouldn’t the effect then work in firefox?
    filter: blur(<length>)
    filter: brightness([ <number> | <percentage> ])
    filter: contrast([ <number> | <percentage> ])
    filter: drop-shadow(<length>{2,3} <color>?)
    filter: grayscale([ <number> | <percentage> ])
    filter: hue-rotate(<angle>deg)
    filter: invert([ <number> | <percentage> ])
    filter: opacity([ <number> | <percentage> ])
    filter: saturate([ <number> | <percentage> ])
    filter: sepia(0) saturate(2);
    filter: sepia(0) saturate(2);
    filter: sepia(1) saturate(8);
    filter: sepia([ <number> | <percentage> ])
    filter: url(<url>)

### Other

#### Force box sizing box model. Default is 'content-box'.

.new_box_model {
  box-sizing: border-box;
}

#### Uppercase

.fx_uppercase {
  text-transform: uppercase;
}

#### Text Shadow

.fx_text_shadow {
  color: #222;
  text-shadow: 0px 2px 3px #555; /* X Y Blur Color */
  filter: dropshadow(color=#555, offX=0, offY=2); /* for IE */
}

#### Box Shadow

.shaded_box {
  box-shadow: 0 0.2em 0.5em rgba(0,0,0, 0.4);
  box-shadow: 1px 2px 3px #555; /* X Y Blur Color */
  -webkit-box-shadow: 1px 2px 3px #555; /* X Y Blur Color */
  -moz-box-shadow: 1px 2px 3px #555;
}

#### Inset Shadow

.inset_shaded_box {
  box-shadow: inset 1px 2px 3px #555; /* X Y Blur Color */
  -webkit-box-shadow: inset 1px 2px 3px #555; /* X Y Blur Color */
  -moz-box-shadow: inset 1px 2px 3px #555;
}

#### Embossing with border

.embossed_box {
  border: 2px solid #d3e8fc; /* Lighter shade */
  border-top-color: #4b84b7;
  border-left-color: #4b84b7;
}

#### Text Embossed

.fx_text_embossed {
  font-weight: bold;
  color: #808080;
  text-shadow: #fff 0px 1px 0, #000 0 -1px 0; /* X Y Blur Color */
}

#### Text "Outlined"

.fx_text_outlined {
  color: #222;
  text-shadow: -1px 0 #00F, 0 1px #00F, 1px 0 #00F, 0 -1px #00F;
}

#### Opacity/Transparency

.fx_transparent {
    background-color: black;
  opacity:0.6; /* CSS3 standard */
  filter:alpha(opacity=60); /* for IE */
}

Transparent background

.fx_transparent_background {
  background-color: rgb(255,0,0); /* fallback */
  background-color: rgba(255,0,0,0.5);
}

#### Blur

.fx_blurred {
  filter: blur(10px);
  -webkit-filter: blur(10px);
}

#### Linear gradient

http://colorzilla.com/gradient-editor/#ff3232+0,ffffff+100

Change 'to bottom' to '45deg' for angle

.fx_gradient_linear {
  background: #ff3232; /* Old browsers */
  background: -moz-linear-gradient(top, #ff3232 0%, #ffffff 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #ff3232 0%, #ffffff 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #ff3232 0%, #ffffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff3232', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
}

#### Circular gradient

http://colorzilla.com/gradient-editor/#ff3232+0,ffffff+100

.fx_gradient_radial {
  background: #ff3232; /* Old browsers */
  background: -moz-radial-gradient(center, ellipse cover, #ff3232 0%, #ffffff 100%); /* FF3.6-15 */
  background: -webkit-radial-gradient(center, ellipse cover, #ff3232 0%, #ffffff 100%); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(ellipse at center, #ff3232 0%, #ffffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff3232', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

#### Rainbow

background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);
background: linear-gradient(to right, hsl(0,100,50), hsl(45,100,50), hsl(90,100,50), hsl(135,100,50), hsl(180,100,50), hsl(225,100,50), hsl(270,100,50), hsl(315,100,50), hsl(360,100,50));

#### Rounded Box with Shadows

.rounded_box {
  width: 500px; margin: 0 auto; background: #222; padding: 20px;
  font-size: 22px; color: #555; text-shadow: 0px 2px 3px #171717;

  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;

  -webkit-box-shadow: 1px 2px 3px #555; /* X Y Blur Color */
  -moz-box-shadow: 1px 2px 3px #555;
}

#### One rounded corner

.rounded_corner {
  border-bottom-left-radius: 1em;
}

#### Text with gradient/image

h1 {
  font: bold 330%/100% "Lucida Grande";
  position: relative;
  color: #464646;
}

h1 span {
  background: url("gradient.png") repeat-x;
  position: absolute;
  display: block;
  width: 100%;
  height: 31px;
}

#### Keyboard-style button

.keyboard-button {
  color: #999;
  border: 3px solid #999 !important;
  border-radius: 8px;
  padding: 0px 8px 0px 8px;
}

### Transform

  transform: translate(x,y);
  transform: translate3d(x,y,z);
  transform: translateX(x);
  transform: translateY(y);
  transform: translateZ(z);
  transform: scale(x,y);
  transform: scale3d(x,y,z);
  transform: scaleX(x);
  transform: scaleY(y);
  transform: scaleZ(z);
  transform: rotate(angle);
  transform: rotate3d(x,y,z,angle);
  transform: rotateX(angle);
  transform: rotateY(angle);
  transform: rotateZ(angle);
  transform: skew(x-angle,y-angle);
  transform: skewX(angle);
  transform: skewY(angle);
  transform: matrix(n,n,n,n,n,n);
  transform: matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n);
  transform: perspective(n); // doesn’t affect the element itself, but affects the transforms of descendent elements' 3D transforms, allowing them all to have a consistent depth perspective.

## Responsive – @media queries

  @media only screen and (max-width: 480px) {
  }

  @media (max-width: 904px) and (min-width: 544px) {
    #rectangle-84 .apply-styles {
      background-color: #47E2A1;
    }
  }

### @media operators

Operators for media queries:

- `,` (comma, which works as an OR in a list of media queries)
- `and`
- `not`
- `only`: useful for preventing older browsers from applying selected styles

Examples:

    @media screen and (color), print and not (color) {...}
    @media (min-width: 640px) and (max-width: 767px) {...}
    @media (max-width: 639px), (min-width: 768px) {...}

    @media (min-resolution: 192dpi) and (max-width: 320px),
           (-webkit-min-device-pixel-ratio: 2) and (max-width: 320px) {
      body {
        border: 1px solid blue;
      }
    }

### CSS to detect device-pixel-ratio (DPR)

- Need both -webkit-min-device-pixel-ratio and min-resolution for different devices:
- 96 is base (1x)

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
      /* 2x-specific stuff here */
    }
    @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi) { 
      /* 1.5x-specific stuff here */
    }

### CSS to detect screen orientation:

    @media screen and (orientation:portrait) { … }
    @media screen and (orientation:landscape) { … }


## Animations

### Transitions (`transition`)

  .box {
    border-style: solid;
    border-width: 1px;
    display: block;
    width: 100px;
    height: 100px;
    background-color: #0000FF;
    /* transition: <property> <duration> <timing-function> <delay>; */
    transition: width 2s, height 2s, background-color 2s, transform 2s;
  }
  .box:hover {
    background-color: #FFCCCC;
    width: 200px;
    height: 200px;
    transform: rotate(180deg);
  }

  div {
    transition-property: opacity, left, top, height; /* all */
    transition-duration: 3s, 5s;
    transition-delay: 1s
    transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit;
  }

### Keyframes (`animation`)

  .pulsate-animation {
    /*         name              dur delay repetitions */
    animation: keyframes-pulsate 1s 0s infinite;
  }

  @keyframes keyframes-pulsate {
    from {
      background-color: rgba(255,255,255, 0);
    }
    to {
      background-color: rgba(255,255,255, 0);
    }
  }

  @keyframes keyframes-pulsate {
    0% {
      background-color: rgba(255,255,255, 0);
    }
    50% {
      background-color: rgba(255,255,255, 1);
    }
    100% {
      background-color: rgba(255,255,255, 0);
    }
  }

  .animated1 {
    animation-name: example;
    animation-duration: 5s;
    animation-timing-function: linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-direction: normal|reverse|alternate|alternate-reverse;
    animation-play-state: running|paused;
    animation-fill-mode: (specifies a style for the element when the animation is not playing);
  }

  .animated2 {
    animation: example 5s linear 2s infinite alternate;
  }

### Animate multiple

    .box:nth-child(2) {
      animation-delay: -2s;
    }

### 3D Flip Animation

### Progress animation

    .progress-button {
      background: linear-gradient(
        90deg,
        darkturquoise 0%,
        darkturquoise 45%,
        salmon 55%,
        salmon 100%
      );
      background-size: 400% 100%;
      background-position: 0% 50%;
    }
    .progress-button.in-progress {
      animation: animation-progress 5s 0s 1;
    }
    .progress-button.done {
      background-position: -50% 50%;
    }
    @keyframes animation-progress {
      from {
        background-position: 0% 50%;
      }
      to {
        background-position: -50% 50%;
      }
    }

## Pseudo classes

input:not([type="radio"])

:active
:any-link
:blank
:checked
:current
:default
:defined
:dir()
:disabled
:drop
:empty
:enabled
:first
:first-child
:first-of-type
:focus
:focus-visible
:focus-within
:fullscreen
:future
:has()
:host
:host()
:host-context()
:hover
:in-range
:indeterminate
:invalid
:lang()
:last-child
:last-of-type
:left
:link
:local-link
:matches()
:not()
:nth-child()
:nth-col()
:nth-last-child()
:nth-last-col()
:nth-last-of-type()
:nth-of-type()
:only-child
:only-of-type
:optional
:out-of-range
:past
:placeholder-shown
:read-only
:read-write
:required
:right
:root
:scope
:target
:target-within
:user-invalid
:valid
:visited



/* --------- Retina Images --------- */

Either: IMG tag or element with background image.

<div class="photo"></div>

.photo {
  background-image: url("retina-image-800x600-2x.png");
  background-position: center;
  background-size: 400px 300px;
  background-repeat: no-repeat;
  display: block;
  width: 400px;
  height: 300px;
}


/* CSS for devices with normal screens */
.icons {
    background-image: url("icon-sprite.png");
    background-repeat: no-repeat;
}

/* CSS for high-resolution devices */
@media only screen and (-Webkit-min-device-pixel-ratio: 1.5),
only screen and (-moz-min-device-pixel-ratio: 1.5),
only screen and (-o-min-device-pixel-ratio: 3/2),
only screen and (min-device-pixel-ratio: 1.5) {
    .icons {
        background-image: url("icon-sprite-2x.png");
        background-size: 200px 100px;
        background-repeat: no-repeat;
    }
}


<code>

code {
  font-family: Inconsolata, Monaco, Menlo, Courier, monospace;
  font-size: 16px;
  color: gray;
}


## Colors / colors / COLORS

namedColors.json: https://gist.github.com/tomsoderlund/548d39611c45397f48434e706b8c9b92

https://www.crockford.com/colors.html
http://www.quackit.com/css/css_color_codes.cfm

Tom’s favorites:

darkturquoise
rebeccapurple
salmon

Green: limegreen, lime, darkturquoise, greenyellow
Turquoise: darkturquoise
Blue: dodgerblue, deepskyblue
Purple: rebeccapurple, slateblue
Red/Pink: salmon, deeppink
Red: tomato
Orange: darkorange
Yellow: gold, lemonchiffon

.turquoise { background-color: darkturquoise; }
.purple { background-color: rebeccapurple; }
.pink { background-color: salmon; }
.yellow { background-color: gold; }
.blue { background-color: dodgerblue; }
.green { background-color: limegreen; }
.red { background-color: tomato; }


slategray (blueish)
darkslategray (blueish)

white
whitesmoke
lightgray
silver
darkgray
gray
dimgray
black

transparent


Weld

$weld_cyan: #6ec8dc;
$weld_cyan_light: #acdde9;
$weld_cyan_dark: #327a8c;
$weld_green: #47e2a1;
$weld_yellow: #fffa46;
$weld_red: #f86060;
$weld_red_light: #faafae;
$weld_orange: #ff8316;
$weld_blue: #015593;
$weld_purple: #be59a0;


White:

white FFFFFF
snow  FFFAFA
honeydew  F0FFF0
mintcream F5FFFA
azure F0FFFF
aliceblue F0F8FF
ghostwhite  F8F8FF
whitesmoke  F5F5F5
seashell  FFF5EE
beige F5F5DC
oldlace FDF5E6
floralwhite FFFAF0
ivory FFFFF0
antiquewhite  FAEBD7
linen FAF0E6
lavenderblush FFF0F5
mistyrose FFE4E1

Grey:

gainsboro DCDCDC
lightgray D3D3D3
silver  C0C0C0
darkgray  A9A9A9
gray  808080
lightslategray  778899
slategray 708090
dimgray 696969
darkslategray 2F4F4F
black 000000

Red:

indianred CD5C5C
lightcoral  F08080
salmon  FA8072
darksalmon  E9967A
lightsalmon FFA07A
crimson DC143C
red FF0000
firebrick B22222
darkred 8B0000

Pink:

pink  FFC0CB
lightpink FFB6C1
hotpink FF69B4
deeppink  FF1493
mediumvioletred C71585
palevioletred DB7093

Orange:

lightsalmon FFA07A
coral FF7F50
tomato  FF6347
orangered FF4500
darkorange  FF8C00
orange  FFA500

Yellow:

gold  FFD700
yellow  FFFF00
lightyellow FFFFE0
lemonchiffon  FFFACD
lightgoldenrodyellow  FAFAD2
papayawhip  FFEFD5
moccasin  FFE4B5
peachpuff FFDAB9
palegoldenrod EEE8AA
khaki F0E68C
darkkhaki BDB76B

Purple:

lavender  E6E6FA
thistle D8BFD8
plum  DDA0DD
violet  EE82EE
orchid  DA70D6
fuchsia FF00FF
magenta FF00FF
mediumorchid  BA55D3
mediumpurple  9370DB
blueviolet  8A2BE2
darkviolet  9400D3
darkorchid  9932CC
darkmagenta 8B008B
purple  800080
indigo  4B0082
slateblue 6A5ACD
darkslateblue 483D8B
mediumslateblue 7B68EE

Green:

greenyellow ADFF2F
chartreuse  7FFF00
lawngreen 7CFC00
lime  00FF00
limegreen 32CD32
palegreen 98FB98
lightgreen  90EE90
mediumspringgreen 00FA9A
springgreen 00FF7F
mediumseagreen  3CB371
seagreen  2E8B57
forestgreen 228B22
green 008000
darkgreen 006400
yellowgreen 9ACD32
olivedrab 6B8E23
olive 808000
darkolivegreen  556B2F
mediumaquamarine  66CDAA
darkseagreen  8FBC8F
lightseagreen 20B2AA
darkcyan  008B8B
teal  008080

Blue:

aqua  00FFFF
cyan  00FFFF
lightcyan E0FFFF
paleturquoise AFEEEE
aquamarine  7FFFD4
turquoise 40E0D0
mediumturquoise 48D1CC
darkturquoise 00CED1
cadetblue 5F9EA0
steelblue 4682B4
lightsteelblue  B0C4DE
powderblue  B0E0E6
lightblue ADD8E6
skyblue 87CEEB
lightskyblue  87CEFA
deepskyblue 00BFFF
dodgerblue  1E90FF
cornflowerblue  6495ED
mediumslateblue 7B68EE
royalblue 4169E1
blue  0000FF
mediumblue  0000CD
darkblue  00008B
navy  000080
midnightblue  191970

Brown:

cornsilk  FFF8DC
blanchedalmond  FFEBCD
bisque  FFE4C4
navajowhite FFDEAD
wheat F5DEB3
burlywood DEB887
tan D2B48C
rosybrown BC8F8F
sandybrown  F4A460
goldenrod DAA520
darkgoldenrod B8860B
peru  CD853F
chocolate D2691E
saddlebrown 8B4513
sienna  A0522D
brown A52A2A
maroon  800000


# SCSS/SASS/Compass

$weld_transition_fast: all 0.125s;

http://compass-style.org/reference/compass/helpers/colors/

tint($weld_cyan, 15%); // make bright
shade($weld_gray_30, 20%); // make dark
mix($color1, $color2, 25%); // 25% of $color1

scale-saturation($weld_content_button_blue, 50%);

top: ($weld_toolbar_height + 10px);
width: calc(100% - #{$compass_variable}); /* Note: #{} for inline calc() */

https://www.sitepoint.com/sass-basics-control-directives-expressions/

@mixin test($condition) {
  $color: if($condition, blue, red);
  color:$color
}

.firstClass {
  @include test(true);
}


# Unicode characters

(also ::after)

.container::before {
  content: '\2714';
}

✖ 2716
✔ 2714
❗2757

http://www.fileformat.info/info/unicode/char/2714/index.htm

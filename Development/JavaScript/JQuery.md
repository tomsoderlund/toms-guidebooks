## JQuery

  <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
  <script language="javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>

### HTTP

  var jqxhr = $.get('example.php', function () {
    alert('Success!')
  })

### Selectors

.find() and .children() methods are similar,
except that the latter only travels a single level down the DOM tree.

Classes:

  $("p").removeClass("myClass noClass").addClass("yourClass")

### Custom Jquery Plugins

http://stefangabos.ro/jquery/jquery-plugin-boilerplate-oop/

### Events

  $('#slider').on('click mousedown touchstart', clearInterval.bind(this, timerId))
  $("button").click(function (event) {
    alert(event.target.id)
  })
  $(document).ready(function () { alert('Document Ready') }) // When DOM is loaded
  $(window).load(function () { alert('Load') }) // When all images etc has been loaded

  $(document).ready(function () {
    $("a").click(function (event){
      alert("Thanks for visiting!")
    })
  })

  $(".icon_gift").hover(
    function (eventObject) {
      popover = $(this).find(".gift_popover")
      popover.show()
    },
    function (eventObject) {
      popover = $(this).find(".gift_popover")
      popover.hide()
    }
  )

### DOM

  var newElement = $('<p>Test</p>').appendTo('.parentClass')
  var parentElement = $('.parentClass').append('<p>Test</p>')

  $('#parentElement').empty()

### Position X/Y

  var getElementPosition = function (selector) {
    var elementPos = $(selector).position()
    return [elementPos.left, elementPos.top]
  }

  var setElementPosition = function (selector, pos) {
    $(selector).css({ left: pos[0] + 'px', top: pos[1] + 'px' })
  }

### Forms

  $('#firstname').focus()

  textboxValue = $('#mytextbox').val()

  if ($(this).attr('id') == "radiobutton_female") {
    $("#radiobutton_female").removeClass("radiobutton").addClass("radiobutton_selected")
  }

  $('form.edit_task').submit(checkForm)

  $("#task_notes").html("")
  .text()
  $('#task_notes').attr('value') == 'Notes'
  $('#task_notes').attr('value', '')
  $("#gender").val("female")

  $( "p:last" ).offset({ top: 10, left: 30 })
  $( "p:last" ).position({ top: 10, left: 30 })

### CSS

  $('#album1').css('left', this.x + 'px')

### Animations

  $(elementId).animate({
      top: '+=50',
      //width: ['toggle', 'swing']
    },
    1000,
    animateBack(elementId)
  )

  var animatePulse = function (elem, duration, easing, props_to, props_from, until) {
    elem.animate(props_to, duration, easing,
      function () {
        if (until() === false) {
          animatePulse(elem, duration, easing, props_from, props_to, until)
        }
      }
    )
  }

  var pulseCounter = 0
  animatePulse($('#user-register'), 500, 'linear', {opacity: 0.5}, {opacity: 1},
    function () {
      pulseCounter++   
      return (pulseCounter >= 10)
    }
  )

### Drag & Drop

Note: include both JQuery and JQuery-UI!

Extending JQuery

  // Check if the element has a certain CSS property
  $.fn.hasCssProperty = function (wantedParameter) {
    if (this.cssProperty(wantedParameter))
      return true
    else
      return false
  }


//Params
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

//Make sure ?name= can handle spaces
var name = getQueryVariable("name");
var name = name.replace("%20", " ");

//Add fonts
var i;
for (i = 0; i < fonts.length; i++) {
  console.log("fonts[i]");
  document.write('<div id="' + i + '" class="module" style="font-family:' + fonts[i] + ';"><div class="name">' + fonts[i] + '</div><div class="contender">' + name +
    '</div><span class="delete">Delete</span><span class="fav">&#9734;</span></div>');
}


// local storage saving
var $content = $('.module');

$(document).ready(function() {
  for (i = 0; i < fonts.length; i++) {
    if (localStorage.getItem(i) === 'true') {
      $('#' + i).addClass('selected');
    } else {
      localStorage.getItem(i) == 'false'
    }
  }

  $(".module").click(function() {
    $(this).toggleClass("selected");
    localStorage.setItem(this.id, $content.hasClass('selected'));
  });

  $(".selected").click(function() {
    localStorage.setItem(this.id, 'flase');
  });


  // Clicks!

  // $(".delete").click(function() {
  //   $(this).parent().hide();
  // });

  $("#dark").click(function() {
    $('body').toggleClass("dark");
    $(this).toggleClass("on");
  });

  $("#reset").click(function() {
    localStorage.clear();
    location.reload();
  });

  $("#shuffle").click(function() {
    // add change param
  });


  $("#best").click(function() {
    $('.module').toggleClass("hide");
    $(this).toggleClass("on");
  });

});

//Randomize order if random=yes in url

if (getQueryVariable("random") == 'yes') {
  var cards = $(".module");
  for (var i = 0; i < cards.length; i++) {
    var target = Math.floor(Math.random() * cards.length - 1) + 1;
    var target2 = Math.floor(Math.random() * cards.length - 1) + 1;
    cards.eq(target).before(cards.eq(target2));
  }
}

//slider

$(function() {
  var handle = $("#custom-handle");

  $("#slider").slider({
    value: 48,
    min: 24,
    max: 120,
    create: function() {
      handle.text($(this).slider("value"));

    },
    stop: function(event, ui) {
      handle.text(ui.value);
      $(".module").css({
        'font-size': $("#slider").slider("value")
      });
      $(".module").css({
        'height': $("#slider").slider("value")
      });
    }
  });
});

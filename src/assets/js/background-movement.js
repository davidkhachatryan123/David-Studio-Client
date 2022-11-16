var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    front_x = 0,
    front_y = 0,
    back_x = 0,
    back_y = 0,
    front_friction = 1 / 120,
    back_friction = 1 / 30;

function moveBackground() {
  front_x += (lFollowX - front_x) * front_friction;
  front_y += (lFollowY - front_y) * front_friction;

  back_x += (lFollowX - back_x) * back_friction;
  back_y += (lFollowY - back_y) * back_friction;
  
  backTranslate = 'translate(' + back_x + 'px, ' + back_y + 'px) scale(1.1)';
  frontTranslate = 'translate(' + -front_x + 'px, ' + -front_y + 'px) scale(1.1)';

  $('.backLayer').css({
    '-webit-transform': backTranslate,
    '-moz-transform': backTranslate,
    '-ms-transform': backTranslate,
    '-o-transform': backTranslate,
    'transform': backTranslate
  });
  $('.frontLayer').css({
    '-webit-transform': frontTranslate,
    '-moz-transform': frontTranslate,
    '-ms-transform': frontTranslate,
    '-o-transform': frontTranslate,
    'transform': frontTranslate
  });


  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});

moveBackground();

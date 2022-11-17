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

let animReq, isAFK = false, start_afk = false;

let start_x = 0, start_y = 0,
    dest_x = 0, dest_y = 0;

let miliSecondsPassed = 0,
    oldTimeStamp = 0,
    timer = 0,
    newPositionTimer = 3000; // milliseconds


function moveBackground() {
  if(isAFK) {
    window.cancelAnimationFrame(animReq);

    isAFK = false;
    start_afk = false;
  }

  back_x += (lFollowX - back_x) * back_friction;
  back_y += (lFollowY - back_y) * back_friction;

  front_x += (lFollowX - front_x) * front_friction;
  front_y += (lFollowY - front_y) * front_friction;

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

  animReq = window.requestAnimationFrame(moveBackground);
}


function moveBackgroundOnAFK(timeStamp) {
  if(isNaN(timeStamp)) {
    if(!isAFK) {
      window.cancelAnimationFrame(animReq);
      isAFK = true;
    }

    start_afk = false;
  }
  else if(!start_afk) {
    oldTimeStamp = timeStamp;
    
    start_afk = true;

    start_x = back_x;
    start_y = back_y;
    dest_x = 0;
    dest_y = 0;
  }

  if(start_afk){
    miliSecondsPassed = timeStamp - oldTimeStamp;
    oldTimeStamp = timeStamp;
    timer += miliSecondsPassed;
  
    if(isNaN(timer) || timer > newPositionTimer) {
      timer = 0;
  
      start_x = back_x;
      start_y = back_y;
  
      var angel = 2 * Math.PI * Math.random();
      dest_x = 20 * Math.cos(angel);
      dest_y = 20 * Math.sin(angel);
  
      dest_x = (start_x + dest_x > 20 || start_x + dest_x < -20) ? start_x - dest_x : dest_x;
      dest_y = (start_y + dest_y > 20 || start_y + dest_y < -20) ? start_y - dest_y : dest_y;
    }
  
    let _back_x = easeInOutQuad(timer, start_x, dest_x, newPositionTimer);
    let _back_y = easeLinear(timer, start_y, dest_y, newPositionTimer);
    _back_x = _back_x > 20 ? 20 : _back_x < -20 ? -20 : _back_x;
    _back_y = _back_y > 20 ? 20 : _back_y < -20 ? -20 : _back_y;

    if(!isNaN(timer)) back_x = _back_x;
    if(!isNaN(timer)) back_y = _back_y;
  
    backTranslate = 'translate(' + back_x + 'px, ' + back_y + 'px) scale(1.1)';
    frontTranslate = 'translate(' + -back_x + 'px, ' + -back_y + 'px) scale(1.1)';

    $('.backLayer').css({
      '-webit-transform': backTranslate,
      '-moz-transform': backTranslate,
      '-ms-transform': backTranslate,
      '-o-transform': backTranslate,
      'transform': backTranslate
    });
  }

  animReq = window.requestAnimationFrame(moveBackgroundOnAFK);
}

function easeLinear (t, b, c, d) {
  return c * t / d + b;
}

function easeInOutQuad (t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}


let moveId;
$(window).on('mousemove click', function(e) {
  clearTimeout(moveId);

  if (isAFK) {
    moveBackground();
  }

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;


  moveId = setTimeout(moveBackgroundOnAFK, 2000);
});


moveBackground();
moveBackgroundOnAFK();

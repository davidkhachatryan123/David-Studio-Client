let pointsCount_lg = 150,
    pointsCount_md = 70,
    pointsCount_xs = 20,
    pointsSpeed = 1,
    pointsColor = '#2b8265',
    pointsSize = 5;

let linesColor = '#ffffff',
    lineMaxLength = 150;
    lineThickness = 0.01;


let mousePoint = {
      x: 0,
      y: 0
    },
    trackMousePoint = false,
    points = [mousePoint];

let intro = document.getElementById('intro');

let canvas = document.getElementById('backLayer');
let ctx = canvas.getContext('2d');


$(window).resize(function() {
  resizeCanvas();
});

$(document).mousemove(function(event) {
  mousePoint.x = event.clientX;
  mousePoint.y = event.clientY + window.pageYOffset;
});
$(document).mouseenter(function () {
  trackMousePoint = true;
});
$(document).mouseleave(function () {
  trackMousePoint = false;
});


function animation() {
  if(points.length < pointsCount) generatePoints(pointsCount - points.length);

  ctx.clearRect(0, 0, intro.offsetWidth, intro.offsetHeight);

  if(trackMousePoint) drawCircle(mousePoint.x, mousePoint.y);
  else points.pop();

  for(let i = trackMousePoint ? 1 : 0; i < points.length; i++) {
    points[i].x += pointsSpeed * Math.cos(points[i].direction);
    points[i].y += pointsSpeed * Math.sin(points[i].direction);

    if(points[i].x > canvas.width || points[i].x < 0 ||
      points[i].y > canvas.height || points[i].y < 0) {
        points.splice(i, 1);
    } else {
      drawCircle(points[i].x, points[i].y);
    }
  }

  for(let i = 0; i < points.length; i++) {
    let p1_x = points[i].x,
        p1_y = points[i].y;

    for(let j = 0; j < points.length; j++) {
      if(i === j) continue;
      
      let p2_x = points[j].x,
          p2_y = points[j].y;

      let length = getVectorLength(p1_x, p1_y, p2_x, p2_y);

      if (length < lineMaxLength) {
        line(p1_x, p1_y, p2_x, p2_y, map(length, lineMaxLength, 1, 1, length) * lineThickness);
      }
    }
  }

  window.requestAnimationFrame(animation);
}

resizeCanvas();
animation();


function generatePoints(count) {
  for(let i = 0; i < count; i++) {
    points.push({
      x: getRandomIntInRange(0, canvas.width),
      y: getRandomIntInRange(0, canvas.height),
      direction: Math.random() * 2 * Math.PI
    });
  }
}
function drawCircle(x, y) {
  ctx.beginPath();

  ctx.arc(x, y, pointsSize, 0, 2 * Math.PI);

  ctx.fill();
}

function line(x1, y1, x2, y2, thickness) {
  ctx.beginPath();

  ctx.lineWidth = thickness;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  ctx.stroke();
}
function getVectorLength(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getRandomIntInRange(min, max) {
  return Math.random() * (max - min) + min;
}
function map(value, fromSource, toSource, fromTarget, toTarget) {
  return (value - fromSource) / (toSource - fromSource) * (toTarget - fromTarget) + fromTarget;
}

function resizeCanvas() {
  if(intro.offsetWidth > 1200) pointsCount = pointsCount_lg;
  else if(intro.offsetWidth > 768) pointsCount = pointsCount_md;
  else pointsCount = pointsCount_xs;

  canvas.width = intro.offsetWidth;
  canvas.height = intro.offsetHeight;

  ctx.fillStyle = pointsColor;
  ctx.strokeStyle = linesColor;
}
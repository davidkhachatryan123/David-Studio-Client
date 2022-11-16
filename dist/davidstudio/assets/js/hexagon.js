let back_radius = 35, front_radius = 60;

let back_chance = 0.40, front_chance = 0.15;

let vertexes = 6, 
    alfa = 2 * Math.PI / vertexes,
    rotation = Math.PI / 6;

let backCanvas,
    backCanvasCtx,
    frontCanvas,
    frontCanvasCtx;

[backCanvas, backCanvasCtx] = setupCanvas('backLayer');
[frontCanvas, frontCanvasCtx] = setupCanvas('frontLayer');


resizeCanvases(backCanvas, frontCanvas);

let doit;
window.onresize = function(){
  clearTimeout(doit);

  doit = setTimeout(() => resizeCanvases(backCanvas, frontCanvas), 100);
};


function setupCanvas(canvasName) {
  let canvas = document.getElementById(canvasName);
  let ctx = canvas.getContext('2d');

  return [canvas, ctx];
}
function resizeCanvases(...canvases) {
  for (const canvas of canvases) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  redraw();
}

function redraw() {
  backCanvasCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
  frontCanvasCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);

  var gradient = backCanvasCtx.createLinearGradient(backCanvas.width / 2, 0, backCanvas.width / 2, backCanvas.height);
  gradient.addColorStop(0, "#156d76");
  gradient.addColorStop(1, "#199491");
  backCanvasCtx.strokeStyle = gradient;

  frontCanvasCtx.strokeStyle = "#2b8265";
  frontCanvasCtx.lineWidth = 2;
  frontCanvasCtx.fillStyle = "#2b8265";

  drawHexagonGrid(backCanvasCtx, 0, 0, window.innerWidth, window.innerHeight, back_radius, back_chance, false, 1);
  drawHexagonGrid(frontCanvasCtx, 0, 0, window.innerWidth, window.innerHeight, front_radius, front_chance, true, 1);
}

function drawHexagon(ctx, x, y, radius, rotation, dotted) {
  let dots = [];

  ctx.beginPath();
 
  for(let i = 0; i < vertexes; i++) {
    x += radius * Math.cos(alfa * i + rotation);
    y += radius * Math.sin(alfa * i + rotation);

    ctx.lineTo(x, y);

    if(dotted) {
      dots.push(x);
      dots.push(y);
    }
  }

  ctx.closePath();
  ctx.stroke();
  
  if(dotted) {
    for(let i = 0; i < dots.length; i += 2) {
      ctx.beginPath();

      ctx.arc(dots[i], dots[i + 1], 5, 0, 2 * Math.PI, false);
      
      ctx.fill();
      ctx.stroke();
    }
  }
}
function drawHexagonGrid(ctx, startX, startY, width, height, radius, chance, dotted, lastCount) {
  for(let y = startY; y + (-lastCount * radius) * (1 + Math.sin(alfa - rotation)) < height;
      y += 2 * radius * (1 + Math.sin(alfa - rotation))) {
    
    let i = 0;

    for(let x = startX, j = 0; x + (-lastCount * radius) * Math.cos(alfa - rotation) < width;
        x += radius * Math.cos(alfa - rotation), y += (-1) ** j++ * radius * (1 + Math.sin(alfa - rotation))) {
      
      let random = getRandomInt(0.99);
      if(random < chance) {
        drawHexagon(ctx, x, y, radius, rotation, dotted);
      }

      i++;
    }

    if(i % 2 !== 0)
      y -= radius * (1 + Math.sin(alfa - rotation));
  }
}

function getRandomInt(max) {
  return(Math.random() * max).toFixed(2);
}

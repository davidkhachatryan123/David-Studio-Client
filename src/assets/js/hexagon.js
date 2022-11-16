let l1_radius = 35;
let l2_radius = 60;

let l1_chance = 0.40;
let l2_chance = 0.15;

let vertexes = 6;
let alfa = 2 * Math.PI / vertexes;
let rotation = Math.PI / 6;

let ctx = setupCanvas('backLayer');

let backLayer = document.getElementById('backLayer');
setupCanvasBackgroundGradient(ctx);

let frontCanvas = setupCanvas('frontLayer');
frontCanvas.strokeStyle = "#2b8265";
frontCanvas.lineWidth = 2;
frontCanvas.fillStyle = "#2b8265";


drawHexagonGrid_Rotated(ctx, 0, 0, window.innerWidth, window.innerHeight, l1_radius, l1_chance, false, 1);

drawHexagonGrid_Rotated(frontCanvas, 0, 0, window.innerWidth, window.innerHeight, l2_radius, l2_chance, true, 1);


function setupCanvas(canvasName) {
  let canvas = document.getElementById(canvasName);
  let ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  return ctx;
}

function setupCanvasBackgroundGradient(ctx) {
  var gradient = ctx.createLinearGradient(backLayer.width / 2, 0, backLayer.width / 2, backLayer.height);
  gradient.addColorStop(0, "#156d76");
  gradient.addColorStop(1, "#199491");
  ctx.strokeStyle = gradient;
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
  for(let y = startY;
      y + (-lastCount * radius) * Math.sin(alfa) < height;
      y += radius * Math.sin(alfa)) {

    let i = 0;

    for(let x = startX, j = 0;
        x + (-lastCount * radius) * (1 + Math.cos(alfa)) < width;
        x += radius * (1 + Math.cos(alfa)),
        y += (-1) ** j++ * radius * Math.sin(alfa)) {

      let random = getRandomInt(0.99);
      if(random < chance) {
        drawHexagon(ctx, x, y, radius, 0, dotted);
      }

      i++;
    }

    if(i % 2 === 0)
      y += radius * Math.sin(alfa);
  }
}

function drawHexagonGrid_Rotated(ctx, startX, startY, width, height, radius, chance, dotted, lastCount) {
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

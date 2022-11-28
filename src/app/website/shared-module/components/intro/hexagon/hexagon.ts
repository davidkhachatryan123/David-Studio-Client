export const HexagonConfig = {
  canvas_names: {
    front: 'frontLayer',
    back: 'backLayer'
  },
  radius: {
    back: 35,
    front: 70
  },
  chance: {
    back: 0.40,
    front: 0.15
  }
};

export class Hexagon {
  vertexes = 6;
  alfa = 2 * Math.PI / this.vertexes;
  rotation = Math.PI / 6;

  backCanvas: HTMLCanvasElement;
  backCanvasCtx: CanvasRenderingContext2D;
  frontCanvas: HTMLCanvasElement;
  frontCanvasCtx: CanvasRenderingContext2D;

  init() {
    [this.backCanvas, this.backCanvasCtx] = this.setupCanvas(HexagonConfig.canvas_names.back);
    [this.frontCanvas, this.frontCanvasCtx] = this.setupCanvas(HexagonConfig.canvas_names.front);

    this.resize(window.innerWidth, window.innerHeight);
  }

  resize(width: number, height: number) {
    this.resizeCanvases([ this.backCanvas, this.frontCanvas ], width, height);
  }

  private setupCanvas(canvasName: string): [HTMLCanvasElement, CanvasRenderingContext2D] {
    let canvas = <HTMLCanvasElement>document.getElementById(canvasName);
    let ctx = canvas.getContext('2d');
  
    return [canvas, ctx];
  }

  private resizeCanvases(canvases: Array<HTMLCanvasElement>, width: number, height: number) {
    for (const canvas of canvases) {
      canvas.width = width;
      canvas.height = height;
    }
  
    this.redraw();
  }

  private redraw() {
    this.backCanvasCtx.clearRect(0, 0, this.backCanvas.width, this.backCanvas.height);
    this.frontCanvasCtx.clearRect(0, 0, this.frontCanvas.width, this.frontCanvas.height);
  
    var gradient = this.backCanvasCtx.createLinearGradient(this.backCanvas.width / 2, 0, this.backCanvas.width / 2, this.backCanvas.height);
    gradient.addColorStop(0, "#156d76");
    gradient.addColorStop(1, "#199491");
    this.backCanvasCtx.strokeStyle = gradient;
  
    this.frontCanvasCtx.strokeStyle = "#2b8265";
    this.frontCanvasCtx.lineWidth = 2;
    this.frontCanvasCtx.fillStyle = "#2b8265";
  
    this.drawHexagonGrid(this.backCanvasCtx,
      0, 0, window.innerWidth, window.innerHeight,
      HexagonConfig.radius.back, HexagonConfig.chance.back, false, 1);
    this.drawHexagonGrid(this.frontCanvasCtx,
      0, 0, window.innerWidth, window.innerHeight,
      HexagonConfig.radius.front, HexagonConfig.chance.front, true, 1);
  }

  private drawHexagon(ctx: CanvasRenderingContext2D,
    x: number, y: number, radius: number, rotation: number, dotted: boolean) {
    
    let dots = [];
  
    ctx.beginPath();
   
    for(let i = 0; i < this.vertexes; i++) {
      x += radius * Math.cos(this.alfa * i + rotation);
      y += radius * Math.sin(this.alfa * i + rotation);
  
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
  
  private drawHexagonGrid(ctx: CanvasRenderingContext2D,
    startX: number, startY: number,
    width: number, height: number, radius: number, chance: number, dotted: boolean, lastCount: number) {
    
    for(let y = startY; y + (-lastCount * radius) * (1 + Math.sin(this.alfa - this.rotation)) < height;
      y += 2 * radius * (1 + Math.sin(this.alfa - this.rotation))) {
      
      let i = 0;
  
      for(let x = startX, j = 0; x + (-lastCount * radius) * Math.cos(this.alfa - this.rotation) < width;
          x += radius * Math.cos(this.alfa - this.rotation), y += (-1) ** j++ * radius * (1 + Math.sin(this.alfa - this.rotation))) {
        
        let random = this.getRandomInt(0.99);
        if(random < chance) {
          this.drawHexagon(ctx, x, y, radius, this.rotation, dotted);
        }
  
        i++;
      }
  
      if(i % 2 !== 0)
        y -= radius * (1 + Math.sin(this.alfa - this.rotation));
    }
  }

  private getRandomInt(max: number): number {
    return parseFloat((Math.random() * max).toFixed(2));
  }
}

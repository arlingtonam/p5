// const density = 'Ñ@#W$9876543210?!abc;:+=-,._  ';
const density = '⏺  ';
// ಄෴⏹∎∴∵∶∷⏺●•╳▣▩▁▂▃▄▅▆▇█▉▶▷☰⚊⛬⁚⁞
// const density = '█▓▒░ ';

let strokes = [];
let currentStroke = null;
let cow;
let gridSize;c
// inputs
let widthElement  = document.getElementById('canvas-width');
let heightElement  = document.getElementById('canvas-height');
let strokeElement  = document.getElementById('stroke-width')

function preload()  {
  cow = loadImage("cow.jpg");
}

function setup () {
  gridSize = 20;
  points = []
    const windowWidth = window.innerWidth - (30 * 2);
    const windowHeight = window.innerHeight- (30 * 2);
    const displayScale = Math.min(
      windowWidth / cow.width ,
      windowHeight / cow.height
    );
    const displayWidth = cow.width * displayScale;
    const displayHeight = cow.height * displayScale;
    let p5Canvas = createCanvas( 
      cow.width , 
      cow.height,
    );
    p5Canvas.id('p5Canvas');
    p5Canvas.elt.style.width = displayWidth + "px";
    p5Canvas.elt.style.height = displayHeight + "px";
    background(0)
  // };

// function draw() {
  let w = width / cow.width;
  let h = height / cow.height;
  cow.loadPixels();

  for (let i = 0; i < cow.width; i += gridSize) {
      for (let j = 0; j < cow.height; j += gridSize) {
        // Average all pixels in this grid cell
        let totalR = 0, totalG = 0, totalB = 0;
        let count = 0;

        // Loop through each pixel in the grid cell
        for (let x = i; x < i + gridSize && x < cow.width; x++) {
          for (let y = j; y < j + gridSize && y < cow.height; y++) {
            const pixelIndex = (x + y * cow.width) * 4;
            totalR += cow.pixels[pixelIndex + 0];
            totalG += cow.pixels[pixelIndex + 1];
            totalB += cow.pixels[pixelIndex + 2];
            count++;
          }
        }

        // Calculate average
        const r = totalR / count;
        const g = totalG / count;
        const b = totalB / count;
        const avg = (r + g + b) / 3;
        const len = density.length;
        const charIndex = floor(map(avg, 0, 255, len - 1, 0));
        // fill(r,g,b);
        fill(255);
        noStroke();

        textSize(gridSize);
        textAlign(CENTER, CENTER);
        text(density.charAt(charIndex), i + gridSize / 2, j + gridSize / 2);
      }
    }
}
// const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
const density = '░▒▓█ ';
let strokes = [];
let currentStroke = null;
let cow;
let gridSize;
// inputs
// let widthElement  = document.getElementById('canvas-width');
// let heightElement  = document.getElementById('canvas-height');
// let strokeElement  = document.getElementById('stroke-width')

function preload()  {
  cow = loadImage("cow.jpg");
}

function setup () {
  gridSize = 20;
  noCanvas();
  background(0)
  let w = width / cow.width;
  let h = height / cow.height;
  cow.loadPixels();
console.log('',cow.width )
  for (let j = 0; j < cow.width; j += gridSize) {
    let row = '';
    for (let i = 0; i < cow.width; i += gridSize) {
        let totalR = 0, totalG = 0, totalB = 0;
        let count = 0;

        for (let x = i; x < i + gridSize && x < cow.width; x++) {
          for (let y = j; y < j + gridSize && y < cow.height; y++) {
            const pixelIndex = (x + y * cow.width) * 4;
            totalR += cow.pixels[pixelIndex + 0];
            totalG += cow.pixels[pixelIndex + 1];
            totalB += cow.pixels[pixelIndex + 2];
            count++;
          }
        }

        const r = totalR / count;
        const g = totalG / count;
        const b = totalB / count;
        const avg = (r + g + b) / 3;
        const len = density.length;
        const charIndex = floor(map(avg, 0, 255, len - 1, 0));

        const c = density.charAt(charIndex)
        if(c == " ") row += '&nbsp;'
        else row += c;
      }
      textSize(1);
      createDiv(row);
    }

  }
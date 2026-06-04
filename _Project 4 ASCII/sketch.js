// const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
const density = '⏺.';
//  const density =  ' ░▒▓█'; //░▒▓
let strokes = [];
let currentStroke = null;
let grid;
let asciiRows = [];
let img;

function preload()  {
  img = loadImage("cow.png");
}

function setup () {
  gridSize = 30;
  noCanvas();
  renderASCII();
}

function renderASCII() {
  asciiRows = [];
  removeElements();
  img.loadPixels();
  for (let j = 0; j < img.height; j += gridSize) {
    let row = '';
    let rowHtml = '';
    for (let i = 0; i < img.width; i += gridSize / 2 ) {
        let totalR = 0, totalG = 0, totalB = 0;
        let count = 0;

        for (let x = i; x < i + gridSize  / 2 && x < img.width; x++) {
          for (let y = j; y < j + gridSize && y < img.height; y++) {
            const pixelIndex = (x + y * img.width) * 4;
            if (img.pixels[pixelIndex + 3] === 0) continue;
            totalR += img.pixels[pixelIndex + 0];
            totalG += img.pixels[pixelIndex + 1];
            totalB += img.pixels[pixelIndex + 2];
            count++;
          }
        }

        const r = count > 0 ? totalR / count : 255;
        const g = count > 0 ? totalG / count : 255;
        const b = count > 0 ? totalB / count : 255;
        const avg = (r + g + b) / 3;
        const len = density.length;
        const charIndex = floor(map(avg, 0, 255, len - 1, 0));

        const c = density.charAt(charIndex);
        if (c == " ") {
          row += ' ';
          rowHtml += '&nbsp;';
        } else {
          row += c;
          rowHtml += `<span style="color:rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})">${c}</span>`;
        }
      }
      asciiRows.push(row);
      let rowDiv = createDiv('');
      rowDiv.html(rowHtml);
      // rowDiv.style('font-size', `${gridSize}px` / 2);
      // rowDiv.style('line-height', `${gridSize}px`);
    }
}

function uploadImage() {
  let file = document.getElementById('imageUpload').files[0];
  let reader = new FileReader();
  reader.onload = (evt) => {
    loadImage(evt.target.result, (loadedImg) => {
      img = loadedImg;
      renderASCII();
    });
  };
  reader.readAsDataURL(file);
}

function exportAsText() {
  let output = '';
  for (let row of asciiRows) {
    output += row + '\n';
  }
  let blob = new Blob([output], { type: 'text/plain' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = 'ascii-art.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function exportAsHTML() {
  let output = '<style>';
  output += 'body { margin: 0; padding: 20px; background: #000; }';
  output += 'div { font-family: monospace; font-size: 14px; line-height: 1em; color: #fff; white-space: pre; }';
  output += '</style>';
  for (let row of asciiRows) {
    output += '<div>' + row + '</div>';
  }
  let blob = new Blob([output], { type: 'text/html' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = 'ascii-art.html';
  a.click();
  URL.revokeObjectURL(url);
}

function exportAsSVG() {
  const charWidth = 10;
  const charHeight = 14;
  const cols = asciiRows[0] ? asciiRows[0].length : 0;
  const svgWidth = cols * charWidth;
  const svgHeight = asciiRows.length * charHeight;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;

  for (let j = 0; j < asciiRows.length; j++) {
    const rowText = asciiRows[j];
    const y = j * charHeight + charHeight;
    for (let i = 0; i < rowText.length; i++) {
      const ch = rowText[i];
      if (ch !== ' ') {
        const x = i * charWidth;
        svg += `<text x="${x}" y="${y}" font-family="monospace" font-size="${charHeight}px" fill="#000">${ch}</text>`;
      }
    }
  }

  svg += `</svg>`;
  let blob = new Blob([svg], { type: 'image/svg+xml' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = 'ascii-art.svg';
  a.click();
  URL.revokeObjectURL(url);
}
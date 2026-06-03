let grid = [];
let gridSize ; // Size of each cell
let cols, rows;
let charToDraw = '⏺'; // Character to draw
let isTouch = false;
function setup() {

  let slider = document.getElementById('grid-size');
  cols = parseInt(slider.value);
  gridSize = floor(windowWidth / cols);
  rows = floor(windowHeight / gridSize);

  slider.addEventListener('input', function() {
    cols = parseInt(this.value);
    document.getElementById('cols-display').textContent = 'column amount: ' + cols;
    updateGridSize();
  });

  createCanvas(cols * gridSize, rows * gridSize);

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = ' ';
    }
  }

  background(220, 254, 82);
  textFont('monospace');
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();
}

function draw() {
  background(220, 254, 82);
  
  stroke(200);
  strokeWeight(1);
  for (let i = 0; i <= cols; i++) {
    line(i * gridSize, 0, i * gridSize, height);
  }
  for (let j = 0; j <= rows; j++) {
    line(0, j * gridSize, width, j * gridSize);
  }
  
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(gridSize * 0.8); // Update text size based on current gridSize
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] !== ' ') {
        text(grid[i][j], i * gridSize + gridSize/2, j * gridSize + gridSize/2);
      }
    }
  }  
}

function drawAtPosition(x, y) {
  let col = floor(x / gridSize);
  let row = floor(y / gridSize);
  
  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    grid[col][row] = charToDraw;
  }
}

function mousePressed() {
  if (isTouch) return;
  drawAtPosition(mouseX, mouseY);
}
function mouseDragged() {
  if (isTouch) return;
  drawAtPosition(mouseX, mouseY);
}
function touchStarted() {
  isTouch = true;
  drawAtPosition(mouseX, mouseY);
  return false;
}
function touchMoved() {
  drawAtPosition(mouseX, mouseY);
  return false;
}
function touchEnded() {
  isTouch = false;
  return false;
}
function windowResized() {
  gridSize = floor(windowWidth / cols);
  rows = floor(windowHeight / gridSize);
  resizeCanvas(cols * gridSize, rows * gridSize);

  let oldGrid = grid;
  grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = (oldGrid[i] && oldGrid[i][j]) ? oldGrid[i][j] : ' ';
    }
  }
}

function exportAsHTML() {
  let output = '';
  output += '<!DOCTYPE html><html><head><style>';
  output += 'body { margin: 0; padding: 20px; background: #000; }';
  output += '.row { display: flex; }';ko
  output += '.cell { width: 1em; height: 1em; text-align: center; font-family: monospace; font-size: 14px; line-height: 1em; color: #fff; }';
  output += '</style></head><body>';

  for (let j = 0; j < rows; j++) {
    output += '<div class="row">';
    for (let i = 0; i < cols; i++) {
      let ch = grid[i][j];
      if (ch === ' ') ch = '&nbsp;';
      output += '<div class="cell">' + ch + '</div>';
    }
    output += '</div>';
  }

  output += '</body></html>';

  let blob = new Blob([output], { type: 'text/html' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = 'ascii-art.html';
  a.click();
  URL.revokeObjectURL(url);
  console.log('ASCII Art exported as HTML');
}
function exportAsSVG() {
  const cellSize = parseInt(gridSize);
  const svgWidth = cols * cellSize;
  const svgHeight = rows * cellSize;
  const fontSize = cellSize * 0.8;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;
  svg += `<rect width="100%" height="100%" fill="#dcfe52"/>`;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] !== ' ') {
        const x = i * cellSize + cellSize / 2;
        const y = j * cellSize + cellSize / 2;
        svg += `<text x="${x}" y="${y}" font-family="monospace" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central">${grid[i][j]}</text>`;
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
function exportAsText() {
  let output = '';
  for (let j = 0; j < rows; j++) {
    let line = '';
    for (let i = 0; i < cols; i++) {
      line += grid[i][j];
    }
    output += line + '\n';
  }
  
  let blob = new Blob([output], { type: 'text/plain' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = 'ascii-art.txt';
  a.click();
  URL.revokeObjectURL(url);
  console.log('ASCII Art exported:');
}
function clearGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = ' ';
    }
  }
}

function keyPressed() {
  if (key.length === 1) {
    charToDraw = key;
  }
}

function updateGridSize() {
  gridSize = floor(windowWidth / cols);
  rows = floor(windowHeight / gridSize);

  let oldGrid = grid;
  grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = (oldGrid[i] && oldGrid[i][j]) ? oldGrid[i][j] : ' ';
    }
  }

  resizeCanvas(cols * gridSize, rows * gridSize);
  loop();
}


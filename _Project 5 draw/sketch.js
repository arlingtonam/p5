let grid = [];
let gridSize = 50; // Size of each cell
let cols, rows;
let charToDraw = '⏺'; // Character to draw
let isTouch = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / gridSize);
  rows = floor(height / gridSize);
  
  // Initialize grid with empty spaces
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
  
  // Draw grid (optional - remove these lines if you don't want grid lines)
  stroke(200);
  strokeWeight(1);
  for (let i = 0; i <= cols; i++) {
    line(i * gridSize, 0, i * gridSize, height);
  }
  for (let j = 0; j <= rows; j++) {
    line(0, j * gridSize, width, j * gridSize);
  }
  
  // Draw characters
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
  
  // Check bounds
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
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / gridSize);
  rows = floor(height / gridSize);
  
  // Reinitialize grid
  let oldGrid = grid;
  grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      // Preserve old values if they exist
      grid[i][j] = (oldGrid[i] && oldGrid[i][j]) ? oldGrid[i][j] : ' ';
    }
  }
}

function exportAsText() {
  let output = '';
  
  // Convert grid to text (row by row)
  for (let j = 0; j < rows; j++) {
    let line = '';
    for (let i = 0; i < cols; i++) {
      line += grid[i][j];
    }
    output += line + '\n';
  }
  
  // Create a downloadable text file
  let blob = new Blob([output], { type: 'text/plain' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = 'ascii-art.txt';
  a.click();
  URL.revokeObjectURL(url);
  
  // Also log to console
  console.log('ASCII Art exported:');
  console.log(output);
}

// Keyboard shortcuts
function keyPressed() {
  // Press 'c' to clear
  if (key === 'c' || key === 'C') {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = ' ';
      }
    }
  }
  
  // Press 'e' to export
  if (key === 'e' || key === 'E') {
    exportAsText();
  }
  
  // Press number keys 1-5 to change grid size
  if (key === '1') {
    gridSize = 10;
    updateGridSize();
  }
  if (key === '2') {
    gridSize = 20;
    updateGridSize();
  }
  if (key === '3') {
    gridSize = 30;
    updateGridSize();
  }
  if (key === '4') {
    gridSize = 40;
    updateGridSize();
  }
  if (key === '5') {
    gridSize = 50;
    updateGridSize();
  }
  
  // Type any other character to set it as the drawing character
  if (key.length === 1 && key !== 'c' && key !== 'C' && key !== 'e' && key !== 'E' && !['1','2','3','4','5'].includes(key)) {
    charToDraw = key;
  }
}

function updateGridSize() {
  cols = floor(width / gridSize);
  rows = floor(height / gridSize);
  
  // Reinitialize grid
  let oldGrid = grid;
  grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      // Preserve old values if they exist
      grid[i][j] = (oldGrid[i] && oldGrid[i][j]) ? oldGrid[i][j] : ' ';
    }
  }
}
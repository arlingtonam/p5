// --- Mode ---
let mode = 'text';
let cnv;
let color;

// --- Text draw ---
let grid = [];
let gridSize;
let cols, rows;
let charToDraw = 'O';

// --- Pattern draw ---
let points = [];
let drawing = false;
let shapes = [];
let currentPattern = 'polka';
W
function setup() {
    // background(0);
    cols = 60 // parseInt(slider.value);
    gridSize = floor(windowWidth / cols);
    rows = floor(windowHeight / gridSize);

    cnv = createCanvas(cols * gridSize, rows * gridSize);
    initGrid();
    textFont('monospace');
    textAlign(CENTER, CENTER);
    color = 'rgb(0, 0, 0)';
}

function initGrid() {
    grid = [];
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) grid[i][j] = ' ';
    }
}

function setMode(m) {
    mode = m;
}

function setColor(c) {
    color = `rgb(${c})`;
}

function setPattern(name) {
    currentPattern = name;
    mode = 'pattern';
}

// --- Pattern helpers ---
function clipToShape(pts) {
    drawingContext.beginPath();
    drawingContext.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) drawingContext.lineTo(pts[i][0], pts[i][1]);
    drawingContext.closePath();
    drawingContext.clip();
}

function getBounds(pts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let [x, y] of pts) {
        minX = min(minX, x); minY = min(minY, y);
        maxX = max(maxX, x); maxY = max(maxY, y);
    }
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}

function patternPolkaDots(c) {
    drawingContext.fillStyle = c;
    for (let x = 0; x < width; x += 24) {
        for (let y = 0; y < height; y += 24) {
            drawingContext.beginPath();
            drawingContext.arc(x + 12, y + 12, 6, 0, Math.PI * 2);
            drawingContext.fill();
        }
    }
}

function patternLinearGradient(b, c) {
    let grad = drawingContext.createLinearGradient(b.minX, b.minY, b.maxX, b.maxY);
    grad.addColorStop(0, c);
    grad.addColorStop(1, 'rgb(0, 0, 225)');
    drawingContext.fillStyle = grad;
    drawingContext.fillRect(b.minX, b.minY, b.w, b.h);
}

function patternRadialGradient(b, c) {
    let cx = b.minX + b.w / 2, cy = b.minY + b.h / 2;
    let grad = drawingContext.createRadialGradient(cx, cy, 0, cx, cy, max(b.w, b.h) / 2);
    grad.addColorStop(0, c);
    grad.addColorStop(1, 'rgb(255, 0, 0)');
    drawingContext.fillStyle = grad;
    drawingContext.fillRect(b.minX, b.minY, b.w, b.h);
}

function patternStripes(b, c) {
    drawingContext.strokeStyle = c;
    drawingContext.lineWidth = 3;
    for (let y = b.minY; y < b.maxY; y += 9) {
        drawingContext.beginPath();
        drawingContext.moveTo(b.minX, y);
        drawingContext.lineTo(b.maxX, y);
        drawingContext.stroke();
    }
}

function drawPattern(shape) {
    drawingContext.save();
    clipToShape(shape.pts);
    let b = getBounds(shape.pts);
    let c = shape.color;
    if (shape.pattern === 'polka') patternPolkaDots(c);
    else if (shape.pattern === 'linear') patternLinearGradient(b, c);
    else if (shape.pattern === 'radial') patternRadialGradient(b, c);
    else if (shape.pattern === 'stripes') patternStripes(b, c);
    drawingContext.restore();
}

// --- Draw loop ---
function draw() {
    clear();

    // Patterns behind grid
    for (let shape of shapes) drawPattern(shape);

    // Grid lines
    // stroke(100);
    // strokeWeight(1);
    // for (let i = 0; i <= cols; i++) line(i * gridSize, 0, i * gridSize, height);
    // for (let j = 0; j <= rows; j++) line(0, j * gridSize, width, j * gridSize);

    // Characters
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(gridSize * 0.8);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let cell = grid[i][j];
            if (cell !== ' ') {
                fill(cell.color);
                text(cell.char, i * gridSize + gridSize / 2, j * gridSize + gridSize / 2);
            }
        }
    }

    // In-progress lasso
    if (mode === 'pattern' && drawing && points.length > 1) {
        noFill();
        // noStroke();
        stroke(0);
        strokeWeight(1);
        beginShape();
        for (let [x, y] of points) vertex(x, y);
        endShape();
        noStroke();
    }
}

// --- Text draw ---
function drawAtPosition(x, y) {
    let col = floor(x / gridSize);
    let row = floor(y / gridSize);
    if (col >= 0 && col < cols && row >= 0 && row < rows)
        grid[col][row] = { char: charToDraw, color: color };
}

// --- Mouse / Touch ---
function handleStart(x, y) {
    if (mode === 'text') drawAtPosition(x, y);
    else { drawing = true; points = [[x, y]]; }
}

function handleMove(x, y) {
    if (mode === 'text') drawAtPosition(x, y);
    else if (drawing) points.push([x, y]);
}

function handleEnd() {
    if (mode === 'pattern' && drawing && points.length > 2)
        shapes.push({ pts: [...points], pattern: currentPattern, color: color });
    drawing = false;
    points = [];
}

function mousePressed()  { if (touches.length === 0) handleStart(mouseX, mouseY); }
function mouseDragged()  { if (touches.length === 0) handleMove(mouseX, mouseY); }
function mouseReleased() { if (touches.length === 0) handleEnd(); }

function touchStarted() { handleStart(mouseX, mouseY); return false; }
function touchMoved()   { handleMove(mouseX, mouseY);  return false; }
function touchEnded()   { handleEnd();                 return false; }

function keyPressed() {
    if (key.length === 1) charToDraw = key;
}

// --- Grid resize ---
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

function windowResized() {
    let oldGridSize = gridSize;
    gridSize = floor(windowWidth / cols);
    // rows stays fixed to preserve aspect ratio

    let scale = gridSize / oldGridSize;
    for (let shape of shapes) {
        shape.pts = shape.pts.map(([x, y]) => [x * scale, y * scale]);
    }

    resizeCanvas(cols * gridSize, rows * gridSize);
}

// --- Clear ---
function clearAll() {
    for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++) grid[i][j] = ' ';
    shapes = [];
}

// --- Exports ---
function exportAsPNG() {
    saveCanvas(cnv, 'dronk', 'png');
}

function exportAsHTML() {
    let dataURL = cnv.elt.toDataURL('image/png');
    let html = `<!DOCTYPE html><html><head><style>body{margin:0;background:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh}img{max-width:100%;}</style></head><body><img src="${dataURL}"/></body></html>`;
    let a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    a.download = 'dronk.html';
    a.click();
}

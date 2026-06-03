let points = [];
let drawing = false;
let shapes = [];
let currentPattern = 'polka';

function setPattern(name) {
    currentPattern = name;
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    drawing = true;
    points = [[mouseX, mouseY]];
}

function mouseDragged() {
    if (drawing) points.push([mouseX, mouseY]);
}

function mouseReleased() {
    if (drawing && points.length > 2) shapes.push({ pts: [...points], pattern: currentPattern });
    drawing = false;
    points = [];
    redraw();
}

function clipToShape(pts) {
    drawingContext.beginPath();
    drawingContext.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
        drawingContext.lineTo(pts[i][0], pts[i][1]);
    }
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

function patternPolkaDots() {
    drawingContext.fillStyle = 'white';
    drawingContext.fillRect(0, 0, width, height);
    drawingContext.fillStyle = 'steelblue';
    for (let x = 0; x < width; x += 24) {
        for (let y = 0; y < height; y += 24) {
            drawingContext.beginPath();
            drawingContext.arc(x + 12, y + 12, 6, 0, Math.PI * 2);
            drawingContext.fill();
        }
    }
}
function patternLinearGradient(b) {
    let grad = drawingContext.createLinearGradient(b.minX, b.minY, b.maxX, b.maxY);
    grad.addColorStop(0, 'hotpink');
    grad.addColorStop(1, 'royalblue');
    drawingContext.fillStyle = grad;
    drawingContext.fillRect(b.minX, b.minY, b.w, b.h);
}
function patternRadialGradient(b) {
    let cx = b.minX + b.w / 2, cy = b.minY + b.h / 2;
    let grad = drawingContext.createRadialGradient(cx, cy, 0, cx, cy, max(b.w, b.h) / 2);
    grad.addColorStop(0, 'yellow');
    grad.addColorStop(1, 'red');
    drawingContext.fillStyle = grad;
    drawingContext.fillRect(b.minX, b.minY, b.w, b.h);
}
function patternStripes(b) {  // omit b if you don't need bounds
    drawingContext.strokeStyle = 'coral';
    drawingContext.lineWidth = 3;
    for (let y = b.minY; y < b.maxY; y += 12) {
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

    if (shape.pattern === 'polka') patternPolkaDots();
    else if (shape.pattern === 'linear') patternLinearGradient(b);
    else if (shape.pattern === 'radial') patternRadialGradient(b);
    else if (shape.pattern === 'stripes') patternStripes(b);
    drawingContext.restore();
}

function draw() {
    for (let shape of shapes) drawPattern(shape);

    if (drawing && points.length > 1) {
        noFill();
        stroke(0);
        strokeWeight(1);
        beginShape();
        for (let [x, y] of points) vertex(x, y);
        endShape();
    }
}

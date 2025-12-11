
let perimeter = 2 * window.innerWidth + 2 * window.innerHeight;
let starData = []; 
let colors = [
"#FF0000", "#00FF00", "#0000FF"
];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    generateStarData();
}

// function grid() {
//   let divided = width / 100;
//   for (let x = 0; x <= width; x += divided) {
//     line(x, 0, x, height);
//   }
//       for (let y = 0; y <= height; y += divided) {
//         line(0, y, width, y);
//       }
// }

function generateStarData() {
  starData = [];
  let totalStars = 150;
  
  for (let i = 0; i < totalStars; i++) {
    starData.push({
      startAngle: random(TWO_PI),
      speed: random(0.03, 0.07),
      direction: (i % 2 === 0) ? 1 : -1,
      color: random(colors) // pick random color from array
    });
  }
}

function drawStar(x, y, radius, starIndex) {
  let star = starData[starIndex];
  
  push();
  translate(x, y);
  rotate(star.startAngle + frameCount * star.speed * star.direction);

  noStroke(); // no stroke
  fill(star.color);

  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = TWO_PI / 5 * i - HALF_PI;
    let outerX = cos(angle) * radius;
    let outerY = sin(angle) * radius;
    vertex(outerX, outerY);
    
    angle += TWO_PI / 10;
    let innerX = cos(angle) * radius * 0.4;
    let innerY = sin(angle) * radius * 0.4;
    vertex(innerX, innerY);
  }
  endShape(CLOSE);
  pop();
}

function draw() {
  clear();
  let totalStars = 150;
  let perimeter = 2 * width + 2 * height;

  let topStars = floor((width / perimeter) * totalStars);
  let rightStars = floor((height / perimeter) * totalStars);
  let bottomStars = floor((width / perimeter) * totalStars);
  let leftStars = floor((height / perimeter) * totalStars);
  let gap = 5;

  let starIndex = 0;

  // TOP SIDE
  let topSpacing = width / topStars;
  let starRadius = (topSpacing - gap) / 2;
  for (let i = 1; i < topStars; i++) {
    let x = (i + 0.5) * topSpacing;
    drawStar(x, starRadius, starRadius, starIndex);
    starIndex++;
  }
  
  // RIGHT SIDE
  let rightSpacing = height / rightStars;
  starRadius = (rightSpacing - gap) / 2;
  for (let i = 1; i < rightStars; i++) {
    let y = (i + 0.5) * rightSpacing;
    drawStar(width - starRadius, y, starRadius, starIndex);
    starIndex++;
  }

  // BOTTOM SIDE
  let bottomSpacing = width / bottomStars;
  starRadius = (bottomSpacing - gap) / 2;
  for (let i = 0; i < bottomStars - 1; i++) {
    let x = (i + 0.5) * bottomSpacing;
    drawStar(x, height - starRadius, starRadius, starIndex);
    starIndex++;
  }

  // LEFT SIDE
  let leftSpacing = height / leftStars;
  starRadius = (leftSpacing - gap) / 2;
  for (let i = 0; i < leftStars - 1; i++) {
    let y = (i + 0.5) * leftSpacing;
    drawStar(starRadius, y, starRadius, starIndex);
    starIndex++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateStarData(); // regenerate star data on resize
}
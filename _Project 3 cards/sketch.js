let cards = [];
let cardWidth = 80;
let cardHeight = 120;
let spacing = 10;
let suits = ['♥', '♦', '♣', '♠'];
let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let backGraphic; // shared back graphic for all cards
let margin = 2;

function setup() {
  let canvasWidth = 13 * (cardWidth + spacing);
  let canvasHeight = 4 * (cardHeight + spacing);
  createCanvas(canvasWidth, canvasHeight);
  backGraphic = backCardStyle();
  grid();
}

function grid() {
  cards = [];

  for (let row = 0; row < 4; row++) { // row and col are loop counters (0 - 4 etc)
    for (let col = 0; col < 13; col++) {
      let x = col * (cardWidth + spacing); // x coordinates of the card
      let y = row * (cardHeight + spacing); // y coordinates of the card
      cards.push({
        x: x,
        y: y,
        flipAngle: 0,
        isFlipping: false,
        showingBack: false,
        flipDirection: 1,
        frontGraphic: frontCardStyle(row, col)
      }
      );
    }
  }
}

function draw() {
  background(255, 255, 247)
  cards.forEach(card => {

    // This if statement is for sending information to the drawCard function
    if(card.isFlipping) {  
      card.flipAngle += 0.15 * card.flipDirection;   
        // >180 - back of card showing
        if(card.flipAngle >= PI) {
          card.flipAngle = PI 
          card.isFlipping = false; 
          card.showingBack = true;
          card.flipDirection = -1;
        }
        // <0 - front of card showing
        else if(card.flipAngle <= 0) { 
          card.flipAngle = 0;
          card.isFlipping = false;
          card.showingBack = false;
          card.flipDirection = 1;
        }
    } 

    drawCard(card);
  })    
}

function drawCard(card) {
  push();

  // this is the actual flipping animation
  translate(card.x + cardWidth/2, card.y + cardHeight/2);
  let scaleX = cos(card.flipAngle);
  scale(scaleX, 1);

  if (scaleX > 0) {
    image(card.frontGraphic, -cardWidth/2, -cardHeight/2);
  }
  else {
    image(backGraphic, -cardWidth/2, -cardHeight/2);
  }

  pop();
}

function mousePressed() {
  cards.map((card, index) => {
    if(mouseX > card.x && mouseX < card.x + cardWidth && mouseY > card.y && mouseY < card.y + cardHeight) {
      card.isFlipping = true;
    }
  })

}

function frontCardStyle(row, col) {
  // creates a pre-rendered graphic for the front of the card
  let suit = suits[row];
  let value = values[col];
  let fillColor = (suit === '♥' || suit === '♦') ? '#FF0000' : '#000000';
  
  let graphic = createGraphics(cardWidth, cardHeight);
  graphic.stroke(0); // black stroke
  graphic.strokeWeight(2); // stroke thickness
  graphic.fill(255);
  graphic.rect(margin, margin, cardWidth - (margin * 2), cardHeight - (margin * 2), 10);

  graphic.noStroke(); // turn off stroke for text
  graphic.fill(fillColor);
  graphic.textAlign(CENTER, CENTER);
  graphic.textSize(16);
  graphic.text(value, 20, 20);
  graphic.textSize(20);
  graphic.text(suit, cardWidth/2, cardHeight/2);
  graphic.textSize(16);
  graphic.text(value, cardWidth - 20, cardHeight - 20);

  return graphic;
}

function backCardStyle() {
  // creates a pre-rendered graphic for the back of the card (all cards share this)
  let graphic = createGraphics(cardWidth, cardHeight);
  graphic.stroke(0); // black stroke
  graphic.strokeWeight(2); // stroke thickness
  graphic.fill(200, 100, 100);
  graphic.rect(margin, margin, cardWidth - (margin * 2), cardHeight - (margin * 2), 10);

  return graphic;
}
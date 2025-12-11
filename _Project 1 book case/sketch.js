// w=1000
w=window.innerWidth
// h=w+(w/2)
h=window.innerHeight
margin = h/20
strokeW=4
bch = h-margin
bcw = w-margin
bookCounter = 0
let textY
let textX
let bookHeight
let bookWidth 
// 'merryquizzmas'

let cnv 
const lightColors = [
  "#FADADD", // Light Pink
  "#FFE4B5", // Moccasin
  "#FFFACD", // Lemon Chiffon
  "#E0FFFF", // Light Cyan
  "#D8BFD8", // Thistle
  "#B0E0E6", // Powder Blue
  "#FFB6C1", // Light Coral
  "#FFDEAD", // Navajo White
  "#E6E6FA", // Lavender
  "#F0E68C", // Khaki
  "#F5DEB3", // Wheat
  "#ADD8E6", // Light Blue
  "#98FB98", // Pale Green
  "#FAFAD2", // Light Goldenrod Yellow
  "#FFCCCB", // Light Red
  "#FFDAB9", // Peach Puff
  "#C1FFC1", // Honeydew
  "#E3A3F1", // Soft Lilac
  "#D4F1F9", // Baby Blue
  "#F9E79F"  // Pastel Yellow
];
const darkColors = [
  "#8B0000", // Dark Red
  "#4B0082", // Indigo
  "#2C3E50", // Midnight Blue
  "#1B2631", // Dark Slate
  "#3D2B1F", // Dark Brown
  "#6A0572", // Deep Purple
  "#0E4D92", // Dark Blue
  "#556B2F", // Olive Green
  "#800000", // Maroon
  "#483D8B", // Dark Slate Blue
  "#2F4F4F", // Dark Slate Gray
  "#191970", // Midnight Navy
  "#4A235A", // Deep Plum
  "#154360", // Deep Teal
  "#2C2C54", // Space Blue
  "#2A1A5E", // Dark Violet
  "#781F19", // Rustic Red
  "#5D4037", // Mocha Brown
  "#2D3436", // Charcoal
  "#4E342E"  // Espresso
];
titlesArr = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Pride and Prejudice",
  "Moby-Dick",
  "The Catcher in the Rye",
  "Brave New World",
  "The Lord of the Rings",
  "Crime and Punishment",
  "The Hobbit"
];

fontsArr = []

function preload() {
  fontsArr.push() // push fonts
}

function setup() {
  bw = random(3,20)
  cnv = createCanvas(windowWidth, windowHeight);
  background("#fffef5");
  strokeWeight(strokeW);
  stroke("#4a0d0d")
  noFill()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  margin = h/20;
  bch = h-margin;
  bcw = w-margin;
  redraw();
}

function drawGradient(x, y, a, b) {
    for (let i = 0; i < rowHeight; i++) {
      let inter = map(i, 0, rowHeight, 0, 1); 
      let c = lerpColor(a, b, inter);  
      stroke(c); 
      line(x, y + i, bcw, y + i); 
    }
}

function draw() {
  clear()
  if(w > h){
    rows = Math.floor(random(3, 7))
  } else {
    rows = Math.floor(random(10, 20))
  }
  rowHeight = bch / rows
  line(w-bcw, h-bch, w-bcw, h)
  line(bcw, h-bch, bcw, h)
  let totalX = []

  for(let y = margin; y <= h; y += rowHeight){
    // DESCRIPTION:
    // this adds the shelves.
    // It starts at y, which is the left-most point of the shelf.
    // it adds a new line at the rowHeight, and stops when it gets to the overall height
    line(margin, y, bcw, y);
    bookAlternate = true
    lastXPoint = bcw - Math.max(1, random(strokeW, margin))
    // drawGradient(margin,y,color(128, 96, 66),color(74, 13, 13))
    // lastBook = false
    bookWidthArr = []
    let spaceBetween

    if (y !== margin) { //  this is the top shelf, this is to not add books on the top shelf
      let x = margin + Math.max(1, random(strokeW, margin)); // first book of each shelf starts anywhere from the left between strokeW and margin

      while(x < lastXPoint) {
        let bookWidth = random(10, 30); // Generate new width for each book

        if (x + bookWidth > lastXPoint) break; // Check if book fits

        // totalX.push(x)

        if(bookAlternate){
          bookWidthArr.push(x)
        } else {
          bookWidthArr.push(x)
          console.log('', bookWidthArr[1] - bookWidthArr[0])

          bookWidthArr = []
        }

      //   // let bookWidth =
        addDetails(x, y, bookWidth)

        // Move x forward by book width plus spacing
        let spacing = random(2, 8); // Add random spacing between books
        x += bookWidth + spacing;

      // // for(let 
      // //   x = margin + Math.max(1, random(strokeW, margin)); // first book of each shelf starts anywhere from the left between strokeW and margin
      // //   x <= lastXPoint; // last x of each shelf ends at the right side of the shelf
      // //   x += Math.max(1, random(spaceBetween, rowHeight / 4))) // spacing of books. and spacing between books
      // // {
      // //   if(bookAlternate){
      // //     bookWidthArr.push(x)
      // //     spaceBetween = rowHeight / 5
      // //     // spaceBetween = textX
      // //   } else {
      // //     bookWidthArr.push(x)
      // //     bookWidthArr = bookWidthArr[1] - bookWidthArr[0]
      // //     spaceBetween = strokeW*2
      // //     addDetails(x, y, bookWidthArr)
      // //     bookWidthArr = []
      // //     // line(x + strokeW, y - strokeW, x + strokeW, y + bookHeight) // right book line        
      // //   }
      // //   // rect(x + (strokeW / 2), y - (strokeW / 2), -bookWidth, bookHeight) 

      // //   // resetting
      //   strokeWeight(strokeW)
      //   stroke('#4a0d0d')
       
      //   bookAlternate = !bookAlternate 
        // line(x + strokeW, y - (rowHeight-10), x - bookWidth, y - (rowHeight-10)) 
      }
    }
}
  noLoop()
}

//  if(adder.length % 2 !== 0){
//         adder.pop()
//       } 
//       adder.forEach((bookend) => {
//         total.push(bookend)
//       })
//       if(total.length / 2 <= titlesArr.length){
//         break;
//       }



function addDetails(x, y, w){
    push();
    textSize(w / 2)
    bookTitle = random(titlesArr)
    bookTitleSplit = bookTitle.split(" ")
    let firstHalf
    let secondHalf
    // ellipse(x, y , 20, 20); // Debugging dot (optional)
    bookWidth = w

    if(bookTitleSplit.length > 2){ 
        // splits long book titles
        let nextSpaceIndex = bookTitle.indexOf(' ', Math.ceil(bookTitle.length / 2)); 
        if(nextSpaceIndex === -1){
          nextSpaceIndex = bookTitle.lastIndexOf(' ', Math.ceil(bookTitle.length / 2)); 
        }
        firstHalf = bookTitle.slice(0, nextSpaceIndex)
        secondHalf = bookTitle.slice(nextSpaceIndex); 
        bookTitleSplit = [firstHalf, secondHalf];
       
        if(textWidth(firstHalf) > textWidth(secondHalf)){
            bookHeight = random(-textWidth(firstHalf), -rowHeight + (strokeW * 2))
        } else {
            bookHeight =random(-textWidth(secondHalf), -rowHeight + (strokeW * 2))
        }
    } else {
        bookHeight = random(-textWidth(bookTitle), -rowHeight + (strokeW * 2))
        bookTitleSplit = [bookTitle]
    }

    let fits = true
    let i = 3
    // fill("red")

    if(-bookHeight > rowHeight - 20){
        fits = false


        while (!fits) {
            // fill("green")
            if(bookTitleSplit.length === 1){
                bookHeight = random(-textWidth(bookTitle), -rowHeight + strokeW)
            }
            if(textWidth(firstHalf) > textWidth(secondHalf)){
                bookHeight = random(-textWidth(firstHalf), -rowHeight + strokeW)
            } else {
                bookHeight =random(-textWidth(secondHalf), -rowHeight + strokeW)
            } 

            if(-bookHeight <  rowHeight) {
            fits = true; 
            }
            textSize(w / i++); 
    
            if (i > 20) break; 
         }
    } 

    drawBookGradient(x, y - strokeW, random(darkColors), random(lightColors))
    fill(random(darkColors))
    noStroke()
    if(bookTitleSplit.length > 1){ 
        translate(x - (bookWidth / 2), y + (bookHeight / 2));  // x-axis center text, y-axis center text from top
        rotate(-HALF_PI);
        textAlign(CENTER, RIGHT);
        // text(bookTitleSplit[0], 0, 0);
        textAlign(CENTER, TOP );
        // text(bookTitleSplit[1], 0, 0);
      } else {
        translate(x - (bookWidth / 2), y + (bookHeight / 2));  // x-axis center text, y-axis center text from top
        rotate(-HALF_PI);
        textAlign(CENTER, CENTER);
        // text(bookTitle, 0, 0);
      } 


    pop();
}

function drawBookGradient(x, y, a, b) {
    for (let i = 0; i < bookWidth; i++) {
        let inter = map(i, 0, bookWidth, 0, 2); 
        // let inter = map(i, 0, bookWidth, 0, 1 ); 
        if (inter > 1) inter = 2 - inter; 
        let c = lerpColor(a, b, inter); 
        stroke(c); 
        line(x + i, y, x + i, max(y + bookHeight, y - rowHeight + strokeW * 2));
    }
  }


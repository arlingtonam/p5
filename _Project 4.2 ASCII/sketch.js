
// const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
const density =  '▓█';
let cells;
let cellWidth;
let cellHeight;
let img;

function preload() {
    img = loadImage("flower.png");
    cells = 50; // number of characters across and down the output grid
}

function setup() {
    noCanvas();
    renderASCII();
}

function renderASCII() {
    removeElements();
    cellWidth = img.width / cells;   // how many pixels wide each cell is
    cellHeight = img.height / cells; // how many pixels tall each cell is
    img.loadPixels();

    for (let j = 0; j < cells; j++) {      // j = which row of the output grid
        let row = "";
        for (let i = 0; i < cells; i++) {  // i = which column of the output grid
            let totalR = 0, totalG = 0, totalB = 0;

            for (let dy = 0; dy < cellHeight; dy++) {       // step down through pixels inside this cell
                for (let dx = 0; dx < cellWidth; dx++) {    // step across through pixels inside this cell

                    const px = floor(i * cellWidth) + dx;   // actual x pixel in relation to the whole image, rather than its cell position, 
                    const py = floor(j * cellHeight) + dy;  // actual y pixel in relation to the whole image, rather than its cell position

                    const pixelIndex = (px + py * img.width) * 4; // get to the correct pixel in the pixel colour array
                    totalR += img.pixels[pixelIndex];
                    totalG += img.pixels[pixelIndex + 1];
                    totalB += img.pixels[pixelIndex + 2];
                }
            }

            const count = cellWidth * cellHeight;               // total pixels averaged per cell
            const avgR = totalR / count;
            const avgG = totalG / count;
            const avgB = totalB / count;
            const avg = (avgR + avgG + avgB) / 3; // average brightness 0–255

            const len = density.length;
            const charIndex = floor(map(avg, 0, 255, 0, len)); // map brightness to a character index
            const c = density.charAt(charIndex);
            const char = (avgR > 250 && avgG > 250 && avgB > 250) ? "&nbsp;&nbsp;" : c; // if using ▓█ then needs 2 &nbsp;
            console.log('', char, c, avgR, avgG, avgB);
            row += `<span style="color: rgb(${avgR},${avgG},${avgB} )">${char}</span>`;
        }
        createDiv(row); // add the completed row of characters to the page
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

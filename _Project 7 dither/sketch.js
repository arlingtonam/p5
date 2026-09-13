let c     = null; //number of grey levels
let d     = null; //dimension of threshold map
let M     = null; //threshold map
let img   = null; //image reference
let img_D = null; //final dithered image
let img_Y = null; //bitmap array of relative luminance values of img
let spaceSlide = "space_slide.jpg";
let pixelSize = 200;

function preload() {
    //initilize constants
    c = 2;
    d = 8;
    //define threshold map
    M = [[0,32,8,40,2,34,10,42],
        [48,16,56,24,50,18,58,26],
        [12,44,4,36,14,46,6,38], // 14 = 0.21875
        [60,28,52,20,62,30,54,22],
        [3,35,11,43,1,33,9,41],
        [51,19,59,27,49,17,57,25],
        [15,47,7,39,13,45,5,37],
        [63,31,55,23,61,29,53,21]];
        
    for(let i = 0; i < d; i++){
        for(let j = 0; j < d; j++){
            M[i][j] = M[i][j] / (d*d);   // dividing each element in the array by 64 (d*d) to normalize the values to the range [0, 1]
        }
    }
    // img = loadImage("flower.png");
    img = loadImage(spaceSlide);
}

function setup() {
  //no loop canvas
  noLoop();
  pixelDensity(1);
  createCanvas( img.width, img.height );
}

function draw(){
  img_D = createImage( img.width, img.height );
  img_D.loadPixels();
  img.loadPixels();

  for(let i = 0; i < img.height; i++){
    for(let j = 0; j < img.width; j++){

      let idx = 4 * (i * img.width + j);
      let T = M[j%d][i%d]; // looking for one of the 64 values in the threshold array (M)

      let r = img.pixels[idx];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];
      let Y = 0.299*r + 0.587*g + 0.114*b;
      
      // dither from luminance with c=2 (black or white only)
      let val = 255 * Math.floor(T + Y * (c - 1) / 255) / (c - 1);
      
      img_D.pixels[idx    ] = val;
      img_D.pixels[idx + 1] = val;
      img_D.pixels[idx + 2] = val;
      img_D.pixels[idx + 3] = 255;
      }  
  }
  img_D.updatePixels();
  image(img_D,0,0);
}

// https://claude.ai/chat/67e6866c-80a1-49be-aa52-d0c25df9936a my chat
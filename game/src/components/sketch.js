function makeArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr; 
}

let grid; 
let cols;
let rows;
let resolution = 40;

function setup() {
    //make canvas a square
    createCanvas(400,400);
    cols = width / resolution;
    rows = height / resolution;
    grid = makeArray(cols, rows);
    //nested loop - iterate each empty col and row enter 0 or 1
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random(2));
        }
    }
}

function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution; 
            let y = j * resolution; 
            if (grid[i][j] == 1) {
                fill(255);
            }

            ClientRect(x,y,resolution, resolution);
        }
    }
}
// inspiration from coding challenge #94

let size = 8;  // this is the grid size, can be altered
let box_width = 100 * (4 / size);

let SW = size * box_width; // defining screen dimensions
let SH = size * box_width;

let grid; // defining the grid outside as a global variable

let keyArr = [37, 38, 39, 40] // these are the p5 keycodes for the arrow keys

let win = false;

function setup() {
  createCanvas(SW, SH);
  grid = new Array(size); // creating a 2d array using the defined grid size
  for (i = 0; i < size; i++) {
    grid[i] = new Array(size);
  }
  for (y = 0; y < size; y++) { // since creating the array will return null values, we fill with 0's
    for (x = 0; x < size; x++) {
      if (grid[y][x] == null) {
        grid[y][x] = 0;
      }
    }
  }
  generate_number();
  generate_number();
}

function draw() {
  if (!win) {
    textSize(64 * (4 / size));
    for (y = 0; y < size; y++) {
      for (x = 0; x < size; x++) {
        strokeWeight(2);
        stroke(0);
        rect(y * box_width, x * box_width, box_width, box_width);
        textAlign(CENTER, CENTER);
        if (grid[x][y] != 0) { // loops through the 2d grid array and display all numbers that aren't 0
          text(grid[x][y], y * box_width + box_width / 2, x * box_width + box_width / 2);
        }
      }
    }
  } else {
    textSize(100);
    textAlign(CENTER, CENTER);
    text("You Win!", SW / 2, SH / 2)
    noLoop() // if the user has won the game, the loop ends and a win message appears
  }
}

function generate_number() {
  let options = [];
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (grid[i][j] == 0) {
        options.push({ // if the space is empty (0), it is added to the array of spots that will be considered
          x: i,
          y: j
        });
      }
    }
  }
  if (options.length > 0) {
    let spot = random(options); // randomly selects a spot that is in the options array
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.35 ? 2 : 4; // ternary oprator, 35% of the number being 4 and 75 % being 2
  }
}

function keyPressed() {
  if (keyIsPressed === true) {
    if (keyArr.includes(keyCode)) { // checks the entered key against the arrow key array
      if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
        grid = grid[0].map((col, i) => grid.map(row => row[i])); // transposes array if the up or down arrow was pressed
      } // transposing: https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
      for (y = 0; y < size; y++) {
        for (x = 0; x < size; x++) {
          if (grid[y][x] == 0) {
            grid[y].splice(x, 1); // removes all empty values from the rows
            x--;
          }
        }
        if (keyCode == LEFT_ARROW || keyCode == DOWN_ARROW) {
          for (x = 0; x < grid[y].length - 1; x++) {
            if (grid[y][x] == grid[y][x + 1]) { // adds together pairs starting from beginning
              grid[y][x] *= 2;
              if (grid[y][x] == 2048) { // if the user creates 2048, the win variable becomes true and game ultimately ends
                win = true;
              }
              grid[y].splice(x + 1, 1);
            }
          }
        } else if (keyCode == RIGHT_ARROW || keyCode == UP_ARROW) {
          for (x = grid[y].length - 1; x > 0; x--) {
            if (grid[y][x] == grid[y][x - 1]) { // adds together pairs starting from the end
              grid[y][x] *= 2;
              if (grid[y][x] == 2048) {
                win = true;
              }
              grid[y].splice(x - 1, 1);
            }
          }
        }
        for (x = grid[y].length; x < size; x++) { // fills the rest of the spaces in each row with 0
          if (keyCode == LEFT_ARROW || keyCode == UP_ARROW) { // depending on which key, either it will fill from front or back
            grid[y].push(0);
          } else if (keyCode == RIGHT_ARROW || keyCode == DOWN_ARROW) {
            grid[y].unshift(0);
          }
        }
      }
      if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
        grid = grid[0].map((col, i) => grid.map(row => row[i])); // for the up and down arrows, it is transposed to undo the first one
      }
      generate_number();
    }
  }
}

/*
potential changes/improvements include (in order of ease):
dont generate a number if there were no changes
adding colours to each number within the grid
adding a lose condition
*/

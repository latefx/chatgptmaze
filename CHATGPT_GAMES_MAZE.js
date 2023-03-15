working maze code from chatgpt : 

html : 

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Maze Runner Game</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
  <script src="sketch.js"></script>
</head>
<body>
</body>
</html>


javascript: without scale and touch function

// sketch.js - Version 1.5.0
let maze, player, tileSize = 40, mazeColumns, mazeRows, gameState = "playing", countdownStart, countdownDuration = 5, gameTimeStart, gameTimeLimit = 90;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mazeColumns = 20 * Math.floor(width / tileSize);
  mazeRows = 20 * Math.floor(height / tileSize);
  maze = new Maze(mazeColumns, mazeRows, tileSize);
  player = new Player();
  gameTimeStart = millis();
}

function draw() {
  background(255);
  if (gameState === "playing") {
    updateGameTime();
    if (gameTimeLimit - getElapsedSeconds(gameTimeStart) <= 0) {
      gameState = "gameOver";
      countdownStart = millis();
    } else {
      maze.update();
      maze.display();
      player.display(width / 2, height / 2);
      displayDistanceToGoal();
      displayGameTime();
      if (player.collidesWithGoal(maze.goal)) {
        gameState = "won";
        countdownStart = millis();
      }
    }
  } else if (gameState === "won") {
    displayVictoryMessage();
    if (millis() - countdownStart >= countdownDuration * 1000) {
      gameState = "playing";
      maze.generateLayout();
      maze.generateGoal();
      gameTimeStart = millis();
    }
  } else if (gameState === "gameOver") {
    maze.collapse();
    maze.display();
    displayGameOverMessage();
    if (millis() - countdownStart >= countdownDuration * 1000) {
      gameState = "playing";
      maze.generateLayout();
      maze.generateGoal();
      gameTimeStart = millis();
    }
  }
}

function displayVictoryMessage() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(0);
  text("You won!", width / 2, height / 2);
}

function displayGameOverMessage() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(0);
  text("Game over :{", width / 2, height / 2);
  textSize(24);
  text("Restarting in " + (5 - Math.floor((millis() - countdownStart) / 1000)) + " seconds", width / 2, height / 2 + 50);
}

function displayDistanceToGoal() {
  let playerGridPos = player.getGridPosition(maze.offsetX, maze.offsetY);
  let goalGridPos = createVector(maze.goal.x / tileSize, maze.goal.y / tileSize);
  let distance = playerGridPos.dist(goalGridPos);
  let maxDistance = sqrt(sq(mazeColumns) + sq(mazeRows));
  let progress = map(distance, 0, maxDistance, 100, 0);
  let colorProgress = map(progress, 0, 100, 0, 255);

  textAlign(CENTER, TOP);
  textSize(24);
  fill(0, 0, 255 - colorProgress, colorProgress);
  text("Distance to Goal: " + progress.toFixed(2), width / 1.2 - 60, 10);
}

function displayGameTime() {
  textAlign(CENTER, TOP);
  textSize(24);
  fill(0);
  text("Time: " + (gameTimeLimit - getElapsedSeconds(gameTimeStart)), width / 2 + 60, 10);
}


function updateGameTime() {
  if (gameTimeLimit - getElapsedSeconds(gameTimeStart) < 0) {
    gameTimeStart = millis();
  }
}

function getElapsedSeconds(startTime) {
  return Math.floor((millis() - startTime) / 1000);
}

class Maze {
  constructor(columns, rows, tileSize) {
    this.columns = columns;
    this.rows = rows;
    this.tileSize = tileSize;
    this.offsetX = 0;
    this.offsetY = 0;
    this.generateLayout();
    this.generateGoal();
  }

  update() {
    let prevOffsetX = this.offsetX;
    let prevOffsetY = this.offsetY;
    this.offsetX += (mouseX - width / 2) * 0.05;
    this.offsetY += (mouseY - height / 2) * 0.05;
    if (player.collidesWithWall(this.layout, this.columns, this.rows)) {
      this.offsetX = prevOffsetX;
      this.offsetY = prevOffsetY;
    }
  }

  generateLayout() {
    this.layout = [];
    for (let y = 0; y < this.rows; y++) {
      let row = [];
      for (let x = 0; x < this.columns; x++) {
        if (x === 0 || x === this.columns - 1 || y === 0 || y === this.rows - 1) {
          row.push(1);
        } else {
          row.push(Math.random() < 0.2 ? 1 : 0);
        }
      }
      this.layout.push(row);
    }

// sketch.js - Version 1.5.0
let maze;
let player;
let tileSize;
let mazeColumns;
let mazeRows;
let gameTimeStart;
let gameTimeLimit = 90;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tileSize = min(windowWidth, windowHeight) * 0.05;
  mazeColumns = 20 * Math.floor(width / tileSize);
  mazeRows = 20 * Math.floor(height / tileSize);
  maze = new Maze(mazeColumns, mazeRows, tileSize);
  player = new Player();
  gameTimeStart = millis();
}

function draw() {
  background(255);
  maze.update();
  maze.display();
  player.display(width / 2, height / 2);
  displayDistanceToGoal();
  displayGameTime();

  if (player.collidesWithGoal(maze.goal)) {
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(0);
    text("You won!", width / 2, height / 2);
    noLoop();
    setTimeout(() => {
      maze = new Maze(mazeColumns, mazeRows, tileSize);
      loop();
    }, 5000);
  }

}

function touchMoved(event) {
  event.preventDefault();
  mouseX = event.touches[0].clientX;
  mouseY = event.touches[0].clientY;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tileSize = min(windowWidth, windowHeight) * 0.05;
  mazeColumns = 20 * Math.floor(width / tileSize);
  mazeRows = 20 * Math.floor(height / tileSize);
  maze = new Maze(mazeColumns, mazeRows, tileSize);
  player = new Player();
  gameTimeStart = millis();
}
function displayVictoryMessage() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(0);
  text("You won!", width / 2, height / 2);
}

function displayGameOverMessage() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(0);
  text("Game over :{", width / 2, height / 2);
  textSize(24);
  text("Restarting in " + (5 - Math.floor((millis() - countdownStart) / 1000)) + " seconds", width / 2, height / 2 + 50);
}

function displayDistanceToGoal() {
  let playerGridPos = player.getGridPosition(maze.offsetX, maze.offsetY);
  let goalGridPos = createVector(maze.goal.x / tileSize, maze.goal.y / tileSize);
  let distance = playerGridPos.dist(goalGridPos);
  let maxDistance = sqrt(sq(mazeColumns) + sq(mazeRows));
  let progress = map(distance, 0, maxDistance, 100, 0);
  let colorProgress = map(progress, 0, 100, 0, 255);

  textAlign(CENTER, TOP);
  textSize(24);
  fill(0, 0, 255 - colorProgress, colorProgress);
  text("Distance to Goal: " + progress.toFixed(2), width / 1.2 - 60, 10);
}

function displayGameTime() {
  textAlign(CENTER, TOP);
  textSize(24);
  fill(0);
  text("Time: " + (gameTimeLimit - getElapsedSeconds(gameTimeStart)), width / 2 + 60, 10);
}


function updateGameTime() {
  if (gameTimeLimit - getElapsedSeconds(gameTimeStart) < 0) {
    gameTimeStart = millis();
  }
}

function getElapsedSeconds(startTime) {
  return Math.floor((millis() - startTime) / 1000);
}

class Maze {
  constructor(columns, rows, tileSize) {
    this.columns = columns;
    this.rows = rows;
    this.tileSize = tileSize;
    this.offsetX = 0;
    this.offsetY = 0;
    this.generateLayout();
    this.generateGoal();
  }

  update() {
    let prevOffsetX = this.offsetX;
    let prevOffsetY = this.offsetY;
    this.offsetX += (mouseX - width / 2) * 0.05;
    this.offsetY += (mouseY - height / 2) * 0.05;
    if (player.collidesWithWall(this.layout, this.columns, this.rows)) {
      this.offsetX = prevOffsetX;
      this.offsetY = prevOffsetY;
    }
  }

  generateLayout() {
    this.layout = [];
    for (let y = 0; y < this.rows; y++) {
      let row = [];
      for (let x = 0; x < this.columns; x++) {
        if (x === 0 || x === this.columns - 1 || y === 0 || y === this.rows - 1) {
          row.push(1);
        } else {
          row.push(Math.random() < 0.2 ? 1 : 0);
        }
      }
      this.layout.push(row);
    }
  }

  generateGoal() {
    let goalX, goalY;
    do {
      goalX = Math.floor(Math.random() * this.columns);
      goalY = Math.floor(Math.random() * this.rows);
    } while (this.layout[goalY][goalX] === 1);
    this.goal = createVector(goalX * this.tileSize, goalY * this.tileSize);
  }

  collapse() {
    let collapseSpeed = 5;
    for (let y = 1; y < this.rows - 1; y++) {
      for (let x = 1; x < this.columns - 1; x++) {
        if (this.layout[y][x] === 0) {
          if (y < this.rows / 2) {
            this.layout[y][x] = (this.layout[y - 1][x] === 1 && y % collapseSpeed === 0) ? 1 : 0;
          } else {
            this.layout[y][x] = (this.layout[y + 1][x] === 1 && y % collapseSpeed === 0) ? 1 : 0;
          }
        }
      }
    }
  }

  display() {
    push();
    translate(-this.offsetX, -this.offsetY);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        if (this.layout[y][x] === 1) {
          fill(0);
          rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
    // Display the goal as a green square
    fill(0, 255, 0);
    rect(this.goal.x, this.goal.y, this.tileSize, this.tileSize);
    pop();
  }
}

class Player {
  constructor() {
    this.size = 30;
    this.color = color(255, 0, 0);
  }

  display(x, y) {
    fill(this.color);
    ellipse(x, y, this.size, this.size);
  }

  collidesWithWall(mazeLayout, columns, rows) {
    let playerGridPos = this.getGridPosition(maze.offsetX, maze.offsetY);
    if (playerGridPos.x < 0 || playerGridPos.x >= columns || playerGridPos.y < 0 || playerGridPos.y >= rows) {
      return true;
    }
    return mazeLayout[playerGridPos.y][playerGridPos.x] === 1;
  }

  collidesWithGoal(goal) {
    let playerGridPos = this.getGridPosition(maze.offsetX, maze.offsetY);
    let goalGridPos = createVector(goal.x / tileSize, goal.y / tileSize);
    return playerGridPos.equals(goalGridPos);
  }

  getGridPosition(offsetX, offsetY) {
    let gridX = Math.floor((width / 2 + offsetX) / tileSize);
    let gridY = Math.floor((height / 2 + offsetY) / tileSize);
    return createVector(gridX, gridY);
  }
}


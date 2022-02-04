let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");

let current;
let goal;
let mazeComplete = false;

class Maze {
  constructor(rows, columns) {
    this.size = 500;
    this.rows = rows;
    this.columns = columns;
    this.grid = [];
    this.stack=[];
  }

  //set the grid: this will create new grid based on the number of rows and columns
  setup() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        // Create a new instance of the Cell class for each element in the 2D array and push to the maze grid array
        let cell = new Cell(r, c, this.grid, this.size);
        row.push(cell);
      }
      this.grid.push(row);
    }
    current = this.grid[0][0];
    this.grid[this.rows - 1][this.columns - 1].goal = true;
  }

  //draw the canvas by setting the size and placing the cells in the grid array
  draw() {
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = "white";

    //set the first cell as visited
    current.visited = true;
    console.log(current);


    // Loop through the 2d grid array and call the show method for each cell instance
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c].show(this.size, this.rows, this.columns);
       }
    }

    // This function will assign the variable 'next' to random cell out of the current cells available neighbouring cells
    let next = current.checkNeighbours()

    //non visited neighbour cell
    if (next) {
        next.visited = true;
        this.stack.push(current); //adding the current cell in stack for backtracking
        current.removeWalls(current, next); // This function compares the current cell to the next cell and removes the relevant walls for each cell
        current = next;
    } else if (this.stack.length > 0) {
        // if there are no neighbours to go through we have to backtrack from the stack
        let cell = this.stack.pop();
        current = cell;
    }

    if (this.stack.length === 0) {
        mazeComplete = true;
        return;
    }

    window.requestAnimationFrame(() => {
        this.draw();
      });

  }

}

class Cell {
  constructor(rowNum, colNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true
    }
    this.goal = false;
  }

  checkNeighbours() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];
      
    // The following lines push all available neighbours to the neighbours array
    // undefined is returned where the index is out of bounds (edge cases)
    let top = row !== 0 ? grid[row - 1][col]: undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1]: undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1 ][col]: undefined;
    let left = col !== 0 ? grid[row][col - 1]: undefined;

    // if the following are not 'undefined' then push them to the neighbours array
    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    if (neighbours.length !== 0) {
        let rand = Math.floor(Math.random() * neighbours.length)
        return neighbours[rand];
    } else {
        return undefined;
    }


  }

  // Wall drawing functions for each cell. 
  drawTopWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }

  drawRightWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawBottomWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawLeftWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }

  //This function will compare the current cell to the next cell to identify which walls are to be removed.
  removeWalls (cell1, cell2) {
    let x = cell1.colNum - cell2.colNum; // compares two cells in x-axis
    if (x === 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;      
    } else if (x === -1) {
        cell1.walls.rightWall = false;
        cell2.walls.leftWall = false;
    }

    let y = cell1.rowNum - cell2.rowNum; // compares two cells in y-axis
    if (y === 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y === -1) {
        cell1.walls.bottomWall = false;
        cell2.walls.topWall = false;
    }

  }

  // Draws each of the cells on the maze canvas
  show (size, rows, columns) {
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;

    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#ffffff";
    ctx.lineWidth = 2;

    if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
    if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
    if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
    if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
    if (this.visited) {
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
    if (this.goal) { //change this to the treasure chest 
        ctx.fillStyle = "rgb(83, 247, 43)"; 
        ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }

  }

}

newMaze = new Maze(10,10);
newMaze.setup();
newMaze.draw();
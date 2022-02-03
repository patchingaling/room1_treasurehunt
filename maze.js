let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");

class Maze {
    constructor(size, rows, columns) {
        this.size = size;
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
    }
}

class Cell {
    constructor(rows, columns, parentGrid, parentSize) {
        this.rows = rows;
        this.columns = columns;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited = false;
        this.walls = {
            topWall: true,
            rightWall: true,
            bottomWall: true,
            leftWall: true
        }
    }
}
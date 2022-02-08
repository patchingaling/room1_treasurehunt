let values = ['Easy', 'Medium', 'Hard', 'Extreme'];
let current;
let newMaze;
let levelValue; //this is the number of rows and columns
let mazeCompleted = false;
let stepCtr = 0;
let goalReach = false;

const btnMaze = document.getElementById('btn-maze')
const finishedMaze = document.querySelector(".finished-maze");
const secChild = document.querySelector(".sec-child")
const play = document.querySelector(".play-again");
const close = document.querySelector(".close-game");

//create select element
let select = document.createElement('select');
select.name = 'level';
select.id = 'level';

//create option element
for (const val of values) {
    let option = document.createElement("option");
    if (val === 'Easy') {
        option.value = '10';
    } else if (val === 'Medium') {
        option.value = '15';
    } else if (val === 'Hard') {
        option.value = '20';
    } else if (val === 'Extreme') {
        option.value = '25';
    }
    option.id = val;
    option.text = val;
    select.appendChild(option);
}

//create label element
let label = document.createElement('label');
label.innerHTML = 'Select a level: ';
label.htmlFor = 'level';

document.getElementById('selection').appendChild(label).appendChild(select);

//functions

function generateMaze (ev) {
    ev.preventDefault();

    const level = document.getElementById('level');
    levelValue = level.options[level.selectedIndex].value;

    //create the maze
    newMaze = new Maze(400,levelValue, levelValue);
    newMaze.setup();
    newMaze.draw();
    
    //disable the generate button when maze is generated
    btnMaze.disabled = true;

}

function moveSprite(ev) {
    if (!mazeCompleted || goalReach) return;
    let key = ev.key;
    let row = current.rowNum;
    let col = current.colNum;
    
    switch (key) {
        case "ArrowUp":
            if (!current.walls.topWall) {
                stepCtr += 1;
                let next = newMaze.grid[row - 1][col];
                current = next;
                newMaze.draw();
                current.sprite(newMaze.columns)
                // not required if goal is in bottom right
                if (current.goal) {
                    createYouWonDisp (stepCtr);
                    

                }
            }
            break;
        case "ArrowRight":
            if (!current.walls.rightWall) {
                stepCtr += 1;
                let next = newMaze.grid[row][col + 1];
                current = next;
                newMaze.draw();
                current.sprite(newMaze.columns)
                // not required if goal is in bottom right
                if (current.goal) {
                    createYouWonDisp (stepCtr);
                }
            }
            break;
        case "ArrowDown":
            if (!current.walls.bottomWall) {
                stepCtr += 1;
                let next = newMaze.grid[row + 1][col];
                current = next;
                newMaze.draw();
                current.sprite(newMaze.columns)
                // not required if goal is in bottom right
                if (current.goal) {
                    createYouWonDisp (stepCtr);
                }
            }
            break;
        case "ArrowLeft":
            if (!current.walls.leftWall) {
                stepCtr += 1;
                let next = newMaze.grid[row][col - 1];
                current = next;
                newMaze.draw();
                current.sprite(newMaze.columns)
                // not required if goal is in bottom right
                if (current.goal) {
                    createYouWonDisp (stepCtr); 
                }
            }
            break;
            

    }
}

function createYouWonDisp (step) {
    goalReach = true;
    const stepWord = `You took ${step} steps.`;
    secChild.innerText = stepWord;
    finishedMaze.style.display = "block";
}


//Event Listener to add the maze
btnMaze.addEventListener("click",generateMaze);

//Event Listener for arrow  keys
document.addEventListener("keydown", moveSprite);

//Event Listener to play again
play.addEventListener("click", () => {
    location.reload();
});

//Event Listener to stop the game
close.addEventListener("click", () => {
    finishedMaze.style.display = "none";

})

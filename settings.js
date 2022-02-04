let values = ['Easy', 'Medium', 'Hard', 'Extreme'];

let select = document.createElement('select');
select.name = 'level';
select.id = 'level';

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

let label = document.createElement('label');
label.innerHTML = 'Select a level: ';
label.htmlFor = 'level';

document.getElementById('selection').appendChild(label).appendChild(select);

const btnMaze = document.getElementById('btn-maze')
let levelValue; //this is the number of rows and columns
btnMaze.onclick = () => {
    const level = document.getElementById('level');
    levelValue = level.options[level.selectedIndex].value;

    //create the maze
    let newMaze = new Maze(levelValue, levelValue);
    newMaze.setup();
    newMaze.draw();
}




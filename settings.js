let values = ['Easy', 'Medium', 'Hard', 'Extreme'];

let select = document.createElement('select');
select.name = 'level';
select.id = 'level';

for (const val of values) {
    let option = document.createElement("option");
    option.value = val;
    option.id = val;
    option.text = val;
    select.appendChild(option);
}

let label = document.createElement('label');
label.innerHTML = 'Select a level: ';
label.htmlFor = 'level';

document.getElementById('selection').appendChild(label).appendChild(select);

const btnMaze = document.getElementById('btn-maze')
let num; //this is the number of rows and columns
btnMaze.onclick = () => {
    let level = document.getElementById('level');
    let levelValue = level.options[level.selectedIndex].value;
    if (levelValue === 'Easy') {
        num = 10;
    } else if (levelValue === 'Medium') {
        num = 15;
    } else if (levelValue === 'Hard') {
        num = 20;
    } else if (levelValue === 'Extreme') {
        num = 25;
    }
    console.log(num);
}



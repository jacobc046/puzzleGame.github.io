let numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const numbersSorted = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
let moves = 0;
let seconds = 0;

function arraysAreEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function startTimer() {
    setInterval(() => {
        const time = document.getElementById("time");
        seconds++;
        time.innerText = `Time in current game: ${seconds} seconds`;
    }, 1000);
}

function initialize() {
    const table = document.getElementById("table");
    table.innerHTML = "";
    moves = 0;

    numbers.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 4; i++) {
        table.innerHTML += `<tr id="row${i}"></tr>`;

        let row = document.getElementById(`row${i}`)

        for (let j = 0; j < 4; j++) {
            const n = numbers[i * 4 + j];
            if (n === 0) {
                row.innerHTML += `<td id="blank"></td>`
            } else {
                row.innerHTML += `<td id="${n}" onclick="move(${n})">${n}</td>`
            }
        }
    }
}

function move(id) {
    if (moves === 0) {
        startTimer();
    }
    moves++; 
    const movesText = document.getElementById("moves");
    movesText.innerText = `Moves: ${moves}`;

    const cell = document.getElementById(id);
    const blank = document.getElementById("blank");

    blank.setAttribute("id", `${id}`);
    blank.setAttribute("onclick", `move(${id})`);
    blank.innerText = `${id}`;

    cell.setAttribute("id", "blank");
    cell.setAttribute("onclick", "");
    cell.innerText = "";

    const blankIndex = numbers.indexOf(0);
    const valIndex = numbers.indexOf(id);
    numbers[valIndex] = 0;
    numbers[blankIndex] = id;

    if (arraysAreEqual(numbers, numbersSorted)) {
        gameWon();
    }
}

function gameWon() {
    setTimeout(() => {
        document.getElementById("victory").innerText = "You win!";
        window.alert("Congratulations!!\nAmount spent on current game in seconds: " + seconds +
            "\nNumber of moves so far: " + moves+
            "\nClose this pop-up to play again")
        window.location.reload(); //Reload page upon confirmation
    }, 50);
}

window.addEventListener("load", initialize, false);
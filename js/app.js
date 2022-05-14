import { dictionary } from './dictionary.js';

let checkB = document.querySelector('.check');
let resetB = document.querySelector('.reset');
let countOfRounds = 6;
let inputCharacter = [];
let nextBox = 0;
let randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];

console.log(randomWord);

function insertCharacter(pressedKey) {
    if (nextBox === 5) {
        return;
    } else if (nextBox === 4) {
        checkB.addEventListener('click', checkInputLetter);
        checkB.id = 'enabled';
    }
    pressedKey = pressedKey.toLowerCase();
    let row = document.querySelectorAll('.row')[6 - countOfRounds];
    let box = row.children[nextBox];
    box.textContent = pressedKey;
    inputCharacter.push(pressedKey);
    nextBox++;
}

function checkInputLetter() {
    let row = document.querySelectorAll('.row')[6 - countOfRounds];
    let inputLetter = '';
    let guess = Array.from(randomWord);
    if (nextBox <= 5) {
        checkB.id = 'disabled';
        checkB.removeEventListener('click', checkInputLetter);
    }

    for (let i = 0; i < inputCharacter.length; i++) {
        inputLetter += inputCharacter[i];
    }

    if (!dictionary.includes(inputLetter)) {
        alert('Not word in list');
        return;
    }

    for (let i = 0; i < 5; i++) {
        let boxColor = '';
        let box = row.children[i];

        let indexOfLetter = guess.indexOf(inputCharacter[i]);
        if (indexOfLetter === -1) {
            boxColor = '#767a7b';
        } else {
            if (inputCharacter[i] === guess[i]) {
                boxColor = '#68a863';
            } else {
                boxColor = '#c8b355';
            }
            guess[indexOfLetter] = '#';
        }
        box.style.backgroundColor = boxColor;
    }

    if (inputLetter === randomWord) {
        alert('Congratulations! You won.');
        countOfRounds = 0;
        return;
    } else {
        countOfRounds--;
        inputCharacter = [];
        nextBox = 0;
        if (countOfRounds === 0) {
            alert('Game over!');
        }
    }
}

function deleteCharacter() {
    if (nextBox <= 5) {
        checkB.id = 'disabled';
        checkB.removeEventListener('click', checkInputLetter);
    }
    let row = document.querySelectorAll('.row')[6 - countOfRounds];
    let box = row.children[nextBox - 1];
    box.textContent = '';
    inputCharacter.pop();
    nextBox--;
}

function resetGame() {
    let box = document.querySelectorAll('.box');
    for (let i = 0; i < box.length; i++) {
        box[i].textContent = '';
        box[i].style.backgroundColor = null;
    }
    countOfRounds = 6;
    inputCharacter = [];
    nextBox = 0;
    randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    console.log(randomWord);
}

document.addEventListener('keyup', (keyboard) => {
    if (countOfRounds === 0) {
        return;
    }
    let pressedKey = String(keyboard.key)
    if (pressedKey === '.') {
        pressedKey = 'ґ';
    }
    if (pressedKey === 'Backspace' && nextBox !== 0) {
        deleteCharacter();
        return;
    }
    if (pressedKey === 'Enter' && nextBox === 5) {
        checkInputLetter();
        return;
    }
    let insertedKey = pressedKey.match(/[а-я іїґє]/gi);

    if (!insertedKey || insertedKey.length > 1) {
        return;
    } else {
        insertCharacter(pressedKey);
    }
})
resetB.addEventListener('click', resetGame);






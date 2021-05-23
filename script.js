'use strict';

let onTurn = 'circle';
let onTurnElm = document.querySelector('#whoTurn');

const change = (event) => {
  if (onTurn === 'circle') {
    event.target.classList.add('imgGameCircle');
    onTurnElm.src = `images/cross.svg`;
    onTurnElm.alt = 'Křížek';
    onTurn = 'cross';
    event.target.disabled = true;
  } else {
    event.target.classList.add('imgGameCross');
    onTurnElm.src = 'images/circle.svg';
    onTurnElm.alt = 'Kolečko';
    onTurn = 'circle';
    event.target.disabled = true;
  }
  console.log(isWinningMove(event.target));
};

const buttonElm = document.querySelectorAll('.gameGrid button');
for (let i = 0; i < buttonElm.length; i++) {
  buttonElm[i].addEventListener('click', change);
}

const getSymbol = (field) => {
  if (field.classList.contains('imgGameCross')) {
    return 'cross';
  } else if (field.classList.contains('imgGameCircle')) {
    return 'circle';
  } else {
    return 'unidentified';
  }
};

const gridsize = 10;
const fields = document.querySelectorAll('.buttonGrid');
const getField = (row, column) => {
  return fields[row * gridsize + column];
};

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < buttonElm.length) {
    if (field === field[buttonElm]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / gridsize),
    column: fieldIndex % gridsize,
  };
};

const winningSymbols = 5;
const isWinningMove = (field) => {
  const from = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = from.column;
  while (i > 0 && symbol === getSymbol(getField(from.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = from.column;
  while (i < gridsize - 1 && symbol === getSymbol(getField(from.row, i + 1))) {
    inRow++;
    i++;
  }

  if (inRow >= winningSymbols) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = from.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, from.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = from.row;
  while (
    i < gridsize - 1 &&
    symbol === getSymbol(getField(i + 1, from.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= winningSymbols) {
    return true;
  }
  return false;
};

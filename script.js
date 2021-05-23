'use strict';

let player = 'circle';
let previousPlayer = 'křížek';
let playerElm = document.querySelector('#whoTurn');

const change = (event) => {
  if (player === 'circle') {
    event.target.classList.add('imgGameCircle');
    playerElm.src = `images/cross.svg`;
    playerElm.alt = 'Křížek';
    player = 'cross';
    previousPlayer = 'kolečko';
    event.target.disabled = true;
  } else {
    event.target.classList.add('imgGameCross');
    playerElm.src = 'images/circle.svg';
    playerElm.alt = 'Kolečko';
    player = 'circle';
    previousPlayer = 'křížek';
    event.target.disabled = true;
  }

  if (isWinningMove(event.target) === true) {
    alert(`Vyhrává ${previousPlayer}! Gratuluji!`);

    for (let i = 0; i < buttonElm.length; i++) {
      buttonElm[i].disabled = true;
    }
  }
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
    if (field === buttonElm[fieldIndex]) {
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
  // Vlevo hleď!
  i = from.column;
  while (i > 0 && symbol === getSymbol(getField(from.row, i - 1))) {
    inRow++;
    i--;
  }

  // Vpravo hled!
  i = from.column;
  while (i < gridsize - 1 && symbol === getSymbol(getField(from.row, i + 1))) {
    inRow++;
    i++;
  }

  if (inRow >= winningSymbols) {
    return true;
  }

  let inColumn = 1;
  // Vzhůru hleď!
  i = from.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, from.column))) {
    inColumn++;
    i--;
  }

  // Dolů hleď!
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

  // Diagonála z pravého horního do levého dolního rohu nefunguje, ale už nevím, co s tím :-/

  // Šikmo nahoru vlevo hleď!
  let d;
  i = from.column;
  d = from.row;

  let inDiagonalLeft = 1;

  while (d > 0 && i > 0 && symbol === getSymbol(getField(d - 1, i - 1))) {
    inDiagonalLeft++;
    i--;
    d--;
  }

  // Šikmo dolů vpravo hleď!
  i = from.column;
  d = from.row;
  while (
    d < gridsize - 1 &&
    i < gridsize - 1 &&
    symbol === getSymbol(getField(d + 1, i + 1))
  ) {
    inDiagonalLeft++;
    i++;
    d++;
  }

  if (inDiagonalLeft >= winningSymbols) {
    return true;
  }

  //Šikmo nahoru vpravo hleď!
  let inDiagonalRight = 1;

  i = from.column;
  d = from.row;
  while (d > 0 && i > 0 && symbol === getSymbol(getField(d - 1, i + 1))) {
    inDiagonalRight++;
    i++;
    d--;
  }

  //Šikmo dolů vlevo hleď!
  i = from.column;
  d = from.row;
  while (
    i < gridsize - 1 &&
    d < gridsize - 1 &&
    symbol === getSymbol(getField(d + 1, i - 1))
  ) {
    inRow++;
    i--;
    d++;
  }

  if (inDiagonalRight >= winningSymbols) {
    return true;
  }
  return false;
};

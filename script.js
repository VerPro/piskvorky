'use strict';

let onTurn = 'circle';
let onTurnElm = document.querySelector('#whoTurn');

const change = (event) => {
  if (onTurn === 'circle') {
    event.target.classList.add('imgGameCircle');
    onTurnElm.src = 'images/cross.svg';
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
};

const buttonElm = document.querySelectorAll('.gameGrid button');
for (let i = 0; i < buttonElm.length; i++) {
  buttonElm[i].addEventListener('click', change);
}

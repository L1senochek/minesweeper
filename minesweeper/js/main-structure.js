import {
  batleGround,
  createGameover,
  closeGameover,
  createWin,
  closeWin,
} from './main.js';
import { cssSizeCell } from './change-size-cells.js';
import { timer, timerStop } from './timer-game.js';
import { cssSizePlayground } from './change-size-cells.js';

export const easy = 10;
export const medium = 15;
export const hard = 25;
const numberClasses = {
  1: 'number_one',
  2: 'number_two',
  3: 'number_three',
  4: 'number_four',
  5: 'number_five',
  6: 'number_six',
  7: 'number_seven',
  8: 'number_eight',
};

let results = [];
let mines;
let countOpenCells = 0;
let clickLeft = 0;
let clickRight = 0;
let firstUserClick = true;
let isGameOver = false;
let isMuted = false;
let size;
let batlefield;

function getStoredValue() {
  const value = localStorage.getItem('valueMines');
  if (!value) {
    localStorage.setItem('valueMines', '10');
    return 10;
  }
  return parseInt(value, 10);
}
mines = getStoredValue();

export function updateStorage() {
  size = localStorage.getItem('size') || '10';
  localStorage.setItem('size', size);
  batleGround.innerHTML = '';
}
updateStorage();

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.status = false;
    this.mine = false;
    this.mark = false;
  }
}

export function createCells(currentSize) {
  const playground = [];
  for (let y = 0; y < currentSize; y += 1) {
    const row = [];
    for (let x = 0; x < currentSize; x += 1) {
      row.push(new Cell(x, y));
    }
    playground.push(row);
  }

  for (let i = 0; i < mines; i += 1) {
    while (true) {
      const x = Math.floor(currentSize * Math.random());
      const y = Math.floor(currentSize * Math.random());
      if (!playground[x][y].mine) {
        playground[x][y].mine = true;
        break;
      }
    }
  }
  return playground;
}
batlefield = createCells(size);

function checkNearCells(paramBatlefield, x, y) {
  const nearCells = [];
  for (let shiftY = -1; shiftY <= 1; shiftY += 1) {
    const cellY = +y + shiftY;
    if (cellY >= 0 && cellY < size) {
      for (let shiftX = -1; shiftX <= 1; shiftX += 1) {
        if (shiftX !== 0 || shiftY !== 0) {
          const cellX = +x + shiftX;
          if (cellX >= 0 && cellX < size) {
            nearCells.push(paramBatlefield[cellY][cellX]);
          }
        }
      }
    }
  }
  return nearCells;
}

function resultStorage() {
  const resultsStorage = JSON.parse(localStorage.getItem('results'));
  const resultsMenu = document.querySelector('.result__menu');
  resultsMenu.innerHTML = '';
  if (localStorage.getItem('results') !== null) {
    resultsStorage.forEach((result) => {
      const liWrapper = document.createElement('div');
      const li = document.createElement('li');
      const liLine = document.createElement('span');
      liWrapper.classList.add('result__item-wrapper');
      li.classList.add('result__item');
      liLine.classList.add('result__item-line');
      liWrapper.append(li, liLine);
      li.textContent = result;
      resultsMenu.appendChild(liWrapper);
    });
  }
}

function lastResults() {
  const timerCount = document.querySelector('.timer__count').innerText;
  const countClick = document.querySelector('.count__click').innerText;
  if (localStorage.getItem('results') !== null) {
    results = JSON.parse(localStorage.getItem('results'));
    if (results.length === 10) {
      results.shift();
    }
    results.push(`Clicks: ${+countClick + 1}, timer: ${timerCount}`);
    localStorage.setItem('results', JSON.stringify(results));
    resultStorage();
  } else {
    results.push(`Clicks: ${+countClick + 1}, timer: ${timerCount}`);
    localStorage.setItem('results', JSON.stringify(results));
    resultStorage();
  }
}

function winAudio() {
  if (!isMuted) {
    const audio = new Audio();
    audio.src = './assets/sounds/victory_sound.mp3';
    audio.play();
  }
}

function minesCells() {
  for (let currentY = 0; currentY < size; currentY += 1) {
    for (let currentX = 0; currentX < size; currentX += 1) {
      if (batlefield[currentY][currentX].mine) {
        const minedCell = document.querySelector(`.batle-ground__cell[data-x='${currentX}'][data-y='${currentY}']`);
        minedCell.classList.add('mine');
      }
    }
  }
}

function checkGameStatus() {
  if (countOpenCells === ((size * size) - mines)) {
    setTimeout(() => {
      timerStop();
      isGameOver = true;
    }, 100);
    minesCells();
    winAudio();
    lastResults();
    createWin();
    closeWin();
  }
}

function openFewCells(x, y) {
  for (let shiftY = -1; shiftY <= 1; shiftY += 1) {
    const cellY = +y + shiftY;
    if (cellY >= 0 && cellY < size) {
      for (let shiftX = -1; shiftX <= 1; shiftX += 1) {
        const cellX = +x + shiftX;
        if (cellX >= 0 && cellX < size && (shiftX !== 0 || shiftY !== 0)) {
          const shiftedCell = document.querySelector(`.batle-ground__cell[data-x='${cellX}'][data-y='${cellY}']`);
          const cell = batlefield[cellY][cellX];
          if (!cell.mine && !cell.status) {
            openCell.call(shiftedCell);
          }
        }
      }
    }
  }
}

function openedCellAudio() {
  if (!isMuted) {
    const audio = new Audio();
    audio.src = './assets/sounds/opened_cell.mp3';
    audio.play();
  }
}

function gameOverAudio() {
  if (!isMuted) {
    const audio = new Audio();
    audio.src = './assets/sounds/you_died.mp3';
    audio.play();
  }
}

function openCell() {
  const x = this.getAttribute('data-x');
  const y = this.getAttribute('data-y');

  if (batlefield[y][x].mine && !batlefield[y][x].mark && !isGameOver) {
    if (firstUserClick) {
      batlefield = createCells(size);
      openCell.call(this);
    } else {
      gameOverAudio();
      timerStop();
      minesCells();
      isGameOver = true;
      createGameover();
      closeGameover();
    }
  } else if (!batlefield[y][x].mark && !batlefield[y][x].status && !isGameOver) {
    batlefield[y][x].status = true;
    firstUserClick = false;
    this.classList.add('opened');
    openedCellAudio();
    const mineNum = checkNearCells(batlefield, x, y).filter((cell) => cell.mine).length;
    if (mineNum === 0) {
      if (isMuted === false) {
        isMuted = true;
        setTimeout(() => {
          isMuted = false;
        }, 5);
      }
      openFewCells(x, y);
    } else {
      this.classList.add(numberClasses[mineNum]);
      this.innerText = mineNum;
    }
    countOpenCells += 1;
    checkGameStatus();
  }
}

function markCell(event) {
  event.preventDefault();
  const x = this.getAttribute('data-x');
  const y = this.getAttribute('data-y');
  const isMarked = this.classList.contains('marked-cell');
  if (!batlefield[y][x].status) {
    clickRight += isMarked ? -1 : 1;
    batlefield[y][x].mark = !batlefield[y][x].mark;
    this.classList.toggle('marked-cell');
  }
  const infoFlags = document.querySelector('.info__flags');
  infoFlags.innerText = `Flags: ${clickRight} \n Remaining mines: ${mines - clickRight}`;
}

function startTimer() {
  openCell.call(this);
  const countClick = document.querySelector('.count__click');
  if (countClick.innerText === '0') {
    timer();
  }
}

export function visualiseCells() {
  updateStorage();
  firstUserClick = true;
  isGameOver = false;
  batlefield = createCells(size);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const cell = document.createElement('div');
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.classList.add('batle-ground__cell');
      batleGround.appendChild(cell);
      cssSizeCell(size);
      cell.addEventListener('click', startTimer);
      cell.addEventListener('contextmenu', markCell);
    }
  }
}

function updateSize() {
  return localStorage.getItem('size');
}

document.addEventListener('DOMContentLoaded', () => {
  const numberInput = document.querySelector('.mines__number');
  const rangeInput = document.querySelector('.mines__range');
  const countClick = document.querySelector('.count__click');
  const timerCount = document.querySelector('.timer__count');
  const storedValue = localStorage.getItem('valueMines');
  const headerChoice = document.querySelector('.header__choice');
  const reloadGameBtn = document.querySelector('.header__reload');
  const wrapperCells = document.querySelector('.batle-ground');
  const soundIcon = document.querySelector('.header__soung');
  const resultsBtn = document.querySelector('.result__text');
  const infoFlags = document.querySelector('.info__flags');
  let curentDeg = 0;

  function resetTimerClicks() {
    clickLeft = 0;
    countClick.innerText = `${clickLeft}`;
    timerCount.innerText = '00:00:00';
    timerStop();
  }

  function changeSizePlayground(event) {
    let sizeValue = localStorage.getItem('size');

    if (event.target === document.querySelector('.easy')) {
      sizeValue = 10;
      countOpenCells = 0;
      clickRight = 0;
      infoFlags.innerText = `Flags: ${clickRight} \n Remaining mines: ${mines - clickRight}`;
      localStorage.setItem('size', sizeValue);
      visualiseCells();
      resetTimerClicks();
      cssSizePlayground(sizeValue);
    } else if (event.target === document.querySelector('.medium')) {
      sizeValue = 15;
      countOpenCells = 0;
      clickRight = 0;
      infoFlags.innerText = `Flags: ${clickRight} \n Remaining mines: ${mines - clickRight}`;
      localStorage.setItem('size', sizeValue);
      visualiseCells();
      resetTimerClicks();
      cssSizePlayground(sizeValue);
    } else if (event.target === document.querySelector('.hard')) {
      sizeValue = 25;
      countOpenCells = 0;
      clickRight = 0;
      infoFlags.innerText = `Flags: ${clickRight} \n Remaining mines: ${mines - clickRight}`;
      localStorage.setItem('size', sizeValue);
      visualiseCells();
      resetTimerClicks();
      cssSizePlayground(sizeValue);
    }
  }

  function dropdownMenuAnim() {
    const dropdownMenu = document.querySelector('.dropdown__menu');
    const titleArrow = document.querySelector('.title__arrow');
    const sizes = document.querySelectorAll('.dropdown__cells-size');

    if (dropdownMenu.style.height === '' || dropdownMenu.style.height === '0px') {
      dropdownMenu.style.height = '90px';
      dropdownMenu.style.padding = '10px 20px';
      dropdownMenu.classList.add('active');
      titleArrow.style.transform = 'rotate(270deg)';
    } else {
      dropdownMenu.style.height = '0px';
      dropdownMenu.style.padding = '0px 20px';
      dropdownMenu.classList.remove('active');
      titleArrow.style.transform = 'rotate(90deg)';
    }
    sizes.forEach((element) => {
      element.addEventListener('click', changeSizePlayground);
    });
  }
  headerChoice.addEventListener('click', dropdownMenuAnim);

  if (storedValue) {
    rangeInput.value = storedValue;
    numberInput.value = storedValue;
  }

  function updateInput() {
    const rangeValue = rangeInput.value;
    numberInput.value = rangeValue;
    localStorage.setItem('valueMines', rangeValue);
    mines = getStoredValue();
    firstUserClick = true;
    countOpenCells = 0;
    clickRight = 0;
    infoFlags.innerText = `Flags: ${clickRight} \n Remaining mines: ${mines - clickRight}`;
    batlefield = createCells(updateSize());
    visualiseCells();
    resetTimerClicks();
  }

  function updateRange() {
    let inputValue = Number(numberInput.value);
    rangeInput.value = inputValue;
    if (inputValue < 10) {
      numberInput.value = 10;
      inputValue = 10;
    } else if (inputValue > 99) {
      numberInput.value = 99;
      inputValue = 99;
    }
    localStorage.setItem('valueMines', inputValue);
    mines = localStorage.getItem('valueMines');
    firstUserClick = true;
    clickRight = 0;
    infoFlags.innerText = `Flags: ${clickRight} \n Remaining mines: ${mines - clickRight}`;
    countOpenCells = 0;
    batlefield = createCells(updateSize());
    visualiseCells();
    resetTimerClicks();
  }

  function updateColorRange(event) {
    const e = event;
    const { value } = e.target;
    const percent = ((value - e.target.min) / (e.target.max - e.target.min)) * 100;
    e.target.style.background = `
    linear-gradient(to right, var(--slider-color) 0%,
    var(--slider-color) ${percent}%,
    var(--slider-track-color) ${percent}%, var(--slider-track-color) 100%)`;
  }

  rangeInput.addEventListener('input', updateColorRange);
  rangeInput.addEventListener('input', updateInput);
  numberInput.addEventListener('input', updateRange);

  function reloadAnim(e) {
    if (e.target === reloadGameBtn) {
      reloadGameBtn.style.transition = 'all 2s ease';
      curentDeg -= 180;
      reloadGameBtn.style.transform = `rotate(${curentDeg}deg)`;
      mines = getStoredValue();
      countOpenCells = 0;
      firstUserClick = true;
      clickRight = 0;
      infoFlags.innerText = `Flags: ${clickRight} \n Remaining mines: ${mines - clickRight}`;
      const upSize = Number(updateSize());
      batlefield = createCells(upSize);
      visualiseCells();
      resetTimerClicks();
    }
  }
  reloadGameBtn.addEventListener('click', reloadAnim);

  function counterClicks() {
    clickLeft = 0;

    wrapperCells.addEventListener('click', (event) => {
      if (event.target.classList.contains('batle-ground__cell') && !isGameOver) {
        clickLeft += 1;
        countClick.innerText = `${clickLeft}`;
      }
    });
  }
  counterClicks();

  function muted() {
    isMuted = !isMuted;
    soundIcon.classList.toggle('mute');
  }
  soundIcon.addEventListener('click', muted);

  function dropdownMenuResults() {
    resultStorage();
    const resultMenu = document.querySelector('.result__menu');
    if ((resultMenu.style.height === '' || resultMenu.style.height === '0px') && resultMenu.querySelectorAll('li').length !== 0) {
      resultMenu.style.height = 'auto';
      resultMenu.style.padding = '1vw 0.5vw';
      resultMenu.style.borderWidth = '1px';
      resultMenu.style.transition = 'all 2s ease';
    } else {
      resultMenu.style.height = '0px';
      resultMenu.style.padding = '0';
      resultMenu.style.borderWidth = '0px';
      resultMenu.style.transition = 'all 2s ease';
    }
  }
  resultsBtn.addEventListener('click', dropdownMenuResults);

  const infoWrapper = document.querySelector('.info__wrapper');
  const hamburgerMenu = document.querySelector('.hamburger__menu');
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      hamburgerMenu.classList.toggle('active');
      infoWrapper.classList.toggle('active');
    });
  }
});

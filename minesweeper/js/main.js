import { header } from './header.js';

const main = document.createElement('main');
const backGround = document.createElement('div');
const info = document.createElement('div');
const hamburger = document.createElement('div');
const wrapperInfo = document.createElement('div');
const flagsDiv = document.createElement('div');
const saveBtn = document.createElement('div');
const lastResWrapper = document.createElement('div');
const lastResText = document.createElement('div');
const resMenu = document.createElement('ul');
export const batleGround = document.createElement('div');

function getStoredValue() {
  const value = localStorage.getItem('valueMines');
  if (value === null) {
    localStorage.setItem('valueMines', '10');
    return 10;
  }
  return parseInt(value, 10);
}

export function createMain() {
  main.classList.add('main');
  backGround.classList.add('background');
  batleGround.classList.add('batle-ground');
  info.classList.add('info');
  hamburger.classList.add('hamburger__menu');
  wrapperInfo.classList.add('info__wrapper');
  flagsDiv.classList.add('info__flags');
  saveBtn.classList.add('info__save');
  lastResWrapper.classList.add('info__result', 'result__wrapper');
  lastResText.classList.add('result__text');
  resMenu.classList.add('result__menu');
  const mines = getStoredValue();
  flagsDiv.innerText = `Flags: 0 \n Remaining mines: ${mines}`;
  saveBtn.innerText = 'Save';
  hamburger.innerHTML = `
    <span class="hamburger__line first-line"></span>
    <span class="hamburger__line second-line"></span>
    <span class="hamburger__line third-line"></span>`;
  lastResText.innerText = 'Results';
  main.append(backGround);
  lastResWrapper.append(resMenu, lastResText);
  wrapperInfo.append(flagsDiv, lastResWrapper);
  info.append(hamburger, wrapperInfo);
  backGround.append(info, batleGround);
  header.parentNode.insertBefore(main, header.nextSibling);
}

export function createGameover() {
  if (!document.querySelector('.gameover')) {
    const gameOver = document.createElement('div');
    gameOver.classList.add('gameover');
    gameOver.innerHTML = `
      <div class="gameover__modal">
        <img src="./assets/gif/dead.gif" class="gameover__img-lose" alt="you died">
        <div class="gameover__btn">Close</div>
      </div>`;
    main.parentNode.insertBefore(gameOver, main.nextSibling);
  }
}

export function closeGameover() {
  const gameoverBtn = document.querySelector('.gameover__btn');
  const gameovers = document.querySelectorAll('.gameover');
  function closeModal(event) {
    if (event.target.classList.contains('gameover__btn')) {
      gameovers.forEach((gameover) => {
        gameover.remove();
      });
    }
  }
  gameoverBtn.addEventListener('click', closeModal);
}

export function createWin() {
  if (!document.querySelector('.win')) {
    const win = document.createElement('div');
    win.classList.add('win');
    win.innerHTML = `
      <div class="win__modal">
        <img src="./assets/gif/victory-achieved.gif" class="win__img" alt="you died">
        <div class="win__wrapper-btn">
          <div class="win__btn last-result">Result: </div>
          <div class="win__btn win-close">Close</div>
        </div>
      </div>`;
    main.parentNode.insertBefore(win, main.nextSibling);
  }
}

export function closeWin() {
  const timerCount = document.querySelector('.timer__count').innerText;
  const countClick = document.querySelector('.count__click').innerText;
  const lastResultBtn = document.querySelector('.last-result');
  const winCloseBtn = document.querySelector('.win-close');
  const win = document.querySelectorAll('.win');
  lastResultBtn.innerText = `Clicks: ${+countClick + 1} \n Timer: ${timerCount}`;
  function closeModal(event) {
    if (event.target.classList.contains('win-close')) {
      win.forEach((youWin) => {
        youWin.remove();
      });
    }
  }
  winCloseBtn.addEventListener('click', closeModal);
}

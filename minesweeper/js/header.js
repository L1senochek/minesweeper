import { bodyTag } from './preloader.js';
import { dpordownMenuCells, createDropdownMenu } from './header-select-cells.js';
import { getThemeLocal } from './change-theme.js';

export const header = document.createElement('header');
const soung = document.createElement('div');
const theme = document.createElement('div');
const choiceCells = document.createElement('div');
const timerGame = document.createElement('div');
const timerIcon = document.createElement('div');
const reloadIcon = document.createElement('div');
export const timerCount = document.createElement('div');
const countMinesWrapper = document.createElement('div');
const countClickWrapper = document.createElement('div');
const countClick = document.createElement('span');

createDropdownMenu();

export function createHeader() {
  header.classList.add('header');
  soung.classList.add('header__soung');
  theme.classList.add('header__theme');
  choiceCells.classList.add('header__choice');
  countMinesWrapper.classList.add('header__mines');
  countClickWrapper.classList.add('header__count');
  timerGame.classList.add('header__timer');
  reloadIcon.classList.add('header__reload');
  countClick.classList.add('count__click');
  timerIcon.classList.add('timer__icon');
  timerCount.classList.add('timer__count');

  theme.innerHTML = `<div class="theme__title">Theme:</div>
    <input type="checkbox" class="theme__check" id="check-theme" checked="checked" />
    <label for="check-theme"></label>`;
  choiceCells.innerHTML = `<div class="title__wrapper">
    <span class="title__choice">Size </span>
    <div class="title__arrow"></div>
    </div>`;
  countMinesWrapper.innerHTML = `<div class="mines__title">Mines: </div>
    <div class="mines__wrapper-input">
      <input class="mines__number" type="number" min="10" max="99">
      <input class="mines__range" type="range" min="10" max="99">
    </div>`;
  countClickWrapper.innerHTML = '<span class="count__title">Clicks: </span>';
  countClick.innerText = '0';
  timerCount.innerHTML = '00:00:00';
  bodyTag.prepend(header);

  choiceCells.appendChild(dpordownMenuCells);
  countClickWrapper.appendChild(countClick);
  timerGame.append(timerIcon, timerCount);
  header.append(
    soung,
    theme,
    choiceCells,
    countMinesWrapper,
    countClickWrapper,
    timerGame,
    reloadIcon,
  );
  getThemeLocal();
}

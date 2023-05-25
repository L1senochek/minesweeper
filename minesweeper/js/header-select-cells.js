export const dpordownMenuCells = document.createElement('div');
const selectEasy = document.createElement('div');
const selectMedium = document.createElement('div');
const selectHard = document.createElement('div');
const easyCells = document.createElement('a');
export const mediumCells = document.createElement('a');
const hardCells = document.createElement('a');
const menuLineEasy = document.createElement('span');
const menuLineMedium = document.createElement('span');
const menuLineHard = document.createElement('span');

export function createDropdownMenu() {
  dpordownMenuCells.classList.add('dropdown__menu');
  selectEasy.classList.add('dropdown__cells-size');
  selectMedium.classList.add('dropdown__cells-size');
  selectHard.classList.add('dropdown__cells-size');
  easyCells.classList.add('dropdown__text-size', 'easy');
  mediumCells.classList.add('dropdown__text-size', 'medium');
  hardCells.classList.add('dropdown__text-size', 'hard');
  menuLineEasy.classList.add('dropdown__menu-line');
  menuLineMedium.classList.add('dropdown__menu-line');
  menuLineHard.classList.add('dropdown__menu-line');

  easyCells.innerText = `${10}x${10}`;
  selectEasy.append(easyCells, menuLineEasy);
  mediumCells.innerText = `${15}x${15}`;
  selectMedium.append(mediumCells, menuLineMedium);
  hardCells.innerText = `${25}x${25}`;
  selectHard.append(hardCells, menuLineHard);
  dpordownMenuCells.append(selectEasy, selectMedium, selectHard);
}

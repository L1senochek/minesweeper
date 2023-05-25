import createHeadTag from './head-tag.js';
import { createStructurePreloader, loader } from './preloader.js';
import createFrostedGlass from "./frosted-glass.js";
import { createHeader } from './header.js';
import { createMain } from './main.js';
import { visualiseCells } from './main-structure.js';
import { cssSizePlayground } from './change-size-cells.js';
import { getThemeLocal, saveTheme } from './change-theme.js';
import changeTheme from './chenge-theme-onclick.js';

const size = localStorage.getItem('size');

createHeadTag();

createHeader();
window.addEventListener('load', loader);
createFrostedGlass();
createStructurePreloader();

createMain();

cssSizePlayground(size);
visualiseCells();

getThemeLocal();
saveTheme();
changeTheme();

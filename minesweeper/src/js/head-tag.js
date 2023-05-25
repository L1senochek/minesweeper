const headTag = document.head;
const link = document.createElement('link');
const linkIco = document.createElement('link');
const titleTag = document.createElement('title');

export default function createHeadTag() {
  link.rel = 'stylesheet';
  link.href = './css/index.css';
  linkIco.rel = 'icon';
  linkIco.href = './assets/img/minesweeperIco.ico';
  titleTag.innerText = 'Minesweeper game';
  headTag.append(link, linkIco, titleTag);
}

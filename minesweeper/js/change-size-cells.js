export function cssSizePlayground(size) {
  const battleGround = document.querySelector('.batle-ground');

  if (size === '10' || size === 10) {
    battleGround.classList.add('easy');
    battleGround.classList.remove('medium');
    battleGround.classList.remove('hard');
  } else if (size === '15' || size === 15) {
    battleGround.classList.remove('easy');
    battleGround.classList.add('medium');
    battleGround.classList.remove('hard');
  } else if (size === '25' || size === 25) {
    battleGround.classList.remove('easy');
    battleGround.classList.remove('medium');
    battleGround.classList.add('hard');
  }
}

export function cssSizeCell(size) {
  const battleGroundCell = document.querySelectorAll('.batle-ground__cell');
  battleGroundCell.forEach((element) => {
    const elem = element;
    if (size === '10') {
      elem.style.gridColumn = 'auto/span 5';
    } else if (size === '15') {
      elem.style.gridColumn = 'auto/span 3';
    } else if (size === '25') {
      elem.style.gridColumn = 'auto/span 2';
    }
  });
}

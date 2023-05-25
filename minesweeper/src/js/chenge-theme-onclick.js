export default function changeTheme() {
  const body = document.querySelector('.body');
  const frostedGlass = document.querySelector('.frosted-glass');
  const bonfireImg = document.querySelector('.bonfire-img');
  const frostedGlassAnim = document.querySelector('.frosted-glass_anim');
  const header = document.querySelector('.header');
  const headerDiv = header.querySelectorAll('div');
  const background = document.querySelector('.background');
  const batleGround = document.querySelector('.batle-ground');

  if (localStorage.getItem('checkTheme') === 'false') {
    body.classList.add('light');
    frostedGlass.classList.add('light');
    bonfireImg.classList.add('light');
    frostedGlassAnim.classList.add('light');
    background.classList.add('light');
    batleGround.classList.add('light');
    headerDiv.forEach((div) => {
      div.classList.add('light');
    });
  } else {
    body.classList.remove('light');
    frostedGlass.classList.remove('light');
    bonfireImg.classList.remove('light');
    frostedGlassAnim.classList.remove('light');
    background.classList.remove('light');
    batleGround.classList.remove('light');
    headerDiv.forEach((div) => {
      div.classList.remove('light');
    });
  }
}

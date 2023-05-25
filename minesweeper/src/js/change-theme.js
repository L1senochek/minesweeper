import changeTheme from "./chenge-theme-onclick.js";

export function getThemeLocal() {
  const checkTheme = document.querySelector('.theme__check');
  if (!localStorage.getItem('checkTheme')) {
    checkTheme.checked = true;
    localStorage.setItem('checkTheme', true);
  } else {
    const res = JSON.parse(localStorage.getItem('checkTheme'));
    checkTheme.checked = res;
  }
}

export function saveTheme() {
  const checkTheme = document.querySelector('.theme__check');

  getThemeLocal();
  checkTheme.addEventListener('change', () => {
    if (checkTheme.checked) {
      localStorage.setItem('checkTheme', true);
      checkTheme.checked = true;
    } else {
      localStorage.setItem('checkTheme', false);
      checkTheme.checked = false;
    }
    changeTheme();
  });
}

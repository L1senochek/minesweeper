export const bodyTag = document.body;
const preloader = document.createElement('div');

export function createStructurePreloader() {
  bodyTag.classList.add('body');
  preloader.classList.add('preloader');
  bodyTag.prepend(preloader);

  preloader.innerHTML = `<div class="preloader">
    <div class="preloader__bonfire__wrapper">
      <div class="preloader__sword">
        <div class="preloader__pommel">
          <div class="preloader__grip">
            <div class="preloader__guard">
              <div class="preloader__blade">
                <div class="preloader__filler"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="preloader__bonfire">
        <div class="preloader__bonfire_second">
          <div class="preloader__bonfire_third"></div>
        </div>
      </div>
      <div class="preloader__fire">
        <div class="preloader__fire_first"></div>
        <div class="preloader__fire_second"></div>
        <div class="preloader__fire_third"></div>
        <div class="preloader__fire_fourth"></div>
      </div>
    </div>
  </div>`;
}

export function loader() {
  bodyTag.classList.add('loaded_hiding');
  window.setTimeout(() => {
    bodyTag.classList.add('loaded');
    bodyTag.classList.remove('loaded_hiding');
  }, 500);
}

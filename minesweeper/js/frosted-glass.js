const frostedGlass = document.createElement('div');
const frostedGlassAnim = document.createElement('div');
const bonfireImg = document.createElement('video');

export default function createFrostedGlass() {
  frostedGlass.classList.add('frosted-glass');
  frostedGlassAnim.classList.add('frosted-glass_anim');
  bonfireImg.classList.add('bonfire-img');
  bonfireImg.autoplay = true;
  bonfireImg.loop = true;
  bonfireImg.muted = true;
  bonfireImg.playsInline = true;
  bonfireImg.src = './assets/mp4/dark.webm';
  frostedGlass.append(bonfireImg);
  document.body.prepend(frostedGlass, frostedGlassAnim);
}

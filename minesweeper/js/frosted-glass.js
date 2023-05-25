const frostedGlass = document.createElement('div');
const frostedGlassAnim = document.createElement('div');
const bonfireImg = document.createElement('div');

export default function createFrostedGlass() {
  frostedGlass.classList.add('frosted-glass');
  frostedGlassAnim.classList.add('frosted-glass_anim');
  bonfireImg.classList.add('bonfire-img');
  frostedGlass.append(bonfireImg);
  document.body.prepend(frostedGlass, frostedGlassAnim);
}

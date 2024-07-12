import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const picture = block.querySelector('picture');

  if (picture) {
    const imageURL = picture.querySelector('img').src;
    const imgEl = createOptimizedPicture(imageURL, '', true, [{ width: '2000' }]);
    const backgroundSrc = imgEl.querySelector('img').src;
    const heroEl = picture.closest('.hero');

    heroEl.style.backgroundImage = `url(${backgroundSrc})`;
    picture.parentElement.remove();

    const contentWrapEl = heroEl.querySelector('& > div');
    contentWrapEl.classList.add('hero-content-wrapper');
    const contentEl = heroEl.querySelector('& > div > div');
    contentEl.classList.add('hero-text-content');
  }
}

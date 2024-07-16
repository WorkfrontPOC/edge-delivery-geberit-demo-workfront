import { loadCSS, loadScript } from '../../scripts/aem.js';

const buildSlider = () => {
  // eslint-disable-next-line no-undef, no-new
  new Swiper('.swiper-carousel', {
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};

export default async function decorate(block) {
  block.classList.add('swiper-carousel');

  const wrapperEl = document.createElement('div');
  wrapperEl.classList.add('swiper-wrapper');
  wrapperEl.append(...block.querySelectorAll(':scope > div'));
  block.append(wrapperEl);

  const slides = [...wrapperEl.querySelectorAll(':scope > div')];

  slides.forEach((slide) => {
    slide.classList.add('swiper-slide');
  });

  const nextButton = document.createElement('button');
  nextButton.classList.add('swiper-button-next');
  const prevButton = document.createElement('button');
  prevButton.classList.add('swiper-button-prev');
  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination');

  block.parentElement.prepend(prevButton);
  block.parentElement.append(nextButton);
  block.append(pagination);

  loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js').then(() => buildSlider(block));
  loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
}

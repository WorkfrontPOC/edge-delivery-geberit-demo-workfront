export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';

      const textWrapper = document.createElement('div');
      textWrapper.append(...div.children);
      div.append(textWrapper);
      const pic = div.querySelector('picture');

      if (pic) {
        const el = document.createElement('div');
        el.classList.add('picture-wrapper');
        pic.parentElement.remove();
        el.append(pic);
        div.prepend(el);
      }
    });
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}

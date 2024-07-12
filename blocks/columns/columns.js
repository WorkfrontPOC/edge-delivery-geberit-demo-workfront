export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      if (pic) {
        col.classList.add('column-with-image');
      } else {
        col.classList.add('text-column');
      }

      // logic for bento variant
      if (block.classList.contains('bento')) {
        const textWrapper = document.createElement('div');
        textWrapper.append(...col.children);
        col.append(textWrapper);

        if (pic) {
          const el = document.createElement('div');
          el.classList.add('picture-wrapper');
          pic.parentElement.remove();
          el.append(pic);
          col.append(el);
        }
      }
    });
  });
}

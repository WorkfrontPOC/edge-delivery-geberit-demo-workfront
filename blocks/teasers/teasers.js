export default async function decorate(block) {
  const teasersList = [...block.querySelectorAll(':scope > div')];

  teasersList.forEach((teaserRow, index) => {
    teaserRow.classList.add('teaser-row');
    teaserRow.querySelector('picture').closest('div').classList.add('teaser-column-with-image');

    if (index < teasersList.length) {
      teaserRow.insertAdjacentHTML('afterend', '<hr>');
    }
  });
}

import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');

// Create and render markup
const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>
    `;
  })
  .join('');

gallery.insertAdjacentHTML('beforeend', markup);

// Open modal on image click
gallery.addEventListener('click', (event) => {
  event.preventDefault();

  const { nodeName, dataset, alt, src } = event.target;

  if (nodeName !== 'IMG') return;

  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${dataset.source}" alt="${alt}" />
    </div>
  `);

  instance.show();

  // Close modal on ESC press
  const handleKeyDown = (event) => {
    if (event.code !== 'Escape') return;
    instance.close();
  };

  document.addEventListener('keydown', handleKeyDown);

  // Remove listener when modal is closed
  instance.on('close', () => {
    document.removeEventListener('keydown', handleKeyDown);
  });
});


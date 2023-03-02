import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

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
  .join("");

gallery.insertAdjacentHTML("beforeend", markup);

// Open modal on image click

gallery.addEventListener("click", (event) => {
  event.preventDefault();

  const { nodeName, dataset, alt } = event.target;

  if (nodeName !== "IMG") return;

  const instance = basicLightbox.create(
    `
    <div class="modal">
      <img src="${dataset.source}" alt="${alt}" />
    </div>
  `,
    {
      onShow: () => {
        document.addEventListener("keydown", handleKeyDown);
      },
      onClose: () => {
        document.removeEventListener("keydown", handleKeyDown);
      },
    }
  );

  // Close modal on ESC press

  function handleKeyDown(event) {
    if (event.code !== "Escape") return;
    instance.close();
  }

  instance.show();

  document.addEventListener("keydown", handleKeyDown);
});

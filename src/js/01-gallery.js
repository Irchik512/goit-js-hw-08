// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');

const galleryMurkup = galleryItems
  .map(item => {
    const { preview, original, description } = item;
    return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
      />
    </a>
  </div>
  `;
  })
  .join('');
galleryRef.insertAdjacentHTML('afterbegin', galleryMurkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

galleryRef.addEventListener('click', openBigImage);

function openBigImage(event) {
  event.preventDefault();
}

import refs from './refs';
import imageCards from '../templates/image-cards.hbs';

const appendGalleryMarkup = images => {
  refs.gallery.insertAdjacentHTML('beforeend', imageCards(images));

  if ('loading' in HTMLImageElement.prototype) {
    const loadingLazyImages = document.querySelectorAll('img[loading="lazy"]:not([src])');

    loadingLazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    require('lazysizes');
  }
};

const clearGalleryMarkup = () => {
  refs.gallery.innerHTML = '';
};

const showLoadMoreBtn = () => {
  refs.loadMoreBtn.style.display = 'block';
};

const hideLoadMoreBtn = () => {
  refs.loadMoreBtn.style.display = 'none';
};

const scrollToUp = () => {
  window.scrollBy(0, 0);
};

const scrollToNewGroup = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

export default {
  appendGalleryMarkup,
  clearGalleryMarkup,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  scrollToUp,
  scrollToNewGroup,
};

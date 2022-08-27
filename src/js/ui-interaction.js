import refs from './refs';
import imageCards from '../templates/image-cards.hbs';

const appendGalleryMarkup = images => {
  refs.gallery.insertAdjacentHTML('beforeend', imageCards(images));
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

const backToUp = () => {
  window.scrollBy(0, 0);
};

export default {
  appendGalleryMarkup,
  clearGalleryMarkup,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  backToUp,
};

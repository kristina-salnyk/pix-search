import './css/styles.css';
import refs from './js/refs';
import ImageService from './js/api/imageService';
import { searchFormSubmitHandler } from './js/handlers/searchFormSubmitHandler';
import { loadMoreBtnHandler } from './js/handlers/loadMoreBtnHandler';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

export const imageService = new ImageService();

export const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const options = {
  rootMargin: '200px',
  threshold: 1.0,
};

export const observer = new IntersectionObserver(loadMoreBtnHandler, options);

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
// refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

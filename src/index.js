import './css/styles.css';
import refs from './js/refs';
import ImageService from './js/image-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';
import { searchFormSubmitHandler } from './js/searchFormSubmitHandler';
import { loadMoreBtnHandler } from './js/loadMoreBtnHandler';

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

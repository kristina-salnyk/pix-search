import './css/styles.css';
import refs from './js/refs';
import ImageService from './js/image-service';
import { Notify } from 'notiflix';
import imageCards from './templates/image-cards.hbs';

const searchFormSubmitHandler = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notify.info('Please enter the query to search images.');
    return;
  }

  imageService.searchQuery = searchQuery;

  try {
    const data = await imageService.fetchImages();
    const { hits: images, totalHits } = data;

    if (images.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      clearGalleryMarkup();
      return;
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);
    clearGalleryMarkup();
    window.scrollBy(0, 0);
    appendGalleryMarkup(images);
    showLoadMoreBtn();
    imageService.incrementPage();
  } catch (error) {
    Notify.failure('Failed to get data, please try again later.');
  }
};

const loadMoreBtnHandler = async event => {
  try {
    const data = await imageService.fetchImages();
    const { hits: images } = data;

    if (images.length === 0) {
      Notify.info('We are sorry, but you have reached the end of search results.');
      hideLoadMoreBtn();
      return;
    }

    appendGalleryMarkup(images);
    imageService.incrementPage();
  } catch (error) {
    Notify.failure('Failed to get data, please try again later.');
  }
};

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

const imageService = new ImageService();

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

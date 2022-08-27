import './css/styles.css';
import refs from './js/refs';
import ui from './js/ui-interaction';
import ImageService from './js/image-service';
import { Notify } from 'notiflix';

const searchFormSubmitHandler = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notify.info('Please enter the query to search images.');
    ui.hideLoadMoreBtn();
    return;
  }

  imageService.searchQuery = searchQuery;

  try {
    const data = await imageService.fetchImages();
    const { hits: images, totalHits } = data;

    if (totalHits === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      ui.clearGalleryMarkup();
      ui.hideLoadMoreBtn();
      return;
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);

    ui.backToUp();
    ui.clearGalleryMarkup();
    ui.appendGalleryMarkup(images);

    if (totalHits > imageService.getCurrentCapacity()) {
      imageService.incrementPage();
      ui.showLoadMoreBtn();
    } else {
      ui.hideLoadMoreBtn();
    }
  } catch (error) {
    Notify.failure('Failed to get data, please try again later.');
  }
};

const loadMoreBtnHandler = async () => {
  try {
    ui.hideLoadMoreBtn();

    const data = await imageService.fetchImages();
    const { hits: images, totalHits } = data;

    ui.appendGalleryMarkup(images);

    if (totalHits <= imageService.getCurrentCapacity()) {
      Notify.info('We are sorry, but you have reached the end of search results.');
    } else {
      imageService.incrementPage();
      ui.showLoadMoreBtn();
    }
  } catch (error) {
    Notify.failure('Failed to get data, please try again later.');
  }
};

const imageService = new ImageService();

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

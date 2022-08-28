import { imageService, lightbox, observer } from '../../index';
import refs from '../refs';
import { Notify } from 'notiflix';
import ui from '../ui-interaction';

export const searchFormSubmitHandler = async event => {
  event.preventDefault();
  observer.unobserve(refs.jsGuard);

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notify.info('Please enter the query to search images.');
    ui.clearGalleryMarkup();
    // ui.hideLoadMoreBtn();
    return;
  }

  if (searchQuery === imageService.searchQuery) {
    Notify.info('Search results are already displayed.');
    return;
  }

  imageService.searchQuery = searchQuery;

  try {
    const data = await imageService.fetchImages();
    const { hits: images, totalHits } = data;

    if (totalHits === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      ui.clearGalleryMarkup();
      // ui.hideLoadMoreBtn();
      return;
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);

    ui.clearGalleryMarkup();
    ui.scrollToUp();
    ui.appendGalleryMarkup(images);
    lightbox.refresh();

    if (totalHits > imageService.getCurrentCapacity()) {
      imageService.incrementPage();
      observer.observe(refs.jsGuard);
      // ui.showLoadMoreBtn();
    } else {
      // ui.hideLoadMoreBtn();
    }
  } catch (error) {
    Notify.failure('Failed to get data, please try again later.');
  }
};

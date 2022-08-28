import { imageService, lightbox, observer } from '../../index';
import refs from '../refs';
import ui from '../ui-interaction';
import notifications from '../notifications';

export const searchFormSubmitHandler = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === imageService.searchQuery) {
    notifications.repeatedRequest();
    return;
  }

  observer.unobserve(refs.jsGuard);

  if (!searchQuery) {
    notifications.emptyRequest();
    ui.clearGalleryMarkup();
    // ui.hideLoadMoreBtn();
    return;
  }

  imageService.searchQuery = searchQuery;

  try {
    const data = await imageService.fetchImages();
    const { hits: images, totalHits } = data;

    if (totalHits === 0) {
      notifications.notFoundResults();
      ui.clearGalleryMarkup();
      // ui.hideLoadMoreBtn();
      return;
    }

    notifications.successRequest(totalHits);

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
    notifications.failedRequest();
  }
};

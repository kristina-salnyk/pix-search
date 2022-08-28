import { imageService, lightbox, observer } from '../../index';
import ui from '../ui-interaction';
import refs from '../refs';
import notifications from '../notifications';

export const loadMoreBtnHandler = async entries => {
  try {
    // use instead of load-more button
    let targetAchieved = entries.some(entry => entry.isIntersecting);
    if (!targetAchieved) return;
    // ui.hideLoadMoreBtn();

    const data = await imageService.fetchImages();
    const { hits: images, totalHits } = data;

    ui.appendGalleryMarkup(images);
    ui.scrollToNewGroup();
    lightbox.refresh();

    if (totalHits <= imageService.getCurrentCapacity()) {
      notifications.endOfResults();
      observer.unobserve(refs.jsGuard);
    } else {
      imageService.incrementPage();
      // ui.showLoadMoreBtn();
    }
  } catch (error) {
    notifications.failedRequest();
  }
};

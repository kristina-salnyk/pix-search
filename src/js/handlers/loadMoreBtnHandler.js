import { imageService } from '../../index';
import { lightbox } from '../../index';
import { observer } from '../../index';

import ui from '../ui-interaction';
import { Notify } from 'notiflix';
import refs from '../refs';

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
      Notify.info('We are sorry, but you have reached the end of search results.');
      observer.unobserve(refs.jsGuard);
    } else {
      imageService.incrementPage();
      // ui.showLoadMoreBtn();
    }
  } catch (error) {
    Notify.failure('Failed to get data, please try again later.');
  }
};

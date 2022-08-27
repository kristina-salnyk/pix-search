import './css/styles.css';
import refs from './js/refs';
import ui from './js/ui-interaction';
import ImageService from './js/image-service';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

const searchFormSubmitHandler = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notify.info('Please enter the query to search images.');
    // ui.hideLoadMoreBtn();
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
      // ui.showLoadMoreBtn();
      observer.observe(refs.jsGuard);
    } else {
      // ui.hideLoadMoreBtn();
    }
  } catch (error) {
    Notify.failure('Failed to get data, please try again later.');
  }
};

const loadMoreBtnHandler = async entries => {
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

const imageService = new ImageService();

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const options = {
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(loadMoreBtnHandler, options);

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
// refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

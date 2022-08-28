import { Notify } from 'notiflix';

export default {
  endOfResults() {
    Notify.info('We are sorry, but you have reached the end of search results.');
  },

  failedRequest() {
    Notify.failure('Failed to get data, please try again later.');
  },

  successRequest(totalHits) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
  },

  notFoundResults() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  },

  emptyRequest() {
    Notify.info('Please enter the query to search images.');
  },

  repeatedRequest() {
    Notify.info('Search results are already displayed.');
  },
};

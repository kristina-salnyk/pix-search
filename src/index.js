import './css/styles.css';
import ImageService from './js/image-service';
import { Notify } from 'notiflix';

const refs = {
  searchForm: document.getElementById('search-form'),
};

const imageService = new ImageService();

const searchFormSubmitHandler = event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    Notify.info('Please enter the query to search images.');
    return;
  }

  imageService.searchQuery = searchQuery;
  fetchImages();
};

const fetchImages = async () => {
  try {
    const data = await imageService.fetchImages();
    const { hits: images } = data;

    if (images.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    console.log(images);
  } catch (error) {
    Notify.failure('Failed to get data, please try again later.');
  }
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);

import api from './api';

export default class ImageService {
  #searchQuery;
  #page;
  #perPage;
  #imageType;
  #orientation;
  #safeSearch;

  constructor() {
    this.#searchQuery = '';
    this.#page = 1;
    this.#perPage = 40;
    this.#imageType = 'photo';
    this.#orientation = 'horizontal';
    this.#safeSearch = true;
  }

  async fetchImages() {
    const config = {
      params: {
        q: this.#searchQuery,
        page: this.#page,
        per_page: this.#perPage,
        image_type: this.#imageType,
        orientation: this.#orientation,
        safesearch: this.#safeSearch,
      },
    };
    const response = await api.request(config);
    return response.data;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  set searchQuery(newSearchQuery) {
    this.#searchQuery = newSearchQuery;
    this.resetPage();
  }

  get searchQuery() {
    return this.#searchQuery;
  }

  getCurrentCapacity() {
    return this.#perPage * this.#page;
  }
}

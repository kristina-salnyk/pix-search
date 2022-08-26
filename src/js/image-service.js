import api from './pixabay-api';

export default class ImageService {
  #searchQuery;
  #page;

  constructor() {
    this.#searchQuery = '';
    this.#page = 1;
  }

  async fetchImages() {
    const config = {
      params: {
        q: this.#searchQuery,
        page: this.#page,
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
    this.#page = 1;
  }
}

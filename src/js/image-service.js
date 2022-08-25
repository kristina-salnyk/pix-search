import api from './pixabay-api';

export default class ImageService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const config = {
      params: {
        q: this.searchQuery,
      },
    };
    const response = await api.request(config);
    return response.data;
  }
}

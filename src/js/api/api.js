import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29506902-d80f3a4fd40f85d69a14129e9';

export default axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

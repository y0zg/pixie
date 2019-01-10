import axios from 'axios';

export default class UnsplashService {
  static async search(query, page = 1, per_page = 30) {
    const response = await axios.get(`/api/pixies/search/${query}/${page}/${per_page}`);
    return response.data;
  }
}

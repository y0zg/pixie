const axios = require('axios');
require('dotenv').config();

class UnsplashService {
  static search(query, page, per_page) {
    const client_id = process.env.UNSPLASH_ID;
    return axios.get('https://api.unsplash.com/search/photos', {
      params: { query, page, per_page, client_id }
    });
  }
}

module.exports = UnsplashService;

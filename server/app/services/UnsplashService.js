const axios = require('axios');
require('dotenv').config();

const client_id = process.env.UNSPLASH_ID;

class UnsplashService {
  static search(query, page, per_page) {
    return axios.get('https://api.unsplash.com/search/photos', {
      params: { query, page, per_page, client_id }
    });
  }
}

module.exports = UnsplashService;

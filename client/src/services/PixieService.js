import axios from 'axios';

class PixieService {
  static getAll() {
    return axios.get('/api/pixies');
  }

  static getById(id) {
    return axios.get(`/api/pixies/${id}`);
  }

  static create(pixie) {
    return axios.post('/api/pixies', pixie);
  }

  static update(pixie) {
    return axios.put('/api/pixies', pixie);
  }

  static delete(id) {
    return axios.delete(`/api/pixies/${id}`);
  }

  static upload(file, size) {
    const data = new FormData();
    data.append('file', file);
    data.append('size', size);
    return axios.post('/api/pixies/upload', data);
  }

  static scrape(query, numRows) {
    return axios.post('/api/pixies/scrape', { query, numRows });
  }

  static async search(query, numRows, page = 1, per_page = 30) {
    const response = await axios.get(`/api/pixies/search/${query}/${numRows}/${page}/${per_page}`);
    return response.data;
  }
}

export default PixieService;

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

  static scrape(query) {
    return axios.get(`/api/pixies/scrape/${query}`);
  }
}

export default PixieService;

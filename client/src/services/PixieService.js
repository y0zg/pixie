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
}

export default PixieService;

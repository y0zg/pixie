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

  static upload(file, size) {
    const data = new FormData();
    data.append('file', file);
    data.append('size', size);
    return axios.post('/api/pixies/upload', data);


  }
}

export default PixieService;

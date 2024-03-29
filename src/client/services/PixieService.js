import axios from 'axios';

class PixieService {
  static getAll = () => {
    return axios.get('/api/pixies');
  };

  static getById = async id => {
    try {
      return await axios.get(`/api/pixies/${id}`);
    } catch (error) {
      const { name, message } = error.response.data.error;
      const getByIdError = new Error(message);
      getByIdError.name = name;
      throw getByIdError;
    }
  };

  static create = pixie => {
    return axios.post('/api/pixies', pixie);
  };

  static update = pixie => {
    return axios.put('/api/pixies', pixie);
  };

  static delete = async id => {
    try {
      const response = await axios.delete(`/api/pixies/${id}`);
      return response;
    } catch (error) {
      const { name, message } = error.response.data.error;
      const deleteError = new Error(message);
      deleteError.name = name;
      throw deleteError;
    }
  };

  static upload = (file, size) => {
    const data = new FormData();
    data.append('file', file);
    data.append('size', size);
    return axios.post('/api/pixies/upload', data);
  };

  static scrape = (query, numRows) => {
    return axios.post('/api/pixies/scrape', { query, numRows });
  };

  static search = async (query, numRows, page = 1, per_page = 10) => {
    const response = await axios.get(`/api/pixies/search/${query}/${numRows}/${page}/${per_page}`);
    return response.data;
  };
}

export default PixieService;

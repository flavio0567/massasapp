import axios from 'axios';
// import config from '../../config/config.js';

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'https://massasapi.massasdacecilia.com.br/',
  // baseURL: config.API_URL,
});

export default api;

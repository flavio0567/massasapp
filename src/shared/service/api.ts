import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.1.106:3333',
  baseURL: 'https://massasapi.massasdacecilia.com.br/',
});

export default api;

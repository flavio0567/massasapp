import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://167.71.150.49',
  baseURL: 'https://massasapi.massasdacecilia.com.br/',
});

export default api;

import axios from 'axios';
import { getToken } from '../services/auth';

const URL_API = 'http://192.168.0.33/bridgein/api';

const api = axios.create({
 baseURL: URL_API,
});

api.interceptors.request.use(async config => {
  const token = await getToken();
  console.log("token", token);
  if (token) {
    config.headers.Token = token; // <- CORRETO para a API
  }
  return config;
});


/**
 * Base protocol path api
 * @type {{course: {get: string}}}
 * @type {{module: {get: string}}}
 */

export default api;

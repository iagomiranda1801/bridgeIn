import axios from 'axios';
import { getToken } from '../services/auth';

export const URL_API = 'https://homolog.bridgein.ca/api';
export const URL_API_FILE = 'https://homolog.bridgein.ca/';

const api = axios.create({
 baseURL: URL_API,
});

api.interceptors.request.use(async config => {
  const token = await getToken();
  // console.log("token", token);
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

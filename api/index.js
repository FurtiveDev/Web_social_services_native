import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: 'http://192.168.72.14:8010/' });
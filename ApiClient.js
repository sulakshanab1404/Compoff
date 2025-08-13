// src/components/ApiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://107.108.74.195:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
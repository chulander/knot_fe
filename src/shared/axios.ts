// src/services/axiosInstance.ts
import axios from 'axios';
import { baseURL } from './constants';

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`, // Configurable server endpoint
  withCredentials: true, // Send cookies with each request
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;

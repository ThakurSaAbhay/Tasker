import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// For Android Emulator, use 10.0.2.2 instead of localhost
// For iOS Simulator, use localhost
// For physical devices, use your computer's local IP address
const API_URL = Platform.select({
  android: 'http://10.0.2.2:5000/',
  ios: 'http://localhost:5000/',
  default: 'http://localhost:5000/',
});

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient; 
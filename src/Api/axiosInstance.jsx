import axios from 'axios';


const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("🚀 ~ baseURL:", baseURL)

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
console.log("🚀 ~ axiosInstance:", axiosInstance)
console.log("🚀 ~ axiosInstance.baseURL:", axiosInstance.baseURL)

// Set up token interceptor ONCE
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Token attached:', config.headers['Authorization']);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

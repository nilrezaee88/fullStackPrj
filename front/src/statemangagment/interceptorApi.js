// axiosInterceptor.js
import axios from 'axios';

const baseURL = 'https://reqres.in/api';

const interceptorApi = axios.create({
  baseURL: baseURL,
});

interceptorApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default interceptorApi;

import axios from 'axios';


const baseURL = 'http://localhost:8000';
const timeout= 5*1000;
const headers= {
  'Content-Type': 'application/json',
}


const axiosInstance = axios.create({
  baseURL,
  timeout,
  headers,
  withCredentials:true
});

export default axiosInstance;

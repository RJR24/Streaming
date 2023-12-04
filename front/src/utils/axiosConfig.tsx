import axios from 'axios';


const baseURL = 'http://localhost:5500';
const timeout= 5*1000;
const headers= {
  'Content-Type': 'application/json',
  // 'Authorization': 'Bearer your_token_here'
}


const axiosInstance = axios.create({
  baseURL,
  timeout,
  headers,
  withCredentials:true
});

export default axiosInstance;

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-myburger-4c559.firebaseio.com/'
});

export default instance;

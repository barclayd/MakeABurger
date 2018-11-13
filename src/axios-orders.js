import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://buildyourburger-3f325.firebaseio.com/'
});

export default instance;



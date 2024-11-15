import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tripnest-33ea.onrender.com',
});

export default instance;
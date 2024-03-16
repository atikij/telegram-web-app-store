// axios.js

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/atikij/flower', // Замените на ваш URL API
    headers: {
        'Accept': 'application/json',
        // Другие заголовки, если необходимо
    },
});

export default instance;

// axios.js

import axios from 'axios';
//запрос вебхук для отправки данных
//https://2c4e-213-87-162-244.ngrok-free.app/bot/6298386098:AAGUUnLWruwVDaBYylSTTEZh3UTfJr2BSWY
//получение данных
//https://2c4e-213-87-162-244.ngrok-free.app/webapp/main
const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/atikij/flower', // Замените на ваш URL API
    headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 69420,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
        // Другие заголовки, если необходимо
    },
});

export default instance;

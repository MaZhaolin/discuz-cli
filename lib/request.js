import axios from 'axios';
import config from './config.js';

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});


export const fetchRepoList = async () => axios.get(`https://api.github.com/repos/${config.repoName}/branches`);
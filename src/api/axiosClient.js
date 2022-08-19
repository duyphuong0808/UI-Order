import axios from 'axios';
import queryString from 'query-string';
import localStorageCustom from '../app/localStorageCustom';

const axiosClient = axios.create({
    headers: {
        'content-type': 'application/json; charset=utf-8',
        'accept': '*/*',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorageCustom.getToken();
    console.log("Token axios: ", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle errors
    return error.response;
});

export default axiosClient;
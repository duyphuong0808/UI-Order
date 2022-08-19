import axios from 'axios';

const tokenApi = {
    getToken: (code) => {
        const url = `http://localhost:8080/showToken?code=${code}`;
        return axios.get(url);
    },
}

export default tokenApi;
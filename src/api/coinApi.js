import axiosClient from "./axiosClient";

const coinApi = {
    get: () => {
        const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
        return axiosClient.get(url);
    },
}

export default coinApi;
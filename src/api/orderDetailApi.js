// import localStorageCustom from "../app/localStorageCustom";
import { API_CONST } from "../constants/ApiContants";
import axiosClient from "./axiosClient";

const headers = {
    'Content-Type': 'application/json',
};

const orderDetailApi = {
    getOderDetailById: () => {
        // const user = localStorageCustom.getUser();
        // const id = user.id;
        return axiosClient.get(API_CONST.GET_ALL_ORDER_DETAIL);
    },

    getAllOrderDetail: () => {
        return axiosClient.get(API_CONST.BASE_ORDER_URL);
    },

    createOrder: (body) => {
        return axiosClient.post(API_CONST.BASE_ORDER_URL, body, { headers });
    },

    deleteOrder: (id) => {
        return axiosClient.delete(API_CONST.BASE_ORDER_URL + `/${id}`);
    },

    updateOrder: (body) => {
        return axiosClient.put(API_CONST.BASE_ORDER_URL + `/${body.id}`, body);
    },

    getOrderSortByDate: (pageNo, descending, pageSize) => {
        var no = 0;
        if (pageNo) {
            no = pageNo;
        }

        var size = 10;
        if (pageSize) {
            size = pageSize;
        }

        const params = {
            pageNo: no,
            pageSize: size,
            descending: descending,
        }
        const url = API_CONST.BASE_ORDER_URL + '/sort';
        return axiosClient.get(url, { params });
    }
}

export default orderDetailApi;
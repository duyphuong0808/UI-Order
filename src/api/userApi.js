import axiosClient from "./axiosClient";
import axios from 'axios';
import localStorageCustom from "../app/localStorageCustom";
//import localStorageCustom from "../app/localStorageCustom";
// import { LOCAL_STORAGE_CONST } from "../constants/Constant";

const userApi = {
    checkEmail: async (params) => {
        const url = 'http://localhost:9000/api/v1/checkUser';
        return await axios.get(url, { params });
    },


    getUserInf: async () => {
        const access_token=  localStorageCustom.getToken();
        const headers ={
            'Content-Type': 'application/json',
            'access_token':access_token
        }
        const url = `http://localhost:8080/api/v1/userInfo`;
        return await axiosClient.get(url, { headers });
    },
    createUser: async (user) => {
        const url = 'http://localhost:9000/api/v1/users';
        return await axios.post(url, user);
    },

    getUserid: (id)=>{
        // const access_token=  localStorageCustom.getToken();

        // const url = `http://localhost:9000/api/v1/users/${id}`;
        const ListUserId=   axiosClient.get(`http://localhost:9000/api/v1/users/${id}`)
        const body =  ListUserId.data;
  
        return body;


    },
}

export default userApi;




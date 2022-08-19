import axiosClient from "./axiosClient";
import localStorageCustom from "../app/localStorageCustom";
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'



const logoutApi = {
    logout: async () => {
        const url = `http://localhost:8080/doLogout`;
        const access_token = localStorageCustom.getToken();
        console.log(access_token);
        const headers = {
            'Content-Type': 'application/json',
            'access_token': access_token
        };
           return await axiosClient.get(url, {headers} 
            
            );
    }
   
}

export default logoutApi;
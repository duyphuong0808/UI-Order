import { LOCAL_STORAGE_CONST } from "../constants/Constant";

const localStorageCustom = {
    setUser: (user) => {
        localStorage.setItem(LOCAL_STORAGE_CONST.USER, JSON.stringify(user));
        // if (user.roles.find(i => i === LOCAL_STORAGE_CONST.ROLE_ADMIN)) {
        //     localStorage.setItem(LOCAL_STORAGE_CONST.IS_ADMIN, LOCAL_STORAGE_CONST.TRUE);
        // } else {
        //     localStorage.setItem(LOCAL_STORAGE_CONST.IS_ADMIN, LOCAL_STORAGE_CONST.FALSE);
        // }
    },
    getUser: () => {
        const userLocal = localStorage.getItem(LOCAL_STORAGE_CONST.USER);
        return JSON.parse(userLocal);
    },
    getIsAdmin: () => {
        const isAdmin = localStorage.getItem(LOCAL_STORAGE_CONST.IS_ADMIN);
        return isAdmin;
    },
    setCode: (code) => {
        localStorage.setItem(LOCAL_STORAGE_CONST.CODE, code);
    },
    getCode: () => {
        return localStorageCustom.getItem(LOCAL_STORAGE_CONST.CODE);
    },
    setToken: (token) => {
        localStorage.setItem(LOCAL_STORAGE_CONST.TOKEN, token);
    },
    getToken: () => {
        return localStorage.getItem(LOCAL_STORAGE_CONST.TOKEN);
    },
    setAccessToken: (accessToken) => {
        localStorage.setItem(LOCAL_STORAGE_CONST.ACCESS_TOKEN, JSON.stringify(accessToken));
    },
    getAccessToken: () => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_CONST.ACCESS_TOKEN);
        return JSON.parse(accessToken);
    },
    setEmail: (email) => {
        localStorage.setItem(LOCAL_STORAGE_CONST.EMAIL, email);
    },
    getEmail: () => {
        return localStorage.getItem(LOCAL_STORAGE_CONST.EMAIL);
    }
}

export default localStorageCustom;
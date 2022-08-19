import localStorageCustom from "../app/localStorageCustom"

const handleErrorUnauthorized = () => {
    const accessToken = localStorageCustom.getAccessToken();
    if (accessToken) {
        const refreshToken = accessToken.refresh_token;

        // Call api to get new token and save in local
    }
}
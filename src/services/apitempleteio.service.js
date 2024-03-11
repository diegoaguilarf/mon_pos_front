import axios from "axios";

const AUTH_TOKEN = '3d2cMTgxNTI6MTUyNDY6TjBQSHVpR215bVB2dm1KZQ=';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://rest-us.apitemplate.io/v2',
    headers: {
        'X-API-KEY': AUTH_TOKEN
    }
});

export default instance;
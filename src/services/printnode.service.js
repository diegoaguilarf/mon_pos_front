import axios from "axios";

const AUTH_TOKEN = 'Zv1HGFg5O_qVR0fOE3d-Lp4fwzm0U5qHY22TLyluFus';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://api.printnode.com',
    auth: {
        username: AUTH_TOKEN
    }
});

export default instance;
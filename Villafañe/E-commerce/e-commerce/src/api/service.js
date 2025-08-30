import axios from 'axios';

const BASE_URL ='https://api.escuelajs.co/api/v1';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    });



import axios from 'axios';

export const useAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const axiosHeaders = {
    'Authorization': `Bearer ${process.env.TOKEN}`
};

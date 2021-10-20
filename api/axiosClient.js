import axios from "axios";
import queryString from "query-string";
import constant from "../constant/constant";

const axiosClient = axios.create({
    baseURL: constant.API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    console.log('response', response.data);
    return response;
}, (error) => {
    console.log('eee', error );
    return error.response.request._response
})

export default axiosClient;



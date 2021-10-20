import axiosClient from "./axiosClient";

class ProductApi {
    getAll = (params) => {
        const url = '/user/login';
        return axiosClient.get(url, { params });
    }
    login = (params) => {
        const url = '/user/login';
        return axiosClient.post(url, params);
    }
    create = (params) => {
        const url = '/user/createUser';
        return axiosClient.post(url, params);
    }
}

const productApi = new ProductApi();

export default productApi;
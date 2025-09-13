import { API } from '../configs/apiConfig';
import { ENDPOINTS } from '../configs/endpoints';
import { tokenStorage } from '../utils/storage';

export const authService = {

    //dang nhap
    login: async (userData) => {
        const response = await API.post(ENDPOINTS.AUTH.LOGIN, userData);
        return response.data;
    },

    logout: () => {
        tokenStorage.removeToken();
    },

    register: async (userRegisterData) => {
        const response = await API.post(ENDPOINTS.AUTH.REGISTER, userRegisterData);
        return response.data;
    },


};
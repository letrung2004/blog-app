import { AUTH_REQUEST } from '../configs/apiConfig';
import { ENDPOINTS } from '../configs/endpoints';

export const postService = {
    getAllPosts: async () => {
        const response = await AUTH_REQUEST.get(ENDPOINTS.POSTS.GET_ALL);
        return response.data;
    },

    getPostsByUser: async (userId) => {
        const response = await AUTH_REQUEST.get(ENDPOINTS.POSTS.GET_BY_USER(userId));
        return response.data;
    },

    getPostById: async (postId) => {
        const response = await AUTH_REQUEST.get(`/posts/${postId}`);
        return response.data;
    },

    createPost: async (postData) => {
        const response = await AUTH_REQUEST.post(ENDPOINTS.POSTS.CREATE, postData);
        return response.data;
    },

    updatePost: async (postId, postData) => {
        const response = await AUTH_REQUEST.put(ENDPOINTS.POSTS.UPDATE(postId), postData);
        return response.data;
    },

    deletePost: async (postId) => {
        const response = await AUTH_REQUEST.delete(ENDPOINTS.POSTS.DELETE(postId));
        return response.data;
    }
};
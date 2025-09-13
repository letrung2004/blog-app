export const ENDPOINTS = {
    AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
    },
    POSTS: {
        GET_ALL: "/posts",
        GET_BY_USER: (userId) => `/posts/user/${userId}`,
        CREATE: "/posts",
        UPDATE: (postId) => `/posts/${postId}`,
        DELETE: (postId) => `/posts/${postId}`,
    },
}

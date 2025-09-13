import { createContext, useState, useEffect } from 'react';
import { tokenStorage } from '../utils/storage';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Hàm decode JWT để lấy thông tin user
    const decodeToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    useEffect(() => {
        const initAuth = () => {
            const token = tokenStorage.getToken();
            if (token) {
                const decodedToken = decodeToken(token);
                if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
                    // Token còn hạn, restore user info
                    setAuth({
                        username: decodedToken.username,
                        id: decodedToken.sub // subject trong JWT thường là user ID
                    });
                    setIsAuthenticated(true);
                } else {
                    // Token hết hạn
                    tokenStorage.removeToken();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = (userData) => {
        console.log("user login in context", userData);
        const user = userData.result.user;
        const token = userData.result.token;

        setAuth(user);
        setIsAuthenticated(true);

        if (token) {
            tokenStorage.setToken(token);
        }
    };

    const logout = () => {
        setAuth(null);
        setIsAuthenticated(false);
        authService.logout();
    };

    const value = {
        auth,
        setAuth,
        isAuthenticated,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
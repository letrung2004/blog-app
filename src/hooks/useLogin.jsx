import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { authService } from "../services/authService";
import { tokenStorage } from "../utils/storage";
import { showToast } from "../utils/toast";

const useLogin = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const loginUser = async (userData) => {
        setLoading(true);
        setErrors({});

        try {
            console.log("in useLogin:", userData.username);
            const loginResponse = await authService.login(userData);

            if (loginResponse.token) {
                tokenStorage.setToken(loginResponse.token);
            }
            console.log("in useLogin:", loginResponse);
            login(loginResponse);

            showToast("Đăng nhập thành công!", "success");

            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });

        } catch (error) {
            console.error("Login error:", error);

        } finally {
            setLoading(false);
        }
    };

    return {
        errors,
        loading,
        loginUser
    };
};

export default useLogin;
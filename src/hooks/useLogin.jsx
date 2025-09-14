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

            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });

        } catch (error) {
            console.error("Login error:", error);

            if (error.response?.data) {
                const errorData = error.response.data;

                if (errorData.code === 1004) {
                    setErrors({
                        general: "Tên đăng nhập hoặc mật khẩu không đúng"
                    });
                } else {
                    const errorMessage = errorData.message || "Đăng nhập thất bại";
                    setErrors({ general: errorMessage });
                    showToast(errorMessage, "error");
                }
            } else {
                setErrors({
                    general: "Không thể kết nối đến server"
                });
            }

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
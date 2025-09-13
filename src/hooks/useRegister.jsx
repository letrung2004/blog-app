import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { showToast } from '../utils/toast';
import { validateRegisterForm } from '../utils/validators';

export const useRegister = () => {
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateRegisterForm(form);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);
        try {
            const userData = {
                fullName: form.fullName.trim(),
                username: form.username.trim(),
                email: form.email.trim(),
                password: form.password
            };
            await authService.register(userData);
            showToast('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
            navigate('/login');
        } catch (error) {
            console.error('Register error:', error);
            const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
            showToast(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        errors,
        loading,
        handleChange,
        handleSubmit
    };
};

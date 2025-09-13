export const validateRegisterForm = (form) => {
    const errors = {};

    if (!form.fullName.trim()) {
        errors.fullName = 'Họ tên không được để trống';
    } else if (form.fullName.trim().length < 2) {
        errors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
    }

    if (!form.username.trim()) {
        errors.username = 'Tên đăng nhập không được để trống';
    } else if (form.username.trim().length < 3) {
        errors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username.trim())) {
        errors.username = 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
        errors.email = 'Email không được để trống';
    } else if (!emailRegex.test(form.email.trim())) {
        errors.email = 'Email không đúng định dạng';
    }

    if (!form.password) {
        errors.password = 'Mật khẩu không được để trống';
    } else if (form.password.length < 6) {
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!form.confirmPassword) {
        errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    return errors;
};

export const formatDate = (dateString) => {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);

        // Kiểm tra nếu date hợp lệ
        if (isNaN(date.getTime())) {
            return dateString;
        }

        const now = new Date();
        const diffInMilliseconds = now - date;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        // Nếu trong vòng 1 phút
        if (diffInMinutes < 1) {
            return 'Vừa xong';
        }

        // Nếu trong vòng 1 giờ
        if (diffInHours < 1) {
            return `${diffInMinutes} phút trước`;
        }

        // Nếu trong vòng 1 ngày
        if (diffInDays < 1) {
            return `${diffInHours} giờ trước`;
        }

        // Nếu trong vòng 7 ngày
        if (diffInDays < 7) {
            return `${diffInDays} ngày trước`;
        }

        // Nếu quá 7 ngày, hiển thị ngày tháng
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
};

export const formatDateFull = (dateString) => {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
};
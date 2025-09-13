// Simple toast implementation
let toastContainer = null;

const createToastContainer = () => {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
};

export const showToast = (message, type = 'info', duration = 3000) => {
    const container = createToastContainer();

    const toast = document.createElement('div');
    toast.textContent = message;

    const baseStyles = `
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        pointer-events: auto;
        cursor: pointer;
        max-width: 300px;
        word-wrap: break-word;
    `;

    const typeStyles = {
        success: 'background-color: #10b981;',
        error: 'background-color: #ef4444;',
        warning: 'background-color: #f59e0b;',
        info: 'background-color: #3b82f6;'
    };

    toast.style.cssText = baseStyles + (typeStyles[type] || typeStyles.info);

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove
    const removeToast = () => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
            // Remove container if empty
            if (container.children.length === 0) {
                document.body.removeChild(container);
                toastContainer = null;
            }
        }, 300);
    };

    // Remove on click
    toast.addEventListener('click', removeToast);

    // Auto remove after duration
    setTimeout(removeToast, duration);
};
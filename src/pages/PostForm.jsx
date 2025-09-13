import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../utils/toast";
import { usePost } from "../hooks/usePost";

export default function PostForm() {
    const [form, setForm] = useState({ title: "", content: "" });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const { fetchPostById, createPost, updatePost } = usePost();

    useEffect(() => {
        if (isEdit) {
            loadPost();
        }
    }, [id, isEdit]);

    const loadPost = async () => {
        setLoading(true);
        try {
            const post = await fetchPostById(id);
            if (post) {
                setForm({ title: post.title, content: post.content });
            } else {
                navigate("/posts");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.title.trim()) {
            newErrors.title = "Tiêu đề không được để trống";
        } else if (form.title.trim().length < 3) {
            newErrors.title = "Tiêu đề phải có ít nhất 3 ký tự";
        }

        if (!form.content.trim()) {
            newErrors.content = "Nội dung không được để trống";
        } else if (form.content.trim().length < 10) {
            newErrors.content = "Nội dung phải có ít nhất 10 ký tự";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const postData = {
                title: form.title.trim(),
                content: form.content.trim(),
            };

            if (isEdit) {
                await updatePost(id, postData);
            } else {
                await createPost(postData);
            }
            navigate("/posts");
        } catch (error) {
            console.error("Error saving post:", error);
            showToast(isEdit ? "Lỗi khi cập nhật bài viết" : "Lỗi khi tạo bài viết", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {isEdit ? "Chỉnh sửa bài viết" : "Viết bài mới"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Tiêu đề <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Nhập tiêu đề bài viết..."
                            disabled={loading}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Nội dung <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            rows={12}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${errors.content ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Nhập nội dung bài viết..."
                            disabled={loading}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                        )}
                        <p className="text-gray-500 text-sm mt-1">
                            Độ dài: {form.content.length} ký tự
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            )}
                            {loading
                                ? isEdit
                                    ? "Đang cập nhật..."
                                    : "Đang tạo..."
                                : isEdit
                                    ? "Cập nhật bài viết"
                                    : "Tạo bài viết"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/posts")}
                            disabled={loading}
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

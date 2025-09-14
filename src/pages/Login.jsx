import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin"

export default function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const { loginUser, loading, errors } = useLogin()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await loginUser(form)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Đăng nhập
                </h2>

                {errors.general && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Tên đăng nhập"
                            value={form.username}
                            onChange={handleChange}
                            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.username ? 'border-red-500' : 'border-gray-300'
                                }`}
                            required
                            disabled={loading}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={form.password}
                            onChange={handleChange}
                            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            required
                            disabled={loading}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline font-medium">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    )
}
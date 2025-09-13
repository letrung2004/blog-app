import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { showToast } from "../utils/toast"

export default function Navbar() {
    const { auth, logout, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        showToast("Đăng xuất thành công!", "success")
        navigate("/login")
    }

    console.log(auth)
    const displayName = auth?.username;

    return (
        <nav className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center shadow-md">
            <Link to="/posts" className="font-bold text-lg hover:text-blue-200">
                MyBlog
            </Link>

            <div className="flex gap-4 items-center">
                {isAuthenticated ? (
                    <>
                        <div className="flex items-center gap-4">
                            <span className="text-sm">
                                Xin chào, <span className="font-semibold">{displayName}</span>
                            </span>

                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                        >
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">
                            Đăng nhập
                        </Link>
                        <Link to="/register" className="hover:underline">
                            Đăng ký
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
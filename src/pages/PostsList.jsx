import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/dateFormat';
import { usePost } from '../hooks/usePost';

export default function PostsList() {
    const { auth } = useAuth();
    const { posts, loading, fetchPosts, deletePost } = usePost();
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (filter === "my" && auth?.id) {
            fetchPosts(auth.id);
        } else {
            fetchPosts();
        }
    }, [filter, auth, fetchPosts]);
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    {filter === 'my' ? 'Bài viết của tôi' : 'Tất cả bài viết'}
                </h1>
                <div className="flex gap-4">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Tất cả bài viết</option>
                        <option value="my">Bài viết của tôi</option>
                    </select>
                    <Link
                        to="/posts/new"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        + Viết bài mới
                    </Link>
                </div>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-4">
                        {filter === 'my' ? 'Bạn chưa có bài viết nào' : 'Chưa có bài viết nào'}
                    </div>
                    <Link
                        to="/posts/new"
                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Viết bài đầu tiên
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-2">
                                        Tác giả: <span className="font-medium">{post.username}</span>
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                        Tạo: {formatDate(post.createdAt)}
                                        {post.updatedAt !== post.createdAt && (
                                            <span> • Cập nhật: {formatDate(post.updatedAt)}</span>
                                        )}
                                    </p>
                                </div>

                                {auth && (auth.username === post.username || auth.id === post.userId) && (
                                    <div className="flex gap-2 ml-4">
                                        <Link
                                            to={`/posts/${post.id}/edit`}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                                        >
                                            Sửa
                                        </Link>
                                        <button
                                            onClick={() => deletePost(post.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="text-gray-700">
                                {post.content ? (
                                    <p className="line-clamp-3">
                                        {post.content.length > 200
                                            ? `${post.content.substring(0, 200)}...`
                                            : post.content}
                                    </p>
                                ) : (
                                    <p className="text-gray-500 italic">Không có nội dung</p>
                                )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <Link
                                    to={`/posts/${post.id}`}
                                    className="text-blue-500 hover:text-blue-600 font-medium"
                                >
                                    Chi tiết →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
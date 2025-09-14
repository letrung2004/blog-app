import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postService } from '../services/postService';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/toast';
import { formatDate } from '../utils/dateFormat';
import { usePost } from '../hooks/usePost';

export default function PostDetail() {
    const { auth } = useAuth();
    const { id } = useParams();
    const { post, loading, fetchPostById, deletePost } = usePost();

    useEffect(() => {
        fetchPostById(id);
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="text-gray-500 text-lg mb-4">Không tìm thấy bài viết</div>
                <Link
                    to="/posts"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Về danh sách bài viết
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link
                    to="/posts"
                    className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
                >
                    ← Về danh sách bài viết
                </Link>
            </div>

            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8 border-b border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-bold text-gray-800 leading-tight flex-1 mr-4">
                            {post.title}
                        </h1>

                        {auth && (auth.username === post.username) && (
                            <div className="flex gap-2">
                                <Link
                                    to={`/posts/${post.id}/edit`}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                                >
                                    Chỉnh sửa
                                </Link>
                                <button
                                    onClick={deletePost}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Xóa
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="text-gray-600 space-y-1">
                        <p>
                            Tác giả: <span className="font-medium">{post.username}</span>
                        </p>
                        <p className="text-sm">
                            Tạo: {formatDate(post.createdAt)}
                            {post.updatedAt !== post.createdAt && (
                                <span className="ml-4">
                                    Cập nhật: {formatDate(post.updatedAt)}
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="prose prose-lg max-w-none">
                        {post.content ? (
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                {post.content}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-center py-8">
                                Bài viết này không có nội dung
                            </p>
                        )}
                    </div>
                </div>
            </article>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
                <Link
                    to="/posts"
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Về danh sách
                </Link>

                {auth && (auth.username === post.username) && (
                    <Link
                        to={`/posts/${post.id}/edit`}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Chỉnh sửa bài viết
                    </Link>
                )}
            </div>
        </div>
    );
}
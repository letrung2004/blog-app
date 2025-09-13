import { useState, useCallback } from 'react';
import { postService } from '../services/postService';
import { showToast } from '../utils/toast';

export function usePost() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);

    const fetchPosts = useCallback(async (userId = null) => {
        setLoading(true);
        try {
            const response = userId
                ? await postService.getPostsByUser(userId)
                : await postService.getAllPosts();

            if (response.code === 1000) {
                setPosts(response.result || []);
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
            showToast('Lỗi khi tải bài viết', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPostById = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await postService.getPostById(id);
            if (response.code === 1000) {
                setPost(response.result);
                return response.result;
            }
        } catch (err) {
            console.error('Error fetching post:', err);
            showToast('Lỗi khi tải bài viết', 'error');
        } finally {
            setLoading(false);
        }
        return null;
    }, []);

    const createPost = useCallback(async (data) => {
        try {
            await postService.createPost(data);
            showToast('Tạo bài viết thành công!', 'success');
        } catch (err) {
            console.error('Error creating post:', err);
            showToast('Lỗi khi tạo bài viết', 'error');
            throw err;
        }
    }, []);

    const updatePost = useCallback(async (id, data) => {
        try {
            await postService.updatePost(id, data);
            showToast('Cập nhật bài viết thành công!', 'success');
        } catch (err) {
            console.error('Error updating post:', err);
            showToast('Lỗi khi cập nhật bài viết', 'error');
            throw err;
        }
    }, []);

    const deletePost = useCallback(async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return false;
        try {
            await postService.deletePost(id);
            setPosts(prev => prev.filter(p => p.id !== id));
            showToast('Xóa bài viết thành công', 'success');
            return true;
        } catch (err) {
            console.error('Error deleting post:', err);
            showToast('Lỗi khi xóa bài viết', 'error');
            return false;
        }
    }, []);

    return {
        loading,
        posts,
        post,
        setPost,
        fetchPosts,
        fetchPostById,
        createPost,
        updatePost,
        deletePost,
    };
}

import { useState, useCallback } from 'react';
import { postService } from '../services/postService';
import { showToast } from '../utils/toast';

export function usePost() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const [currentFilter, setCurrentFilter] = useState({ type: 'all', userId: null });

    const fetchPosts = useCallback(async (userId = null) => {
        setLoading(true);
        try {
            const response = userId
                ? await postService.getPostsByUser(userId)
                : await postService.getAllPosts();

            if (response.code === 1000) {
                setPosts(response.result || []);
                setCurrentFilter({ type: userId ? 'my' : 'all', userId });
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

    const refreshPosts = useCallback(async () => {
        if (currentFilter.type === 'my' && currentFilter.userId) {
            await fetchPosts(currentFilter.userId);
        } else {
            await fetchPosts();
        }
    }, [currentFilter, fetchPosts]);

    const createPost = useCallback(async (data) => {
        try {
            const response = await postService.createPost(data);
            showToast('Tạo bài viết thành công!', 'success');
            
            await refreshPosts();
            
            return response;
        } catch (err) {
            console.error('Error creating post:', err);
            showToast('Lỗi khi tạo bài viết', 'error');
            throw err;
        }
    }, [refreshPosts]);

    const updatePost = useCallback(async (id, data) => {
        try {
            const response = await postService.updatePost(id, data);
            showToast('Cập nhật bài viết thành công!', 'success');
            
            await refreshPosts();
            
            return response;
        } catch (err) {
            console.error('Error updating post:', err);
            showToast('Lỗi khi cập nhật bài viết', 'error');
            throw err;
        }
    }, [refreshPosts]);

    const deletePost = useCallback(async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return false;
        try {
            await postService.deletePost(id);
            
            // Cập nhật state local trước để UX mượt hơn
            setPosts(prev => prev.filter(p => p.id !== id));
            
            showToast('Xóa bài viết thành công', 'success');
            
            await refreshPosts();
            
            return true;
        } catch (err) {
            console.error('Error deleting post:', err);
            showToast('Lỗi khi xóa bài viết', 'error');
            await refreshPosts();
            return false;
        }
    }, [refreshPosts]);

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
        refreshPosts,
    };
}

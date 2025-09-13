import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PostsList from './pages/PostsList';
import PostForm from './pages/PostForm';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pb-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/posts" element={
                <ProtectedRoute>
                  <PostsList />
                </ProtectedRoute>
              } />

              <Route path="/posts/new" element={
                <ProtectedRoute>
                  <PostForm />
                </ProtectedRoute>
              } />

              <Route path="/posts/:id" element={
                <ProtectedRoute>
                  <PostDetail />
                </ProtectedRoute>
              } />

              <Route path="/posts/:id/edit" element={
                <ProtectedRoute>
                  <PostForm />
                </ProtectedRoute>
              } />

              <Route path="/" element={<Navigate to="/posts" replace />} />

              <Route path="*" element={
                <div className="container mx-auto px-4 py-8 text-center">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">404 - Không tìm thấy trang</h1>
                  <Navigate to="/posts" replace />
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
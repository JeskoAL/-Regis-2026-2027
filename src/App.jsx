import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initStorage, getCurrentUser } from './utils/storage';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ManageSpots from './pages/ManageSpots';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-800">
        <Navbar />
        <main className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/manage" element={
              <ProtectedRoute><ManageSpots /></ProtectedRoute>
            } />
            {/* Dynamic Route Requirement */}
            <Route path="/profile/:userId" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}


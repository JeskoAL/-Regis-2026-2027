import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTable, saveTable } from '../utils/storage';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const users = getTable('USERS');

    if (users.some((u) => u.email === email)) {
      setError('Email is already registered.');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'Attendant',
    };

    saveTable('USERS', [...users, newUser]);
    alert('Registration successful! Please log in.');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Create Account</h2>
      {error && <p className="bg-rose-100 text-rose-700 p-2 rounded mb-4 text-sm">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-300 rounded px-3 py-2"
            placeholder="Juan Dela Cruz"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded px-3 py-2"
            placeholder="juan@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded px-3 py-2"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded transition cursor-pointer"
        >
          Register
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}

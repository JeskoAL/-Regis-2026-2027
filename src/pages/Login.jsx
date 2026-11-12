import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTable, setCurrentUser } from '../utils/storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getTable('USERS');
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (!foundUser) {
      setError('Invalid email or password.');
      return;
    }

    setCurrentUser(foundUser);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">ParkFlow Login</h2>
      {error && <p className="bg-rose-100 text-rose-700 p-2 rounded mb-4 text-sm">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
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
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 rounded transition cursor-pointer"
        >
          Sign In
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-slate-600">
        No account yet?{' '}
        <Link to="/register" className="text-emerald-600 font-semibold hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '../utils/storage';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  if (!user) return null; 

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/dashboard" className="text-xl font-bold tracking-wide text-emerald-400">
        ParkFlow
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/dashboard" className="hover:text-emerald-400 transition">
          Dashboard
        </Link>
        <Link to="/manage" className="hover:text-emerald-400 transition">
          Manage Slots & Logs
        </Link>
        <Link to={`/profile/${user.id}`} className="hover:text-emerald-400 transition">
          Profile ({user.name})
        </Link>
        <button
          onClick={handleLogout}
          className="bg-rose-600 hover:bg-rose-700 px-3 py-1.5 rounded text-white transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

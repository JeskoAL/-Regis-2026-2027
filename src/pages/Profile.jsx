import { useParams, Link } from 'react-router-dom';
import { getTable } from '../utils/storage';

export default function Profile() {
  const { userId } = useParams(); 
  const users = getTable('USERS');
  const tickets = getTable('TICKETS');

  const profileUser = users.find((u) => u.id === userId);
  const userTickets = tickets.filter((t) => t.attendantId === userId);

  if (!profileUser) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-rose-600 font-semibold">User not found.</p>
        <Link to="/dashboard" className="text-emerald-600 underline text-sm mt-2 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">
            {profileUser.role}
          </span>
          <h1 className="text-2xl font-bold mt-2">{profileUser.name}</h1>
          <p className="text-slate-500 text-sm">{profileUser.email}</p>
          <p className="text-xs text-slate-400 mt-1">Dynamic User ID: {profileUser.id}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded border text-center">
          <p className="text-xs text-slate-500">Vehicles Processed</p>
          <p className="text-2xl font-bold text-slate-800">{userTickets.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Tickets Handled by {profileUser.name}</h2>
        {userTickets.length === 0 ? (
          <p className="text-sm text-slate-500">This user has not processed any vehicles yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-3">Plate Number</th>
                  <th className="p-3">Slot</th>
                  <th className="p-3">Time In</th>
                  <th className="p-3">Time Out</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {userTickets.map((t) => (
                  <tr key={t.id} className="border-b">
                    <td className="p-3 font-bold">{t.plateNumber}</td>
                    <td className="p-3">{t.slotNumber}</td>
                    <td className="p-3">{t.timeIn}</td>
                    <td className="p-3">{t.timeOut}</td>
                    <td className="p-3">{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-1">All Registered Attendants</h2>
        <p className="text-xs text-slate-500 mb-4">
          Click any attendant below to view their dynamic profile URL (`/profile/:userId`).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Dynamic Route</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">
                    <Link
                      to={`/profile/${u.id}`}
                      className="text-emerald-600 hover:underline font-medium"
                    >
                      View Profile →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
